import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigate} from 'react-router-native';
import Input from '../../shared/components/Input';
import {Button} from 'react-native-paper';
import {
  COLOR_FB_PRIMARY,
  COLOR_FB_SECONDARY,
  COLOR_WHITE,
} from '../../shared/constants/colors';
import Loader from '../../shared/components/Loader';
import {useMutation} from 'react-query';
import {NewUser} from '../../shared/auth/models';
import {register} from '../../shared/auth/requests';

function RegisterScreen() {
  const navigate = useNavigate();

  const registerMutation = useMutation(
    (newUser: NewUser) => register(newUser),
    {
      onSuccess: () => {
        resetForm();
        navigate('/login');
      },
    },
  );

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  const registerHandler = () => {
    if (!firstName || !lastName || !email || !password) {
      return;
    }

    registerMutation.mutate({firstName, lastName, email, password});
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.facebookText}>Facebook</Text>

        <View style={styles.formInput}>
          <Input
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <Input placeholder="Email" value={email} onChangeText={setEmail} />
          <Input
            secure
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
          />
          <View>
            {registerMutation.isLoading ? (
              <Loader />
            ) : (
              <Button
                style={styles.registerButton}
                labelStyle={styles.registerButtonText}
                mode="contained"
                onPress={registerHandler}>
                Register
              </Button>
            )}
          </View>
        </View>

        <Button
          labelStyle={styles.signUpText}
          onPress={() => navigate('/login')}>
          Already a member? Log In
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: COLOR_FB_PRIMARY,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  formInput: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  facebookText: {
    fontSize: 56,
    fontWeight: '700',
    color: COLOR_WHITE,
    marginBottom: 32,
  },
  registerButtonContainer: {
    marginTop: 16,
    width: '100%',
  },
  registerButton: {
    backgroundColor: COLOR_FB_SECONDARY,
    height: 48,
    borderRadius: 0,
  },
  registerButtonText: {
    paddingTop: 8,
    fontSize: 24,
  },
  signUpText: {
    color: COLOR_WHITE,
    fontSize: 16,
  },
});

export default RegisterScreen;
