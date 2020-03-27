import React, {useState} from 'react';
import {Overlay} from 'react-native-elements';
import Form, {InputType} from '../../../components/Form';
import {
  Category,
  CategoryCreateInput,
  ADD_CATEGORY,
} from '../../../graphql/CategoryGQL';
import {useMutation} from '@apollo/react-hooks';

type NewCategoryProps = {
  isFormVisible: boolean;
  setIsFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const NewCategory = ({isFormVisible, setIsFormVisible}: NewCategoryProps) => {
  const initialNewCategory = {
    name: '',
    desc: '',
  };
  const [newCategory, setNewCategory] = useState(initialNewCategory);

  const [addCategory] = useMutation<
    {returnedCategory: Category},
    {newCategory: CategoryCreateInput}
  >(ADD_CATEGORY, {variables: {newCategory}});

  const handleCategoryChange = (key: string, value: string) => {
    setNewCategory({...newCategory, [key]: value});
  };

  const handleSubmit = () => {
    addCategory();
    setNewCategory(initialNewCategory);
    setIsFormVisible(false);
  };

  const inputs: InputType[] = [
    {
      label: 'Name',
      placeholder: 'Enter a name',
      key: 'name',
      value: newCategory.name,
    },
    {
      label: 'Description',
      placeholder: 'Enter a description',
      key: 'desc',
      value: newCategory.desc,
    },
  ];

  return (
    <Overlay
      isVisible={isFormVisible}
      onBackdropPress={() => setIsFormVisible(false)}
      height="auto">
      <Form
        inputs={inputs}
        title="New Category"
        handleChange={handleCategoryChange}
        handleSubmit={handleSubmit}
      />
    </Overlay>
  );
};

export default NewCategory;