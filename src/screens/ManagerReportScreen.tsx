import { Box, Button, Container, Grid, Link, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { FormEvent, useState } from 'react';
import { createTheme, ThemeProvider, colors } from '@mui/material';
import { managerTheme, patientTheme } from "../Themes";
import { selectUserLogIn } from '../features/auth/userLogInSlice';
import { useAppSelector } from '../app/hooks';


interface ReportFormData {
  startDate: string;
  endDate: string;
}
export default function ManagerReportScreen(props: any) {
  const [formData, setFormData] = useState<ReportFormData>({
    startDate: "",
    endDate: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Generate the report based on the selected start date and end date
    console.log("Generating report for:", formData);
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
                >
                  Generate Report
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Box>
    </ThemeProvider>
  );

}