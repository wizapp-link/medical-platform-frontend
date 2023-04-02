import React, { FormEvent, useState } from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, Badge } from "@mui/material";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import { createTheme, ThemeProvider, colors } from "@mui/material";
import { baseTheme } from "../Themes";
import MainLogo from "../assets/images/main_logo.png";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { AlignHorizontalCenter } from "@mui/icons-material";
import { Container } from "@mui/system";

export default function Header() {
  const navigate = useNavigate();
  const { url } = useParams();

  return (
    <ThemeProvider theme={baseTheme}>
      <AppBar
        position="fixed"
        sx={{
          background:
            "linear-gradient(to right, #6B6891, #388087, #6FB3B8,  #A9C39E, #BADFE7)",
        }}
      >
        <Toolbar>
          <Box width={"100%"}>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Stack direction={"row"} spacing={1}>
                <img src={MainLogo} height="80" width="80" />
                <Box sx={{ marginTop: 5 }}>
                  <Typography
                    variant="h6"
                    flexGrow={1}
                    align="center"
                    fontSize={30}
                    sx={{ marginTop: 2.5, fontSize: 32, fontWeight: 'bold'}}
                  >
                    <Link
                      to="/"
                      component={RouterLink}
                      justifyContent="center"
                      sx={{ textDecoration: "none", color: "secondary.main" }}
                    >
                      We Care
                    </Link>
                  </Typography>
                </Box>
              </Stack>
            </Container>
          </Box>
          {/* <Typography variant='h6'>
					UserName
				</Typography> */}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}
