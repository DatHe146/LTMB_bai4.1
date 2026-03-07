import { useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const PHONE_REGEX = /^(?:\+84|84|0)(?:3|5|7|8|9)\d{8}$/;

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const normalizedPhone = useMemo(
    () => phoneNumber.replace(/[\s.-]/g, ''),
    [phoneNumber],
  );
  const hasValue = normalizedPhone.length > 0;

  const handleContinue = () => {
    if (!hasValue) {
      Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại.');
      return;
    }

    if (!PHONE_REGEX.test(normalizedPhone)) {
      Alert.alert('Thông báo', 'Số điện thoại không đúng định dạng.');
      return;
    }

    Alert.alert('Thông báo', 'Số điện thoại hợp lệ.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding', android: 'height' })}
        style={styles.wrapper}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Đăng nhập</Text>
        </View>

        <View style={styles.main}>
          <View style={styles.content}>
            <Text style={styles.sectionTitle} numberOfLines={1}>
              Nhập số điện thoại
            </Text>

            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              multiline={false}
              numberOfLines={1}
              placeholder="Nhập số điện thoại của bạn"
              placeholderTextColor="#b3b3b3"
            />
          </View>

          <View style={styles.footer}>
            <Pressable
              onPress={handleContinue}
              style={[styles.button, !hasValue && styles.buttonDisabled]}
            >
              <Text style={[styles.buttonText, !hasValue && styles.buttonTextDisabled]}>
                Tiếp tục
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  main: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 48,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#222',
    marginBottom: 36,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    fontSize: 24,
    color: '#222',
    paddingBottom: 14,
    marginBottom: 24,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  button: {
    backgroundColor: '#11c5bb',
    height: 56,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ececf0',
  },
  buttonText: {
    fontSize: 26,
    fontWeight: '600',
    color: '#fff',
  },
  buttonTextDisabled: {
    color: '#c5c5c9',
  },
});
