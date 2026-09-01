import { AuthButton } from '@/components/auth/AuthButton';
import { AuthInput } from '@/components/auth/AuthInput';
import { AuthColors } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/** Simple SVG-free icon substitutes using Text */
const MailIcon = () => <Text style={styles.iconText}>✉</Text>;
const LockIcon = () => <Text style={styles.iconText}>🔒</Text>;
const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Text style={styles.iconText}>{visible ? '🙈' : '👁'}</Text>
);

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // TODO: wire up auth
  };

  return (
    <LinearGradient
      colors={AuthColors.loginGradient}
      locations={[0, 0.45, 1]}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.9, y: 1 }}
      style={styles.gradient}
    >
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
            {/* Card */}
            <View style={styles.card}>
              {/* Yellow accent square */}
              <View style={styles.accentSquareWrapper}>
                <View style={styles.accentSquareShadow} />
                <View style={styles.accentSquare} />
              </View>

              {/* Heading */}
              <Text style={styles.heading}>WEL{'\n'}COME{'\n'}BACK.</Text>
              <Text style={styles.subheading}>
                Log in to manage your daily tasks.
              </Text>

              {/* Form */}
              <View style={styles.form}>
                <AuthInput
                  label="Email Address"
                  leftIcon={<MailIcon />}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="manager@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <View>
                  <View style={styles.passwordHeader}>
                    <Text style={styles.passwordLabel}>PASSWORD</Text>
                    <TouchableOpacity activeOpacity={0.7}>
                      <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                  <AuthInput
                    label=""
                    leftIcon={<LockIcon />}
                    rightIcon={<EyeIcon visible={showPassword} />}
                    onRightIconPress={() => setShowPassword((v) => !v)}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                  />
                </View>

                <AuthButton
                  label="Log In"
                  onPress={handleLogin}
                  backgroundColor={AuthColors.accentMagenta}
                  textColor="#FFFFFF"
                  style={styles.loginBtn}
                />
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => router.push('/(auth)/signup' as any)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.footerLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: AuthColors.cardBg,
    borderRadius: 6,
    borderWidth: 2.5,
    borderColor: AuthColors.border,
    padding: 28,
    // Hard offset shadow
    shadowColor: AuthColors.border,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  accentSquareWrapper: {
    width: 52,
    height: 52,
    marginBottom: 24,
  },
  accentSquareShadow: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 6,
    left: 6,
    backgroundColor: AuthColors.border,
    borderRadius: 2,
  },
  accentSquare: {
    width: 44,
    height: 44,
    backgroundColor: AuthColors.accentYellow,
    borderWidth: 2.5,
    borderColor: AuthColors.border,
    borderRadius: 2,
  },
  heading: {
    fontSize: 52,
    fontWeight: '900',
    color: AuthColors.dark,
    lineHeight: 54,
    letterSpacing: -1,
    marginBottom: 12,
  },
  subheading: {
    fontSize: 15,
    color: AuthColors.textMuted,
    marginBottom: 32,
    fontWeight: '500',
  },
  form: {
    gap: 20,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  passwordLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    color: AuthColors.dark,
    textTransform: 'uppercase',
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '700',
    color: AuthColors.accentMagenta,
  },
  loginBtn: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
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
