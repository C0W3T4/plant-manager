import { formatDistance } from 'date-fns'
import { useEffect, useState } from 'react'
import { Alert, FlatList, Image, SafeAreaView, Text, View } from 'react-native'
import waterdrop from '../../assets/waterdrop.png'
import { Header } from '../../components/Header'
import { Load } from '../../components/Load'
import { PlantCardSecondary } from '../../components/PlantCardSecondary'
import { loadPlant, removePlant } from '../../libs/storage'
import { PlantProps } from '../../types/plants'
import styles from './styles'

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [nextWatered, setNextWatered] = useState<string>()

  async function loadStorageData(): Promise<void> {
    const plantsStorage = await loadPlant()

    if (plantsStorage && plantsStorage.length > 0) {
      const nextTime = formatDistance(
        new Date(plantsStorage[0].dateTimeNotification).getTime(),
        new Date().getTime(),
      )

      setNextWatered(
        `Don't forget to water the ${plantsStorage[0].name} in ${nextTime}!`,
      )

      setMyPlants(plantsStorage)
    }

    setLoading(false)
  }

  function handleRemove(plant: PlantProps): void {
    Alert.alert('To remove', `Do you want to remove the ${plant.name}?`, [
      {
        text: 'No 🙏',
        style: 'cancel',
      },
      {
        text: 'Yes 🔪',
        onPress: async () => {
          try {
            await removePlant(plant.id)
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id),
            )
          } catch {
            Alert.alert('Unable to remove! 😢')
          }
        },
      },
    ])
  }

  useEffect(() => {
    loadStorageData()
  }, [])

  if (loading) {
    return <Load />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image
          source={waterdrop}
          alt="Water drop"
          style={styles.spotlightImage}
        />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Next waterings</Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => {
                handleRemove(item)
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  )
}
