import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

interface LogoBrandingProps {
  showTagline?: boolean;
}

const LogoBranding: React.FC<LogoBrandingProps> = ({ showTagline = true }) => {
  return (
    <View style={styles.branding}>
      <Image
        style={styles.logo}
        source={require('@/assets/destined_logo_undecided.png')}
      />
      <View style={{ alignItems: 'center' }}>
        <Text style={[styles.title, { fontSize: 36 }]}>Destined</Text>
        {showTagline && (
          <Text
            style={[
              styles.title,
              { fontSize: 16, marginTop: 5, opacity: 0.8, color: '#8A8A8A' },
            ]}
          >
            the dating app
          </Text>
        )}
      </View>
    </View>
  );
};

export default LogoBranding;

const styles = StyleSheet.create({
  branding: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'ZonaPro-Bold',
    color: '#1E3A5F',
  },
});
