// types.ts
export interface User {
  username: string;
  password: string;
}

export interface AuthState {
  user: string | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegistrationFormData {
  username: string;
  password: string;
  confirmPassword: string;
  chineseName: string;
  surname: string,
  givenName: string,
  email: string;
  hkidOrPassport: string;
  placeOfIssue: string;
  phoneNumber: string;
}

export type RegistrationRootStackParamList = {
  GetMobilePhone: undefined;
  GetEmail: undefined;
  BasicInfo: undefined;
  PrivacyPolicyRegistration: undefined;
  AccountCreateWithIn24Hours: undefined;
  HkidPassport: { formData: RegistrationFormData };
};
