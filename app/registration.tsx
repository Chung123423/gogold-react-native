import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GetUserMobilePhoneScreen from './registration/get_mobile_phone_number';
import BasicInformationRegScreen from './registration/basic_information_registration';
import { RegistrationFormData, RegistrationRootStackParamList } from '../types';
import GetUserEmailScreen from './registration/get-email';
import PrivacyPolicyRegistrationScreen from './registration/privacy_policy';
import AccountCreateWithIn24Hours from './registration/account_create_within_24_hours';



const Stack = createStackNavigator<RegistrationRootStackParamList>();

export default function Registration() {
  return (
    <Stack.Navigator
      initialRouteName="PrivacyPolicyRegistration"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="GetMobilePhone"
        component={GetUserMobilePhoneScreen}
        options={{ headerShown: false  }}
      />

      <Stack.Screen
        name="GetEmail"
        component={GetUserEmailScreen}
        options={{ headerShown: false  }}
      />

      <Stack.Screen
        name="BasicInfo"
        component={BasicInformationRegScreen}
        options={{ headerShown: false  }}
      />

      <Stack.Screen
        name="AccountCreateWithIn24Hours"
        component={AccountCreateWithIn24Hours}
        options={{ headerShown: false  }}
      />
      
      <Stack.Screen
        name="PrivacyPolicyRegistration"
        component={PrivacyPolicyRegistrationScreen}
        options={{ headerShown: false  }}
      />

    </Stack.Navigator>
  );
}