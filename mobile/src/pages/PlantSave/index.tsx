import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, isBefore } from 'date-fns';
import { useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgFromUri } from 'react-native-svg';
import waterDrop from '../../assets/waterdrop.png';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { savePlant } from '../../libs/storage';
import { StackNavigation } from '../../types/navigation';
import { PlantProps } from '../../types/plants';
import styles from './styles';

interface RouteParams {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const route = useRoute();

  const { plant } = route.params as RouteParams;

  const { navigate } = useNavigation<StackNavigation>();

  function handleChangeTime(event: DateTimePickerEvent, dateTime?: Date): void {
    const { type } = event

    if (type === 'set' && dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());
      return Alert.alert('Choose a time in the future! ⏰');
    }

    if (type === 'set' && dateTime) {
      setSelectedDateTime(dateTime);
    }

    setShowDatePicker(false)
  }

  async function handleSave(): Promise<void> {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime
      });

      navigate('Confirmation', {
        title: 'Everything is fine',
        subtitle: 'Rest assured that we will always remind you to take great care of your plant.',
        buttonTitle: 'Thank you so much 🙏',
        icon: 'hug',
        nextScreen: 'PlantSelect',
      });
    } catch {
      Alert.alert('Unable to save. 😢');
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollListContainer}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <Header goBackFeature />
        </View>
        <View style={styles.plantInfo}>
          <SvgFromUri
            uri={plant.photo}
            height={150}
            width={150}
          />
          <Text style={styles.plantName}>
            {plant.name}
          </Text>
          <Text style={styles.plantAbout}>
            {plant.about}
          </Text>
        </View>
        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image
              source={waterDrop}
              style={styles.tipImage}
            />
            <Text style={styles.tipText}>
              {plant.water_tips}
            </Text>
          </View>
          <Text style={styles.alertLabel}>
            Choose the best time to be remembered!
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleChangeTime}
            />
          )}
          <TouchableOpacity
            style={styles.dateTimePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateTimePickerText}>
              {`Change schedule: ${format(selectedDateTime, 'HH:mm')}`}
            </Text>
          </TouchableOpacity>
          <Button
            title="Register plant"
            onPress={handleSave}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
