import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
  });

  useEffect(() => {
    // Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState({
        session,
        user: session?.user ?? null,
        loading: false,
      });
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({
        session,
        user: session?.user ?? null,
        loading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    console.log('[Auth] signIn called with email:', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('[Auth] signIn response — error:', error, 'session:', !!data?.session);

      if (error) {
        Alert.alert('Login Failed', error.message);
        return false;
      }
      return true;
    } catch (e: any) {
      console.error('[Auth] signIn exception:', e);
      Alert.alert('Login Failed', e?.message ?? 'An unexpected error occurred');
      return false;
    }
  };

  const signUp = async (
    email: string,
    password: string,
    fullName: string
  ): Promise<boolean> => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });

    if (error) {
      Alert.alert('Sign Up Failed', error.message);
      return false;
    }

    Alert.alert(
      'Check your email',
      'We sent you a confirmation link. Please verify your email to continue.'
    );
    return true;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Sign Out Failed', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
