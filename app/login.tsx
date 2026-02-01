import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import DecorativeStripes from '@/components/ui/DecorativeStripes';
import LogoBranding from '@/components/ui/LogoBranding';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

const LoginScreen = () => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle } = useGoogleAuth();

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const userCredential = await signInWithGoogle();
      
      if (userCredential) {
        // Successfully signed in
        console.log('User signed in:', userCredential.user);
        // TODO: Navigate to home screen or handle authentication success
      }
    } catch (error: any) {
      Alert.alert(
        'Sign In Failed',
        error?.message || 'An error occurred during sign in. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Decorative Stripes */}
      <DecorativeStripes position="top" />
      <DecorativeStripes position="bottom" />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Logo and Branding */}
        <LogoBranding showTagline={true} />

        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome</Text>
          <Text style={styles.welcomeSubtitle}>
            Sign in to find your perfect match
          </Text>
        </View>

        {/* Sign In Button */}
        <View style={styles.buttonContainer}>
          <GoogleSignInButton 
            onPress={handleGoogleSignIn} 
            loading={loading}
          />
        </View>

        {/* Terms and Privacy */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{'\n'}
          <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5EFE6',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    width: '100%',
    gap: 40,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontFamily: 'ZonaPro-Bold',
    color: '#1E3A5F',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 350,
    marginTop: 20,
  },
  termsText: {
    fontSize: 12,
    color: '#8A8A8A',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 20,
  },
  termsLink: {
    color: '#1E3A5F',
    fontWeight: '600',
  },
});
