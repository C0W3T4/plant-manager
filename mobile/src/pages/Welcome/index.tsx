import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import wateringImg from '../../assets/watering.png';
import { StackNavigation } from '../../types/navigation';
import styles from './styles';

export function Welcome() {
  const { navigate } = useNavigation<StackNavigation>();

  function handleStart(): void {
    navigate('UserIdentification');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Manage
          {'\n'}
          your plants
          {'\n'}
          easily
        </Text>
        <Image
          source={wateringImg}
          style={styles.image}
          resizeMode='contain'
        />
        <Text style={styles.subtitle}>
          Don't forget to water your plants anymore.
          We take care to remind you whenever you need it.
        </Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
