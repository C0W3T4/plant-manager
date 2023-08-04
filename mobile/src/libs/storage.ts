import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import * as Notifications from 'expo-notifications';
import { PlantProps, StoragePlantProps } from '../types/plants';

export async function savePlant(plant: PlantProps): Promise<void> {
  try {
    const nexTime = new Date(plant.dateTimeNotification);
    const now = new Date();

    const { times, repeat_every } = plant.frequency;
    if (repeat_every === 'week') {
      const interval = Math.trunc(7 / times);
      nexTime.setDate(now.getDate() + interval);
    }
    else
      nexTime.setDate(nexTime.getDate() + 1)

    const seconds = Math.abs(
      Math.ceil(now.getTime() - nexTime.getTime()) / 1000);

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Heeey, 🌱',
        body: `It's time to take care of your ${plant.name}!`,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: {
          plant
        },
      },
      trigger: {
        seconds: seconds < 60 ? 60 : seconds,
        repeats: true
      },
    });

    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const oldPants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const newPlant = {
      [plant.id]: {
        data: plant,
        notificationId
      }
    }

    await AsyncStorage.setItem('@plantmanager:plants',
      JSON.stringify({
        ...newPlant,
        ...oldPants
      }));
  } catch (error) {
    throw error;
  }
}

export async function loadPlant(): Promise<PlantProps[]> {
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

    const plantsSorted = Object
      .keys(plants)
      .map((plant) => {
        return {
          ...plants[plant].data,
          hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
        }
      })
      .sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification).getTime() / 1000 -
          Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
        )
      );

    return plantsSorted;

  } catch (error) {
    throw error;
  }
}

export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  await Notifications.cancelScheduledNotificationAsync(plants[id].notificationId);
  delete plants[id];

  await AsyncStorage.setItem(
    '@plantmanager:plants',
    JSON.stringify(plants)
  );
}
