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
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';

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
  const [gender, setGender] = useState({
    male: false,
    female: false,
    choice: '',
  });

  const malePressed = (choice) => {
    setGender({
      male: true,
      female: false,
      choice: choice,
    });
    console.log(gender);
  };
  const femalePressed = (choice) => {
    setGender({
      male: false,
      female: true,
      choice: choice,
    });
    console.log(gender);
  };

  const deselectCountry = () => {
    setCountry(null);
  };
  const onSelect = (country) => {
    setCountry(country.name);
    console.log(country.name);
  };

  const addDetails = (values) => {
    setFormData((currentData) => {
      if ((country && gender.male == true) || gender.female == true) {
        let newValue = {
          ...values,
          country: country,
          gender,
        };
        return [newValue, ...currentData];
      } else {
        alert(' select country & Gender also');
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
              <CustomInput
                label="First Name"
                placeholder="Enter First Name "
                onChangeText={formProps.handleChange('firstName')}
                value={formProps.values.firstName}
                onBlur={formProps.handleBlur('firstName')}
                error={
                  formProps.touched.firstName && formProps.errors.firstName
                }
              />
              <CustomInput
                label=" Last Name"
                placeholder="Enter Last Name"
                onChangeText={formProps.handleChange('firstName')}
                onChangeText={formProps.handleChange('lastName')}
                value={formProps.values.lastName}
                onBlur={formProps.handleBlur('lastName')}
                error={formProps.touched.lastName && formProps.errors.lastName}
              />
              <CustomInput
                label=" Email"
                placeholder="Enter Email "
                onChangeText={formProps.handleChange('email')}
                onChangeText={formProps.handleChange('email')}
                value={formProps.values.email}
                onBlur={formProps.handleBlur('email')}
                error={formProps.touched.email && formProps.errors.email}
              />
              <CustomInput
                label="Phone"
                placeholder="Enter Phone "
                onChangeText={formProps.handleChange('phone')}
                onChangeText={formProps.handleChange('phone')}
                value={formProps.values.email}
                onBlur={formProps.handleBlur('phone')}
                error={formProps.touched.phone && formProps.errors.phone}
              />

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
                    value={gender.male}
                    onValueChange={malePressed}
                  />
                  <Text>Male</Text>
                </View>
                <View style={styles.gender}>
                  <CheckBox
                    style={styles.checkBox}
                    value={gender.female}
                    onValueChange={femalePressed}
                  />
                  <Text>Female</Text>
                </View>
              </View>
              <CustomButton onPress={formProps.handleSubmit} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
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
