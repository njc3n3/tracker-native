import React, {useState} from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'
import {Text} from 'react-native-elements'
import {useTheme} from '@react-navigation/native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

import {getFormattedDateTime} from '../../../utils/DateUtils'
import {Workout} from '../../../graphql/WorkoutGQL'

type Props = {
  editableWorkout: Workout
  setEditableWorkout: React.Dispatch<React.SetStateAction<Workout>>
}

const EditWorkout = ({editableWorkout, setEditableWorkout}: Props) => {
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false)
  const showStartTimePicker = () => setStartTimePickerVisibility(true)
  const hideStartTimePicker = () => setStartTimePickerVisibility(false)
  const handleStartTimeConfirm = (startTime: Date) => {
    setEditableWorkout({...editableWorkout, startTime: startTime.getTime().toString()})
    hideStartTimePicker()
  }

  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false)
  const showEndTimePicker = () => setEndTimePickerVisibility(true)
  const hideEndTimePicker = () => setEndTimePickerVisibility(false)
  const handleEndTimeConfirm = (endTime: any) => {
    setEditableWorkout({...editableWorkout, endTime: endTime.getTime().toString()})
    hideEndTimePicker()
  }

  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      padding: 10
    },
    inputText: {
      fontSize: 18,
      color: theme.colors.primary
    }
  })
  return (
    <>
      <View style={styles.container}>
        <Text>Started:</Text>
        <TouchableOpacity onPress={showStartTimePicker}>
          <Text style={styles.inputText}>
            {editableWorkout.startTime ? getFormattedDateTime(editableWorkout.startTime) : 'Start Time'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text>Ended:</Text>
        <TouchableOpacity onPress={showEndTimePicker}>
          <Text style={styles.inputText}>
            {editableWorkout.endTime ? getFormattedDateTime(editableWorkout.endTime) : 'In Progress'}
          </Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isStartTimePickerVisible}
        date={editableWorkout.startTime ? new Date(Number(editableWorkout.startTime)) : new Date()}
        mode='datetime'
        onConfirm={handleStartTimeConfirm}
        onCancel={hideStartTimePicker}
      />
      <DateTimePickerModal
        isVisible={isEndTimePickerVisible}
        date={editableWorkout.endTime ? new Date(Number(editableWorkout.endTime)) : new Date()}
        mode='datetime'
        onConfirm={handleEndTimeConfirm}
        onCancel={hideEndTimePicker}
      />
    </>
  )
}

export default EditWorkout
