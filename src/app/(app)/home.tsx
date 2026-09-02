import { AuthColors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* ─── tiny icon components (no vector-icons dependency) ───────────── */

function IconWallet() {
  return (
    <View style={[iconStyles.box, { backgroundColor: AuthColors.accentGreen }]}>
      <Text style={iconStyles.emoji}>💳</Text>
    </View>
  );
}

function IconTasks() {
  return (
    <View style={[iconStyles.box, { backgroundColor: AuthColors.accentMagenta }]}>
      <Text style={iconStyles.emoji}>✅</Text>
    </View>
  );
}

function IconCart() {
  return (
    <View style={[iconStyles.box, { backgroundColor: AuthColors.accentYellow }]}>
      <Text style={iconStyles.emoji}>🛒</Text>
    </View>
  );
}

function IconNotes() {
  return (
    <View style={[iconStyles.box, { backgroundColor: '#F5C6E0' }]}>
      <Text style={iconStyles.emoji}>📝</Text>
    </View>
  );
}

const iconStyles = StyleSheet.create({
  box: {
    width: 40,
    height: 40,
    borderRadius: 6,
    borderWidth: 2.5,
    borderColor: AuthColors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  emoji: {
    fontSize: 18,
  },
});

/* ─── dashboard card ─────────────────────────────────────────────── */

interface DashCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  bgColor: string;
  onPress?: () => void;
}

function DashCard({ icon, label, value, sub, bgColor, onPress }: DashCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        cardStyles.card,
        { backgroundColor: bgColor, opacity: pressed ? 0.85 : 1 },
      ]}
    >
      {icon}
      <Text style={cardStyles.label}>{label}</Text>
      <Text style={cardStyles.value}>{value}</Text>
      {sub ? <Text style={cardStyles.sub}>{sub}</Text> : null}
    </Pressable>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 2.5,
    borderColor: AuthColors.border,
    padding: 16,
    shadowColor: AuthColors.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
    minHeight: 140,
  },
  label: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    color: AuthColors.dark,
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.7,
  },
  value: {
    fontSize: 28,
    fontWeight: '900',
    color: AuthColors.dark,
    lineHeight: 32,
  },
  sub: {
    fontSize: 13,
    fontWeight: '700',
    color: AuthColors.dark,
    opacity: 0.6,
    marginTop: 2,
  },
});

/* ─── main screen ────────────────────────────────────────────────── */

export default function HomeScreen() {
  const { user, signOut } = useAuth();

  const firstName =
    user?.user_metadata?.full_name?.split(' ')[0] ?? 'User';

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Header ──────────────────────────────────────────── */}
          <View style={styles.header}>
            {/* Avatar */}
            <View style={styles.avatarWrapper}>
              <View style={styles.avatarShadow} />
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {firstName.charAt(0).toUpperCase()}
                </Text>
              </View>
            </View>

            <Text style={styles.headerTitle}>DASHBOARD</Text>

            {/* Notification bell */}
            <Pressable
              style={({ pressed }) => [
                styles.bellWrapper,
                { opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <View style={styles.bellShadow} />
              <View style={styles.bellBox}>
                <Text style={styles.bellIcon}>🔔</Text>
              </View>
            </Pressable>
          </View>

          {/* ── Hero Card ───────────────────────────────────────── */}
          <View style={styles.heroCard}>
            {/* Yellow accent circle */}
            <View style={styles.heroAccentCircle} />

            <View style={styles.heroBadgeWrapper}>
              <View style={styles.heroBadgeShadow} />
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>RESIDENT</Text>
              </View>
            </View>

            <Text style={styles.heroTitle}>Personal{'\n'}Assistant</Text>
          </View>

          {/* ── Stats Grid ──────────────────────────────────────── */}
          <View style={styles.gridRow}>
            <DashCard
              icon={<IconWallet />}
              label="BALANCE"
              value="LKR 0"
              sub="PENDING"
              bgColor="#FFFFFF"
            />
            <View style={{ width: 14 }} />
            <DashCard
              icon={<IconTasks />}
              label="TASKS"
              value="—"
              sub="Pending"
              bgColor="#FFFFFF"
            />
          </View>

          <View style={styles.gridRow}>
            <DashCard
              icon={<IconCart />}
              label="TO BUY"
              value="—"
              sub="Items"
              bgColor="#FFFFFF"
            />
            <View style={{ width: 14 }} />
            <DashCard
              icon={<IconNotes />}
              label="NOTES"
              value="—"
              sub="Latest Note"
              bgColor="#FFFFFF"
            />
          </View>

          {/* ── Sign Out ────────────────────────────────────────── */}
          <Pressable
            onPress={signOut}
            style={({ pressed }) => [
              styles.signOutBtn,
              { opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* ─── styles ─────────────────────────────────────────────────────── */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AuthColors.signupBg,
  },
  safe: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 40,
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
  },
  avatarShadow: {
    position: 'absolute',
    width: 42,
    height: 42,
    top: 5,
    left: 5,
    backgroundColor: AuthColors.border,
    borderRadius: 4,
  },
  avatar: {
    width: 42,
    height: 42,
    backgroundColor: AuthColors.accentMagenta,
    borderWidth: 2.5,
    borderColor: AuthColors.border,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 2,
    color: AuthColors.dark,
    textTransform: 'uppercase',
  },
  bellWrapper: {
    width: 48,
    height: 48,
  },
  bellShadow: {
    position: 'absolute',
    width: 42,
    height: 42,
    top: 5,
    left: 5,
    backgroundColor: AuthColors.border,
    borderRadius: 4,
  },
  bellBox: {
    width: 42,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: AuthColors.border,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    fontSize: 18,
  },

  /* Hero Card */
  heroCard: {
    backgroundColor: AuthColors.cardBg,
    borderRadius: 8,
    borderWidth: 2.5,
    borderColor: AuthColors.border,
    padding: 28,
    paddingTop: 32,
    paddingBottom: 36,
    shadowColor: AuthColors.border,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    marginBottom: 14,
    overflow: 'hidden',
    minHeight: 180,
  },
  heroAccentCircle: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: AuthColors.accentYellow,
  },
  heroBadgeWrapper: {
    alignSelf: 'flex-start',
    marginBottom: 14,
    width: 96,
    height: 30,
  },
  heroBadgeShadow: {
    position: 'absolute',
    width: 90,
    height: 26,
    top: 3,
    left: 3,
    backgroundColor: AuthColors.border,
    borderRadius: 3,
  },
  heroBadge: {
    width: 90,
    height: 26,
    backgroundColor: AuthColors.accentGreen,
    borderWidth: 2,
    borderColor: AuthColors.border,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBadgeText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    color: AuthColors.dark,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '900',
    color: AuthColors.dark,
    lineHeight: 42,
    letterSpacing: -0.5,
  },

  /* Grid */
  gridRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },

  /* Sign Out */
  signOutBtn: {
    marginTop: 10,
    backgroundColor: AuthColors.accentMagenta,
    borderRadius: 6,
    borderWidth: 2.5,
    borderColor: AuthColors.border,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: AuthColors.border,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
  },
  signOutText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});
