// eslint-disable-next-line camelcase
import { Jost_400Regular, Jost_600SemiBold } from '@expo-google-fonts/jost'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect } from 'react'
import { View } from 'react-native'
import Routes from './src/routes'

export default function App() {
  const [fontsLoaded] = useFonts({
    // eslint-disable-next-line camelcase
    Jost_400Regular,
    // eslint-disable-next-line camelcase
    Jost_600SemiBold,
  })

  const prepare = async () => await SplashScreen.preventAutoHideAsync()

  useEffect(() => {
    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Routes />
      <StatusBar style="dark" />
    </View>
  )
}
