import React from 'react'
import {RouteProp} from '@react-navigation/native'
import {StackNavigationProp} from '@react-navigation/stack'
import {useQuery, useMutation} from '@apollo/react-hooks'

import {CurrentWorkoutStackParamList} from '../CurrentWorkoutNavigator'
import WorkoutExercisePage from '../../../components/WorkoutExercise/WorkoutExercisePage'
import {WORKOUT_EXERCISE_WITH_SETS, WorkoutExerciseWithSetsData} from '../../../graphql/WorkoutExerciseGQL'
import {WorkoutSet, WorkoutSetCreateInput, ADD_WORKOUT_SET} from '../../../graphql/WorkoutSetGQL'

type CurrentExerciseRouteProp = RouteProp<CurrentWorkoutStackParamList, 'CurrentExercise'>

type CurrentExerciseProps = {
  navigation: StackNavigationProp<CurrentWorkoutStackParamList>
  route: CurrentExerciseRouteProp
}

const CurrentExerciseScreen = ({route}: CurrentExerciseProps) => {
  const {data, loading, refetch} = useQuery<WorkoutExerciseWithSetsData>(WORKOUT_EXERCISE_WITH_SETS, {
    variables: {id: route.params.id}
  })

  const refreshWorkoutExercise = () => {
    if (data?.workoutExercise?.id) refetch().catch((err) => console.log(err))
  }

  const [addWorkoutSet] = useMutation<{addWorkoutSet: WorkoutSet}, {newWorkoutSet: WorkoutSetCreateInput}>(
    ADD_WORKOUT_SET
  )

  const handleWorkoutSetCreate = () => {
    if (data?.workoutExercise.id) {
      addWorkoutSet({variables: {newWorkoutSet: {workoutExerciseId: data?.workoutExercise.id}}})
        .then((res) => {
          if (res.data?.addWorkoutSet.id) refreshWorkoutExercise()
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <WorkoutExercisePage
      loading={loading}
      refetch={refetch}
      refreshWorkoutExercise={refreshWorkoutExercise}
      handleWorkoutSetCreate={handleWorkoutSetCreate}
      workoutExercise={data?.workoutExercise}
    />
  )
}

export default CurrentExerciseScreen
