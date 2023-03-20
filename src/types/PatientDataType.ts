export type Patient = {
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

export const defaultPatient: Patient = {
  id: "",
  email: "",
  password: "",
  role: "",
  name: "",
  address: "",
  dob: "",
  phone: "",
  registrationNo: null,
  status: "",
  assessmentTaken: false,
  assessmentOptionsSelected: [],
  verificationAttempts: null,
  otpExpiryDate: null,
  patientQueue: null,
  counsellorAssigned: "",
  doctorAssigned: null,
  counsellingDone: false,
  counsellingComment: "",
  doctoringDone: false,
  doctorComment: null,
  creationDate: "",
  otp: null,
};