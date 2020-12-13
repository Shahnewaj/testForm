import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const PlainTextInput = (props) => {
  return (
    <View style={styles.inputView}>
      <Text style={styles.inputTitle}> {props.title}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.inputField}
        onChangeText={props.handleChange}
        autoCapitalize={'none'}
        autoCorrect={false}
        onEndEditing={props.onEndEditing}
        {...props}
        validate={props.validate}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  inputView: {
    padding: 10,
  },
  inputTitle: {
    color: '#666',
    marginVertical: 10,
    fontSize: 16,
  },
  inputField: {
    borderBottomColor: '#A6A6A6',
    borderBottomWidth: 1,
    fontSize: 14,
    color: '#333',
    padding: 5,
  },
});
export default PlainTextInput;
