import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function FontLoader({ fonts, onFinish }) {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(fonts);
      SplashScreen.hideAsync();
      onFinish();
    }

    SplashScreen.preventAutoHideAsync();
    loadFonts();
  }, [fonts, onFinish]);

  return <ActivityIndicator size="large" color="black" />;
}