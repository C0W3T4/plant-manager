import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import colors from '../../styles/colors'
import { StackNavigation } from '../../types/navigation'
import styles from './styles'

export type HeaderProps = {
  goBackFeature?: boolean
}

export function Header({ goBackFeature }: HeaderProps) {
  const [userName, setUserName] = useState<string>()

  const { goBack } = useNavigation<StackNavigation>()

  async function loadStorageUserName(): Promise<void> {
    const user = await AsyncStorage.getItem('@plantmanager:user')

    setUserName(user || '')
  }

  useEffect(() => {
    loadStorageUserName()
  }, [])

  return (
    <View style={styles.container}>
      {goBackFeature ? (
        <View>
          <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
            <Ionicons name="arrow-back" size={32} color={colors.heading} />
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
      )}
      <Image
        style={styles.image}
        source={{ uri: 'https://source.unsplash.com/random' }}
        alt="Avatar"
      />
    </View>
  )
}
