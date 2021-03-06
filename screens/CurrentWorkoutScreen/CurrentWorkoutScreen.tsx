import React, {useState} from 'react'
import {StyleSheet} from 'react-native'
import {useMutation, useQuery} from '@apollo/react-hooks'

import WorkoutPage from '../../components/Workout/WorkoutPage'
import StyledDivider from '../../components/StyledDivider'
import StyledButton from '../../components/StyledButton'
import StyledText from '../../components/StyledText'
import CurrentWorkoutTimer from './CurrentWorkoutTimer'
import {CurrentWorkoutNavigationProps} from './CurrentWorkoutNavigator'
import {
  ADD_WORKOUT,
  WorkoutWithExercises,
  WorkoutDataWithExercises,
  WORKOUT_WITH_EXERCISES,
  STOP_WORKOUT
} from '../../graphql/WorkoutGQL'
import {WorkoutExercise} from '../../graphql/WorkoutExerciseGQL'

const CurrentWorkoutScreen = ({navigation}: CurrentWorkoutNavigationProps) => {
  const [addWorkout] = useMutation<{addWorkout: WorkoutWithExercises}>(ADD_WORKOUT)

  const [stopWorkout] = useMutation<{updateWorkout: WorkoutWithExercises}, {id: string}>(STOP_WORKOUT)

  const [workout, setWorkout] = useState<WorkoutWithExercises | undefined>()
  const {refetch, loading} = useQuery<WorkoutDataWithExercises>(WORKOUT_WITH_EXERCISES, {skip: true})

  const refreshWorkout = () => {
    if (workout?.id) {
      refetch({id: workout.id})
        .then((res) => {
          if (res.data.workout.id) {
            setWorkout(res.data.workout)
          }
        })
        .catch((err) => console.log(err))
    }
  }

  const [isTimerStarted, setIsTimerStarted] = useState(false)

  const handleNewPress = () => {
    addWorkout()
      .then((res) => {
        setWorkout(res.data?.addWorkout)
        setIsTimerStarted(true)
      })
      .catch((err) => console.log(err))
  }

  const handleStopPress = () => {
    if (workout) {
      const {id} = workout
      stopWorkout({
        variables: {id}
      })
        .then(() => {
          setIsTimerStarted(false)
          setWorkout(undefined)
        })
        .catch((err) => console.log(err))
    }
  }

  navigation.setOptions({
    headerRight: () => workout !== undefined && <StyledButton title='Stop' onPress={handleStopPress} />
  })

  const handleExercisePress = ({id, exercise}: WorkoutExercise) => {
    navigation.navigate('CurrentExercise', {
      id,
      name: exercise.name
    })
  }

  return (
    <WorkoutPage
      loading={loading}
      refetch={refetch}
      refreshWorkout={refreshWorkout}
      handleExercisePress={handleExercisePress}
      workout={workout}>
      <>
        {workout === undefined && (
          <>
            <StyledDivider size={125} />
            <StyledText style={styles.header} h4>
              Ready for your next workout?
            </StyledText>
            <StyledButton title='Start Workout' onPress={handleNewPress} />
          </>
        )}
      </>
      {workout?.startTime ? (
        <CurrentWorkoutTimer isTimerStarted={isTimerStarted} startTime={Number(workout?.startTime)} />
      ) : (
        <></>
      )}
    </WorkoutPage>
  )
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center'
  }
})

export default CurrentWorkoutScreen
