import { StyleSheet, StatusBar } from 'react-native';
import {Roboto_400Regular, Roboto_700Bold, useFonts} from "@expo-google-fonts/roboto";
import {GluestackUIProvider} from "@gluestack-ui/themed";
import Logo from '@assets/logo.svg'

import {config} from "./config/gluestack-ui.config";
import {Loading} from "@components/Loading";
import { Routes } from '@routes/index'
import {AuthContext, AuthContextProvider} from "@contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_700Bold, Roboto_400Regular })

  return (
      <GluestackUIProvider config={config}>

        <StatusBar barStyle="light-content"  backgroundColor="transparent" translucent />

        <AuthContextProvider>
          {fontsLoaded ? (
              <Routes />
              ): (
              <Loading />
            )
          }
        </AuthContextProvider>

      </GluestackUIProvider>
  );
}
