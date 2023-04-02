import { Appointment, RawAppointment } from "../types/AppointmentType";

export const flattenAndAddDatesToRawAppointments = (rawAppointments: any) => {
	const appointments: Appointment[] = [];

	Object.keys(rawAppointments).forEach(
		(dateStr) => {
			const rawAppointmentsByDate: RawAppointment[] = rawAppointments[dateStr];
			rawAppointmentsByDate.forEach(
				(rawAppointments) => {
					appointments.push(
						{
							...rawAppointments,
							slotDate: dateStr,
						} as Appointment
					)
				}
			)
		}
	)
	return appointments;
}

// Sample raw appointments 
// "appointments": {
// 	"2023-03-28": [
// 		{
// 				"slotTime": "12:00-13:00",
// 				"name": "Harsh Singh",
// 				"status": "ACCEPTED",
// 				"slotAssignedBy": "sk9331657@gmail.com",
// 				"slotAssignedTo": null,
// 				"type": "COUNSELLOR"
// 		}
// 	]
// }
