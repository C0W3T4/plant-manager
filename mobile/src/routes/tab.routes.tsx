import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { MyPlants } from '../pages/MyPlants';
import { PlantSelect } from '../pages/PlantSelect';
import colors from '../styles/colors';
import { BottomTabParamList } from '../types/navigation';

const { Navigator, Screen } = createBottomTabNavigator<BottomTabParamList>();

const TabRoutes = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarActiveTintColor: colors.green,
        tabBarInactiveTintColor: colors.heading,
        tabBarLabelPosition: 'beside-icon',
        tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 0,
          height: 88
        },
      }}
      backBehavior='history'
    >
      <Screen
        name="NewPlant"
        component={PlantSelect}
        options={{
          tabBarLabel: 'New Plant',
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />
      <Screen
        name="MyPlants"
        component={MyPlants}
        options={{
          tabBarLabel: 'My plants',
          tabBarIcon: (({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </Navigator>
  )
}

export default TabRoutes;
