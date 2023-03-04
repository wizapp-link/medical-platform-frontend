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
}

export type UserInfo = {
  userData: UserData,
  token: string,
}
