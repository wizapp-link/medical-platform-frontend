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
  assessmentOptionsSelected: string[];
  counsellorAssigned: string | null;
  doctorAssigned: string | null;

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