import { createStackNavigator } from '@react-navigation/stack'
import { Confirmation } from '../pages/Confirmation'
import { PlantSave } from '../pages/PlantSave'
import { UserIdentification } from '../pages/UserIdentification'
import { Welcome } from '../pages/Welcome'
import colors from '../styles/colors'
import { StackParamList } from '../types/navigation'
import TabRoutes from './tab.routes'

const { Navigator, Screen } = createStackNavigator<StackParamList>()

const AppRoutes = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {
        backgroundColor: colors.white,
      },
    }}
  >
    <Screen name="Welcome" component={Welcome} />
    <Screen name="UserIdentification" component={UserIdentification} />
    <Screen name="Confirmation" component={Confirmation} />
    <Screen name="PlantSave" component={PlantSave} />
    <Screen name="PlantSelect" component={TabRoutes} />
  </Navigator>
)

export default AppRoutes
