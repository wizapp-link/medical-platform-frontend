import { Box, Button, Container, Grid, Link, Paper, Stack, TextField, Typography, CircularProgress, Snackbar } from "@mui/material";
import React, { FormEvent, useState } from 'react';
import { createTheme, ThemeProvider, colors } from '@mui/material';
import { managerTheme, patientTheme } from "../Themes";
import { selectUserLogIn } from '../features/auth/userLogInSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { fetchReport, selectReport } from "../features/manager/reportSlice";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ReportFormData {
  startDate: string;
  endDate: string;
}

export default function ManagerReportScreen(props: any) {
  const [formData, setFormData] = useState<ReportFormData>({
    startDate: "",
    endDate: "",
  });

  const {userInfo} = useAppSelector(selectUserLogIn);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const reportState = useAppSelector(selectReport);
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    if(userInfo){
      console.log("Generating report for:", formData);
      const sDate = formData.startDate.split('-');
      const eDate = formData.endDate.split('-');
      dispatch(fetchReport(sDate[2]+'/'+sDate[1]+'/'+sDate[0], eDate[2]+'/'+eDate[1]+'/'+eDate[0], userInfo.token));
      console.log("Data: ", reportState.formData)

    }

  };

  const downloadFile = () => {
    if(reportState.formData){
      const url = window.URL.createObjectURL(new Blob([reportState.formData]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report_${formData.startDate}_${formData.endDate}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return (
    <ThemeProvider theme={managerTheme}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" gutterBottom>
          Generate Reports
        </Typography>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                name="startDate"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.startDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                type="date"
                name="endDate"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formData.endDate}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={reportState.status === "loading"}
              >
                Generate Report
              </Button>
            </Grid>
            {reportState.status === "succeeded" && (
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={downloadFile}
                >
                  Download CSV
                </Button>
              </Grid>
            )}
          </Grid>
        </Paper>
        <Snackbar
          open={reportState.status === "loading"}
          message={"Generating report, please wait..."}
          autoHideDuration={3000}
        />
      </Box>
    </ThemeProvider>
  );
}
