import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

export type StackParamList = {
  Welcome: any;
  UserIdentification: any;
  Confirmation: any;
  PlantSelect: any;
  PlantSave: any;
}

export type BottomTabParamList = {
  NewPlant: any;
  MyPlants: any;
}

export type StackNavigation = StackNavigationProp<StackParamList>;

export type BottomTabNavigation = BottomTabNavigationProp<BottomTabParamList>;
