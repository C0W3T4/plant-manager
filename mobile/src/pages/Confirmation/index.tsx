import { useNavigation } from '@react-navigation/core'
import { useRoute } from '@react-navigation/native'
import { SafeAreaView, Text, View } from 'react-native'
import { Button } from '../../components/Button'
import { StackNavigation, StackScreens } from '../../types/navigation'
import styles from './styles'

interface RouteParams {
  title: string
  subtitle: string
  buttonTitle: string
  icon: 'smile' | 'hug'
  nextScreen: StackScreens
}

const emojis = {
  hug: '🤗',
  smile: '😄',
}

export function Confirmation() {
  const { navigate } = useNavigation<StackNavigation>()
  const routes = useRoute()

  const { title, subtitle, buttonTitle, icon, nextScreen } =
    routes.params as RouteParams

  function handleMoveOn(): void {
    navigate(nextScreen)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.footer}>
          <Button title={buttonTitle} onPress={handleMoveOn} />
        </View>
      </View>
    </SafeAreaView>
  )
}
