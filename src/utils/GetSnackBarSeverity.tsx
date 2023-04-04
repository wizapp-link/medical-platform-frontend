import { AlertColor } from "@mui/material";

export default function getSnackbarSeverity(loading: boolean, success: boolean, error: boolean): AlertColor | undefined {
	if (loading) return "info";
	if (success) return "success";
	if (error) return "error";
	else return undefined;
}