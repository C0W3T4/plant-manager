import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import { EnvironmentButton } from '../../components/EnvironmentButton'
import { Header } from '../../components/Header'
import { Load } from '../../components/Load'
import { PlantCardPrimary } from '../../components/PlantCardPrimary'
import api from '../../services/api'
import colors from '../../styles/colors'
import { StackNavigation } from '../../types/navigation'
import { PlantEnvironmentProps, PlantProps } from '../../types/plants'
import styles from './styles'

export function PlantSelect() {
  const [environments, setEnvironments] = useState<PlantEnvironmentProps[]>([])
  const [environmentSelected, setEnvironmentSelected] = useState<string>('all')

  const [plants, setPlants] = useState<PlantProps[]>([])
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])

  const [loading, setLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  const { navigate } = useNavigation<StackNavigation>()

  async function fetchPlants(): Promise<void> {
    await api
      .get('plants', {
        params: {
          _sort: 'name',
          _order: 'asc',
          _page: page,
          _limit: 6,
        },
      })
      .then(({ data }) => {
        if (!data) {
          return setLoading(true)
        }

        if (page > 1) {
          setPlants((oldValue) => [...oldValue, ...data])
          setFilteredPlants((oldValue) => [...oldValue, ...data])
        } else {
          setPlants(data)
          setFilteredPlants(data)
        }

        setLoading(false)
        setLoadingMore(false)
      })
      .catch((error) => error)
  }

  async function fetchEnvironment(): Promise<void> {
    await api
      .get('plantsEnvironments', {
        params: {
          _sort: 'title',
          _order: 'asc',
        },
      })
      .then(({ data }) => {
        setEnvironments([
          {
            key: 'all',
            title: 'All',
          },
          ...data,
        ])
      })
      .catch((error) => error)
  }

  function handleEnvironmentSelected(environment: string): void {
    setEnvironmentSelected(environment)

    if (environment === 'all') {
      return setFilteredPlants(plants)
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment),
    )

    setFilteredPlants(filtered)
  }

  function handlePlantSelected(plant: PlantProps): void {
    navigate('PlantSave', { plant })
  }

  function handleFetchMore(distance: number): void {
    if (distance < 1) {
      return
    }

    setLoadingMore(true)
    setPage((oldValue) => oldValue + 1)
    fetchPlants()
  }

  useEffect(() => {
    fetchPlants()

    fetchEnvironment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <Load />
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>What environment</Text>
        <Text style={styles.subtitle}>do you want to place your plant in?</Text>
      </View>
      <View>
        <FlatList
          data={environments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelected(item)}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </SafeAreaView>
  )
}
