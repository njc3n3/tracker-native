import React from 'react';
import {StatusBar} from 'react-native';
import Home from './screens/HomeScreen';
import CurrentWorkout from './screens/CurrentWorkout';
import PastWorkouts from './screens/PastWorkouts';
import Settings from './screens/SettingsScreen/SettingsScreen';
import ThemeContext, {theme} from './contexts/ThemeContext';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Current: undefined;
  Past: undefined;
  Settings: undefined;
};

const App = () => {
  const RootStack = createStackNavigator<RootStackParamList>();

  return (
    <ThemeContext.Provider value={theme}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={Home} />
          <RootStack.Screen name="Current" component={CurrentWorkout} />
          <RootStack.Screen name="Past" component={PastWorkouts} />
          <RootStack.Screen name="Settings" component={Settings} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export default App;
