import React from 'react'
import {StatusBar} from 'react-native'
import {AppearanceProvider, Appearance} from 'react-native-appearance'
import {Icon} from 'react-native-elements'
import {NavigationContainer, Route, DarkTheme, DefaultTheme} from '@react-navigation/native'
import {createBottomTabNavigator, BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

import HomeNavigator from './screens/HomeScreen/HomeNavigator'
import CurrentWorkoutNavigator from './screens/CurrentWorkoutScreen/CurrentWorkoutNavigator'
import PastWorkoutsNavigator from './screens/PastWorkoutsScreen/PastWorkoutsNavigator'
import SettingsNavigator from './screens/SettingsScreen/SettingsNavigator'
import GQLProvider from './graphql/GQLProvider'

export type RootTabParamList = {
  HomeNavigator: undefined
  CurrentWorkoutNavigator: undefined
  PastWorkoutsNavigator: undefined
  SettingsNavigator: undefined
}

export type RootNavigationProps = {
  navigation: BottomTabNavigationProp<RootTabParamList>
}

const MyTheme = {danger: 'red', default: 'grey', warning: 'yellow'}
const MyDarkTheme = {...DarkTheme, colors: {...DarkTheme.colors, ...MyTheme}}
const MyDefaultTheme = {...DefaultTheme, colors: {...DefaultTheme.colors, ...MyTheme}}

// TODO: test Android
const App = () => {
  const RootTabs = createBottomTabNavigator<RootTabParamList>()

  type ScreenOptionsArgs = {
    route: Pick<
      Route<'HomeNavigator' | 'CurrentWorkoutNavigator' | 'PastWorkoutsNavigator' | 'SettingsNavigator'>,
      'key' | 'name'
    >
    navigation: any
  }

  type TabBarIconArgs = {
    focused: boolean
    color: string
    size: number
  }

  const screenOptions = ({route}: ScreenOptionsArgs) => {
    return {
      tabBarIcon: ({color}: TabBarIconArgs) => {
        let iconName = ''
        switch (route.name) {
          case 'HomeNavigator':
            iconName = 'home'
            break
          case 'CurrentWorkoutNavigator':
            iconName = 'fitness-center'
            break
          case 'PastWorkoutsNavigator':
            iconName = 'list'
            break
          case 'SettingsNavigator':
            iconName = 'settings'
            break
          default:
            break
        }
        return <Icon name={iconName} type='material' color={color} />
      }
    }
  }

  return (
    <AppearanceProvider>
      <GQLProvider>
        <StatusBar barStyle='dark-content' />
        <NavigationContainer theme={Appearance.getColorScheme() === 'dark' ? MyDarkTheme : MyDefaultTheme}>
          <RootTabs.Navigator initialRouteName='HomeNavigator' screenOptions={screenOptions}>
            <RootTabs.Screen name='HomeNavigator' component={HomeNavigator} options={{title: 'Home'}} />
            <RootTabs.Screen
              name='CurrentWorkoutNavigator'
              component={CurrentWorkoutNavigator}
              options={{title: 'Current'}}
            />
            <RootTabs.Screen name='PastWorkoutsNavigator' component={PastWorkoutsNavigator} options={{title: 'Past'}} />
            <RootTabs.Screen name='SettingsNavigator' component={SettingsNavigator} options={{title: 'Categories'}} />
          </RootTabs.Navigator>
        </NavigationContainer>
      </GQLProvider>
    </AppearanceProvider>
  )
}

export default App
