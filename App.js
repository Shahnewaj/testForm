import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import FormScreen from './src/screen/FormScreen';
import LoginScreen from './src/screen/LoginScreen';

const App = () => {
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss()}>
        <SafeAreaView>
          <View>
            {/* <LoginScreen /> */}
            <FormScreen />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
