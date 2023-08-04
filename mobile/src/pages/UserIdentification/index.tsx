import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Emoji from 'react-native-emoji';
import { Button } from '../../components/Button';
import colors from '../../styles/colors';
import { StackNavigation } from '../../types/navigation';
import styles from './styles';

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const [name, setName] = useState<string>();

  const { navigate } = useNavigation<StackNavigation>();

  async function handleSubmit(): Promise<void> {
    if (!name) {
      return Alert.alert("Why don't you tell me your name? 😢");
    }

    try {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigate('Confirmation', {
        title: 'All set!',
        subtitle: `Now let's start taking care of your little plants with a lot of love`,
        buttonTitle: 'Get started',
        icon: 'smile',
        nextScreen: 'PlantSelect',
      });
    } catch {
      Alert.alert('Could not save your name! 😢');
    }
  }

  function handleInputBlur(): void {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handleInputFocus(): void {
    setIsFocused(true);
  }

  function handleInputChange(value: string): void {
    setIsFilled(!!value);
    setName(value);
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  <Emoji name="seedling" />
                  {'\n\n'}
                  {isFilled ? '😄' : '😃'}
                </Text>
                <Text style={styles.title}>
                  How can we
                  {'\n'}
                  call you?
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green }
                ]}
                placeholder="Type your name"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={handleInputChange}
              />
              <View style={styles.footer}>
                <Button title="Confirm" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
