import React, { useState } from 'react';
import { TouchableOpacity, View, TextInput } from 'react-native';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native';

type Props = {
  placeholder?: string;
  addComments: (text: string) => void;
};
const CustomTextInput: React.FC<Props> = ({ placeholder, addComments }) => {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (!text.trim()) return;

    addComments(text);
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder={placeholder || 'Write Your Reply'}
        placeholderTextColor="#888"
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAdd}>
        <Text style={styles.addSign}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    borderWidth: 1,

    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    borderRadius: 20,
  },
  input: {
    width: 200,
    borderWidth: 1,
    // borderColor: '#ccc',
    padding: 20,
    borderRadius: 20,
    marginRight: 8,
    color: 'green',
  },
  addSign: {
    fontSize: 50,
    color: 'gray',
  },
});
export default CustomTextInput;
