import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  TextInput,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import CheckBox from '@react-native-community/checkbox';

import {Formik} from 'formik';
import * as yup from 'yup';

const validateSchema = yup.object({
  firstName: yup.string().required().min(4, 'must be 4 character '),
  lastName: yup.string().required().min(4, 'must be 4 character '),
  email: yup.string().email().required(),
  phone: yup.string().required().min(6, 'must be a 6 digit number'),
});

const FormScreen = (props) => {
  const [withFilter, setWithFilter] = useState(true);
  const [country, setCountry] = useState(null);
  const [withCountryNameButton, setWithCountryNameButton] = useState(false);
  const [formData, setFormData] = useState([]);

  // checked
  const [checked, setChecked] = useState({
    male: false,
    female: false,
    choice: '',
  });

  const deselectCountry = () => {
    setCountry(null);
  };
  const onSelect = (country) => {
    setCountry(country.name);
    console.log(country.name);
  };

  const malePressed = (choice) => {
    setChecked({
      male: true,
      female: false,
      choice: choice,
    });
    console.log(checked);
  };
  const femalePressed = (choice) => {
    setChecked({
      male: false,
      female: true,
      choice: choice,
    });
    console.log(checked);
  };

  const addDetails = (values) => {
    setFormData((currentData) => {
      if (country) {
        let newValue = {
          ...values,
          country: country,
        };
        return [newValue, ...currentData];
      } else {
        alert('contry needed');
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
      <View>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
          }}
          validationSchema={validateSchema}
          onSubmit={(values, actions) => {
            // console.log(values);
            // actions.resetForm();
            addDetails(values);
            console.log(formData);
          }}>
          {(formProps) => (
            <View>
              <View style={styles.inputView}>
                <Text style={styles.inputTitle}> First Name</Text>
                <TextInput
                  placeholder="Enter First Name "
                  style={styles.inputField}
                  onChangeText={formProps.handleChange('firstName')}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  value={formProps.values.firstName}
                  onBlur={formProps.handleBlur('firstName')}
                />
                <Text>
                  {formProps.touched.firstName && formProps.errors.firstName}
                </Text>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputTitle}> Last Name</Text>
                <TextInput
                  placeholder="Enter Last Name "
                  style={styles.inputField}
                  onChangeText={formProps.handleChange('lastName')}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  value={formProps.values.lastName}
                  onBlur={formProps.handleBlur('lastName')}
                />
                <Text>
                  {formProps.touched.lastName && formProps.errors.lastName}
                </Text>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputTitle}> Email</Text>
                <TextInput
                  placeholder="Enter your email address "
                  style={styles.inputField}
                  onChangeText={formProps.handleChange('email')}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  value={formProps.values.email}
                  onBlur={formProps.handleBlur('email')}
                />
                <Text>{formProps.touched.email && formProps.errors.email}</Text>
              </View>
              <View style={styles.inputView}>
                <Text style={styles.inputTitle}> Phone</Text>
                <TextInput
                  placeholder="Enter your phone number"
                  style={styles.inputField}
                  onChangeText={formProps.handleChange('phone')}
                  autoCapitalize={'none'}
                  autoCorrect={false}
                  value={formProps.values.phone}
                  keyboardType="numeric"
                  onBlur={formProps.handleBlur('phone')}
                />
                <Text>{formProps.touched.phone && formProps.errors.phone}</Text>
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

              <View style={styles.inputView}>
                <Text style={styles.inputTitle}> Gender</Text>
                <View style={styles.gender}>
                  <CheckBox
                    style={styles.checkBox}
                    value={checked.male}
                    onValueChange={malePressed}
                  />
                  <Text>Male</Text>
                </View>
                <View style={styles.gender}>
                  <CheckBox
                    style={styles.checkBox}
                    value={checked.female}
                    onValueChange={femalePressed}
                  />
                  <Text>Female</Text>
                </View>
              </View>

              <TouchableOpacity onPress={formProps.handleSubmit}>
                <View style={styles.submitView}>
                  <Text>Submit</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
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
export default FormScreen;
