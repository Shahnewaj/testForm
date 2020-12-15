import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomButton = ({onPress, title}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.submitView}>
        <Text>{title}</Text>
      </View>
    </TouchableOpacity>
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
  submitView: {
    margin: 20,
    backgroundColor: '#ddd',
    alignItems: 'center',
    padding: 20,
  },
  countrySelectView: {
    padding: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  fieldTitle: {
    color: '#666',
    marginVertical: 10,
    fontSize: 16,
  },
  countryPickerStyle: {
    backgroundColor: '#000',
  },
  selectedCountryName: {
    fontSize: 16,
    paddingVertical: 10,
  },
  gender: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  checkBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default CustomButton;
