export type Appointment = {
  name: string,
  slotAssignedBy: string,
  slotAssignedTo: string | null,
  slotTime: string,
	slotDate: string,
  status: string,
  type: string,
}

export type RawAppointment = {
  name: string,
  slotAssignedBy: string,
  slotAssignedTo: string | null,
  slotTime: string,
  status: string,
  type: string,
}
