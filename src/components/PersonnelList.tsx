import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logOut, selectUserLogIn } from "../features/auth/userLogInSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { roleToPosition } from "../constants/PositionRoleMap";
import { Stack } from "@mui/system";
import { UserData } from "../types/UserDataType";
import personnelStatus from "../constants/PersonnelStatus";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface PropsType {
  users: UserData[] | null;
  handleAssessmentButtonClick: (userData: UserData) => void;
  handleAccept: (userData: UserData) => void;
  handleReject: (userData: UserData) => void;
}

export default function PersonnelList(props: PropsType) {
  const { users, handleAssessmentButtonClick, handleAccept, handleReject } =
    props;

  return (
    <Grid container justifyContent={"start"}>
      {users &&
        users.map((user) => (
          <Grid key={user.id}>
            <Box>
              <Box maxWidth={350} maxHeight={250} sx={{marginLeft: 6}}>
                <Card
                  sx={{
                    boxShadow: 3,
                    marginTop: 5,
                    flex: 1,
                    marginLeft: 2,
                    marginRight: 2,
                  }}
                >
                  <CardContent
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {/* <Box > */}
                    <Stack direction={"row"}>
                      <ListItemAvatar sx={{ display: "flex" }}>
                        <Avatar
                          alt={user.name}
                          src=""
                          sx={{ alignSelf: "center" }}
                        />
                      </ListItemAvatar>
                      <Stack direction={"column"}>
                        <Typography noWrap>{user.name}</Typography>
                        <Typography noWrap>{`Email: ${user.email}`}</Typography>
                      </Stack>
                    </Stack>
                    {/* </Box> */}
                  </CardContent>
                  <CardActions>
                    <Stack direction={"row"}>
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleAccept(user);
                        }}
                        disabled={user.status === personnelStatus.verified}
                        sx={{ marginRight: 2 }}
                      >
                        {user.status === personnelStatus.verified
                          ? "Accepted"
                          : "Accept"}
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          handleReject(user);
                        }}
                        disabled={user.status === personnelStatus.declined}
                        sx={{ marginRight: 2 }}
                      >
                        {user.status === personnelStatus.declined
                          ? "Rejected"
                          : "Reject"}
                      </Button>
                      <Button
                        onClick={() => handleAssessmentButtonClick(user)}
                        sx={{ marginRight: 2 }}
                      >
                        <MoreVertIcon />
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              </Box>
            </Box>
          </Grid>
        ))}
    </Grid>
  );
}
