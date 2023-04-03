import { Alert, Snackbar } from "@mui/material";
import React from "react";
import getSnackbarSeverity from "../utils/GetSnackBarSeverity";

interface Props {
	show: boolean,
	loading: boolean,
	success: boolean,
	error: boolean,
	message: string,
	onClose: () => void,
	autoHideDuration: number
}

export default function ReduxSnackbar(props: Props) {
	const { show, loading, success, error, message, onClose, autoHideDuration } = props;

	return <Snackbar
		open={show && (loading || success || error)}
		autoHideDuration={autoHideDuration}
		onClose={onClose}
	>
		<Alert severity={getSnackbarSeverity(loading, success, error)}>{message}</Alert>
	</Snackbar>
}
