import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import PlainTextInput from '../components/PlainTextInput';
import CountryPicker from 'react-native-country-picker-modal';
import CheckBox from '@react-native-community/checkbox';

const LoginScreen = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const [withFilter, setWithFilter] = useState(true);
  const [visible, setVisible] = useState(false);

  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [gender, setGender] = useState('');

  // const [data, setData] = useState({
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   country: '',
  //   isValid: true,
  // });

  const Gender = ['Male', 'Female'];

  const handleFirstName = (value) => {
    setFirstName(value);
    console.log(firstName);
  };

  const handleLastName = (value) => {
    setLastName(value);
    console.log(lastName);
  };

  const handleEmail = (value) => {
    setEmail(value);
    console.log(email);
  };
  const handlePhone = (value) => {
    setPhone(value);
    console.log(phone);
  };

  const onSelect = (country) => {
    setCountry(country.name);
    console.log(country.name);
  };
  const deselectCountry = () => {
    setCountry(null);
  };

  const handleValidation = (value) => {
    if (value.length > 4) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleEmailValid = (value) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(value) === true) {
      return;
    } else {
      alert('invalid email ');
    }
  };
  const handlePhoneValid = (value) => {
    var reg = /^[0-9]*$/;
    if (reg.test(value) === true) {
      return;
    } else {
      alert('invalid number');
    }
  };

  const handleSubmit = () => {
    console.log(firstName, lastName, email, phone, country, gender);
  };

  const validate = (value) => {};

  return (
    <View style={styles.mainView}>
      <View>
        <PlainTextInput
          title="First Name"
          value={firstName}
          placeholder="Enter your first name"
          handleChange={handleFirstName}
          onEndEditing={(e) => handleValidation(e.nativeEvent.text)}
          validate={validate({empty: true, minLeng: 8, specialChar: false})}
        />
        {isValid ? null : <Text>should be more than 4 character </Text>}
        <PlainTextInput
          title="Last Name"
          placeholder="Enter your Last name"
          handleChange={handleLastName}
        />
        <PlainTextInput
          title="Email"
          placeholder="Enter your email Address"
          handleChange={handleEmail}
          onEndEditing={(e) => handleEmailValid(e.nativeEvent.text)}
        />
        <PlainTextInput
          title="Phone"
          placeholder="Enter your phone number"
          handleChange={handlePhone}
          onEndEditing={(e) => handlePhoneValid(e.nativeEvent.text)}
        />
      </View>

      <View style={styles.countrySelectView}>
        <Text style={styles.fieldTitle}>Your Country</Text>

        {country !== null ? (
          <TouchableOpacity onPress={deselectCountry}>
            <Text style={styles.selectedCountryName}>{country}</Text>
          </TouchableOpacity>
        ) : (
          <CountryPicker
            style={styles.countryPickerStyle}
            {...{
              withFilter,
              onSelect,
              withCountryNameButton,
            }}
          />
        )}
      </View>
      {/* <View style={styles.genderView}>
        <Text style={styles.fieldTitle}>Your Gender</Text>

        {Gender.map((item, key) => {
          return (
            <View key={key} style={styles.gender}>
              <CheckBox
                checked={true}
                lineWidth={2}
                style={styles.checkBox}
                disabled={false}
                onValueChange={() => {
                  setGender(item);
                  console.log(gender);
                }}
              />
              <Text>{item}</Text>
            </View>
          );
        })}
      </View> */}

      <TouchableOpacity onPress={handleSubmit}>
        <View style={styles.submitView}>
          <Text>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 20,
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
  genderView: {
    padding: 10,
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
  submitView: {
    margin: 20,
    backgroundColor: '#ddd',
    alignItems: 'center',
    padding: 20,
  },
});

export default LoginScreen;
