export type UserData = {
  id: string;
  email:string;
  role: string;
  name: string;
  address: string;
  dob: string;
  phone: string;
  registrationNo: string | null;
  status: string;
  assessmentTaken: boolean;
  
  // counsellorAssigned: string | null;
  // doctorAssigned: string | null;
  
  assessmentOptionsSelected: string[],
  creationDate: string,
  otp: string | null,
  otpExpiryDate: string | null,
  password: string | null,

  // appointments?: Appointment[],
  // counsellingComment?: string | null,
  // counsellingDone?: boolean,
  // counsellorAssigned?: string | null,
  // doctorAssigned?: string | null,
  // doctorComment?: string | null,
  // doctoringDone?: boolean,
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