import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Text, Button} from 'react-native-elements'

import {RootNavigationProps} from '../../App'

const HomeScreen = ({navigation}: RootNavigationProps) => {
  const handlePress = () => navigation.navigate('CurrentWorkoutNavigator')

  return (
    <View style={styles.container}>
      <Text h4>Welcome to Tracker</Text>
      <Button type='clear' title='Start A New Workout' onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomeScreen
