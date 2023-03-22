export type UserData = {
  id: string;
  email: string;
  password: string;
  role: string;
  name: string;
  address: string;
  dob: string;
  phone: string;
  registrationNo: string | null;
  status: string;
  assessmentTaken: boolean;
  assessmentOptionsSelected: string[];
  verificationAttempts: number | null;
  otpExpiryDate: string | null;
  patientQueue: string | null;
  counsellorAssigned: string;
  doctorAssigned: string | null;
  counsellingDone: boolean;
  counsellingComment: string;
  doctoringDone: boolean;
  doctorComment: string | null;
  creationDate: string;
  otp: string | null;
}

export type UserInfo = {
  userData: UserData,
  token: string,
}

// export type Responses = {
//   statusCode: number,
//   error: boolean,
//   response: string,
// }
