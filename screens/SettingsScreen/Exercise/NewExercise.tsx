import React, {useState} from 'react';
import {Overlay} from 'react-native-elements';
import {
  Exercise,
  ExerciseCreateInput,
  ADD_EXERCISE,
} from '../../../graphql/ExerciseGQL';
import {useMutation} from '@apollo/react-hooks';
import Form, {InputType} from '../../../components/Form';

type NewExerciseProps = {
  isFormVisible: boolean;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId: string;
};

const NewExercise = ({
  isFormVisible,
  setIsFormVisible,
  categoryId,
}: NewExerciseProps) => {
  const blankExercise: ExerciseCreateInput = {
    name: '',
    desc: '',
    categoryId,
  };
  const [newExercise, setNewExercise] = useState(blankExercise);
  const exerciseInputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: newExercise.name,
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: newExercise.desc || '',
    },
  ];

  const [addExercise] = useMutation<
    {returnedExercise: Exercise},
    {newExercise: ExerciseCreateInput}
  >(ADD_EXERCISE, {variables: {newExercise}});

  const handleChange = (key: string, value: string) => {
    setNewExercise({...newExercise, [key]: value});
  };

  const handleSubmit = () => {
    addExercise();
    setNewExercise(blankExercise);
    setIsFormVisible(false);
  };

  return (
    <Overlay
      isVisible={isFormVisible}
      onBackdropPress={() => setIsFormVisible(false)}
      height="auto">
      <Form
        inputs={exerciseInputs}
        title="New Exercise"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Overlay>
  );
};

export default NewExercise;