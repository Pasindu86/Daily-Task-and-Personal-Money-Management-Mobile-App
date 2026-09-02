import { AuthButton } from '@/components/auth/AuthButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthColors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Text style={styles.iconText}>{visible ? '🙈' : '👁'}</Text>
);

export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [showRepeat, setShowRepeat] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignup = async () => {
    if (!fullName || !email || !password || !repeatPassword) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (password !== repeatPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }
    if (!agreed) {
      Alert.alert(
        'Terms Required',
        'Please agree to the Terms & Conditions.'
      );
      return;
    }
    setLoading(true);
    const success = await signUp(email.trim(), password, fullName.trim());
    setLoading(false);
    if (success) {
      router.back();
    }
  };

  return (
    <View style={styles.bg}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Heading */}
            <View style={styles.headingBlock}>
              <Text style={styles.heading}>JOIN {'\n'}THE{'\n'}CLUB</Text>
              <Text style={styles.subheading}>
                Start managing your daily life today.
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <AuthInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                placeholder="Jane Doe"
                autoCapitalize="words"
              />

              <AuthInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="jane@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <AuthInput
                label="Password"
                rightIcon={<EyeIcon visible={showRepeat} />}
                onRightIconPress={() => setShowRepeat((v) => !v)}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry={!showRepeat}
              />

              <AuthInput
                label="Repeat Password"
                rightIcon={<EyeIcon visible={showRepeat} />}
                onRightIconPress={() => setShowRepeat((v) => !v)}
                value={repeatPassword}
                onChangeText={setRepeatPassword}
                placeholder="••••••••"
                secureTextEntry={!showRepeat}
              />

              {/* Terms checkbox */}
              <TouchableOpacity
                style={styles.termsRow}
                onPress={() => setAgreed((v) => !v)}
                activeOpacity={0.8}
              >
                <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                  {agreed && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.termsText}>
                  I agree to the{' '}
                  <Text style={styles.termsLink}>Terms & Conditions</Text>
                </Text>
              </TouchableOpacity>

              <AuthButton
                label="Create Account"
                onPress={handleSignup}
                backgroundColor={AuthColors.accentGreen}
                textColor={AuthColors.dark}
                shadowColor={AuthColors.border}
                loading={loading}
                style={styles.signupBtn}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <Text style={styles.footerLink}>Log in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: AuthColors.signupBg,
  },
  safe: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 26,
    paddingTop: 48,
    paddingBottom: 40,
  },
  headingBlock: {
    marginBottom: 36,
  },
  heading: {
    fontSize: 64,
    fontWeight: '900',
    color: AuthColors.dark,
    lineHeight: 66,
    letterSpacing: -2,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 15,
    fontWeight: '700',
    color: AuthColors.textMuted,
    letterSpacing: 0.2,
  },
  form: {
    gap: 20,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2.5,
    borderColor: AuthColors.border,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AuthColors.cardBg,
  },
  checkboxChecked: {
    backgroundColor: AuthColors.accentGreen,
  },
  checkmark: {
    fontSize: 13,
    fontWeight: '900',
    color: AuthColors.dark,
    lineHeight: 16,
  },
  termsText: {
    fontSize: 14,
    color: AuthColors.dark,
    fontWeight: '500',
    flex: 1,
  },
  termsLink: {
    fontWeight: '800',
    textDecorationLine: 'underline',
    color: AuthColors.accentMagenta,
  },
  signupBtn: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: AuthColors.textMuted,
    fontWeight: '500',
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '800',
    color: AuthColors.dark,
    textDecorationLine: 'underline',
  },
  iconText: {
    fontSize: 18,
  },
});
