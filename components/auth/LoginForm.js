'use strict';

import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button
} from 'react-native';

const LoginForm = ({ handleEmailChange, handlePasswordChange, handleSubmit, user }) => {

  // const formInvalid = Object.keys(errors).some(key => errors[key]);
  return (
    <View style={styles.container}>
      <View style={styles.flowRight}>
        <TextInput
          style={styles.input}
          type='email'
          name='email'
          value={user.email}
          onChange={handleEmailChange}
          placeholder='Email'
        />
      </View>
      <View style={styles.flowRight}>
        <TextInput
          style={styles.input}
          type='password'
          name='password'
          value={user.password}
          onChange={handlePasswordChange}
          placeholder='Password'
        />
      </View>
      {/* { errors.message && <small>{errors.message}</small> } */}
      <View style={styles.flowRight}>
        <Button
          onPress={handleSubmit}
          color='#48BBEC'
          title='Login'
        />
      </View>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    marginBottom: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});
