import dayjs from "dayjs";
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

export const getFutureAppointments = (appointments: Appointment[], status: string) => {
	const now = dayjs();
	return appointments.filter((appointment) => {
		if (appointment.status !== status) {
			return false;
		}
		const appointmentDateTime = new Date(`${appointment.slotDate} ${appointment.slotTime.split("-")[0]}`)
		if (now.isAfter(appointmentDateTime)) {
			return false;
		}
		return true;
	})
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
