// import React, { useState } from "react";
// import { Avatar, Button, Menu, MenuItem, Typography } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { logOut, selectUserLogIn } from "../features/auth/userLogInSlice";
// import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { roleToPosition } from "../constants/PositionRoleMap";
// import { Stack } from "@mui/system";
// import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
// import SettingsIcon from "@mui/icons-material/Settings";
// import People from "@mui/icons-material/People";
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import LogoutIcon from "@mui/icons-material/Logout";
// import { styled, alpha } from "@mui/material/styles";
// import { MenuProps } from "@mui/material/Menu";

// export default function UserProfileMenu() {
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const dispatch = useAppDispatch();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { userInfo } = useAppSelector(selectUserLogIn);
//   const open = Boolean(anchorEl);

//   //   const handleClick = (e: any) => {
//   //     setAnchorEl(e.currentTarget);
//   //   };
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleSettings = () => {
//     const position = roleToPosition.get(userInfo!.userData.role);
//     navigate(`/${position}/settings`);
//   };
//   const handleProfile = () => {
//     const position = roleToPosition.get(userInfo!.userData.role);
//     navigate(`/${position}/profile`);
//   };
//   const handleLogOut = () => {
//     setAnchorEl(null);
//     navigate("/signout");
//   };
//   const handleLogInClick = () => {
//     // let redirect = location.pathname;
//     // if (redirect === '/register' || redirect === '/signin') redirect = '';
//     // console.log(`redirecting to /signin?redirect=${redirect}`);
//     // console.log(`localStorage.getItem('userInfo') = ${localStorage.getItem('userInfo')}`);
//     navigate(`/`);
//   };

//   const StyledMenu = styled((props: MenuProps) => (
//     <Menu
//       elevation={0}
//       anchorOrigin={{
//         vertical: "bottom",
//         horizontal: "right",
//       }}
//       transformOrigin={{
//         vertical: "top",
//         horizontal: "right",
//       }}
//       {...props}
//     />
//   ))(({ theme }) => ({
//     "& .MuiPaper-root": {
//       borderRadius: 6,
//       marginTop: theme.spacing(1),
//       minWidth: 180,
//       color:
//         theme.palette.mode === "light"
//           ? "rgb(55, 65, 81)"
//           : theme.palette.grey[300],
//       boxShadow:
//         "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
//       "& .MuiMenu-list": {
//         padding: "4px 0",
//       },
//       "& .MuiMenuItem-root": {
//         "& .MuiSvgIcon-root": {
//           fontSize: 18,
//           color: theme.palette.text.secondary,
//           marginRight: theme.spacing(1.5),
//         },
//         "&:active": {
//           backgroundColor: alpha(
//             theme.palette.primary.main,
//             theme.palette.action.selectedOpacity
//           ),
//         },
//       },
//     },
//   }));

//   return (
//     <div>
//       {userInfo ? (
//         <div>
//           {/* <Button id="user-profile" onClick={handleClick} color="inherit" variant="text">
// 						{userInfo.userData.name}
// 					</Button> */}
//           <Button
//             id="demo-customized-button"
//             aria-controls={open ? "demo-customized-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//             variant="contained"
//             disableElevation
//             onClick={handleClick}
//           >
//             <Stack direction="row" spacing={2} alignItems="center">
//               <Avatar>{userInfo?.userData.name.charAt(0)}</Avatar>
//               <Typography sx={{ color: "primary.contrastText" }}>
//                 {userInfo?.userData.name}
//               </Typography>
//               <ArrowDropDownIcon sx={{ color: "primary.contrastText" }} />
//             </Stack>
//           </Button>
//           <StyledMenu
//             open={open}
//             id="demo-customized-menu"
//             MenuListProps={{
//               "aria-labelledby": "demo-customized-button",
//             }}
//             anchorEl={anchorEl}
//             //   open={open}
//             onClose={handleClose}
//           >
//             {/* <Menu
//               id="user-profile-menu"
//               anchorEl={anchorEl}
//               open={Boolean(anchorEl)}
//               onClose={handleClose}
//             > */}
//             <MenuItem onClick={handleSettings}>
//               <SettingsIcon />
//               Settings
//             </MenuItem>
//             <MenuItem onClick={handleProfile}>
//               <AccountBoxIcon />
//               Profile
//             </MenuItem>
//             <MenuItem onClick={handleLogOut}>
//               <LogoutIcon />
//               Log Out
//             </MenuItem>
//             {/* </Menu> */}
//           </StyledMenu>
//         </div>
//       ) : (
//         <Button type="submit" color="inherit" onClick={handleLogInClick}>
//           Sign In
//         </Button>
//       )}
//     </div>
//   );
// }

import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { logOut, selectUserLogIn } from "../features/auth/userLogInSlice";
import { positionToRole, roleToPosition } from "../constants/PositionRoleMap";
import { Stack } from "@mui/system";
import { Avatar, Typography } from "@mui/material";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={1}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
    },
  },
}));

export default function UserProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectUserLogIn);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSettings = () => {
    setAnchorEl(null);
    const position = roleToPosition.get(userInfo!.userData.role);
    navigate(`/${position}/changepassword`);
  };
  const handleProfile = () => {
    setAnchorEl(null);
    const position = roleToPosition.get(userInfo!.userData.role);
    navigate(`/${position}/profile`);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    navigate("/signout");
  };
  const handleLogInClick = () => {
    // let redirect = location.pathname;
    // if (redirect === '/register' || redirect === '/signin') redirect = '';
    // console.log(`redirecting to /signin?redirect=${redirect}`);
    // console.log(`localStorage.getItem('userInfo') = ${localStorage.getItem('userInfo')}`);
    navigate(`/`);
  };

  return (
    <div>
      {userInfo ? (
        <div>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{ backgroundColor: "primary.main" }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar>{userInfo?.userData.name.charAt(0)}</Avatar>
              <Typography>{userInfo?.userData.name}</Typography>
            </Stack>
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleSettings} disableRipple>
              <SettingsIcon />
              Change Password
            </MenuItem>
            <MenuItem onClick={handleProfile} disableRipple>
              <AccountBoxIcon />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogOut} disableRipple>
              <LogoutIcon />
              Sign Out
            </MenuItem>
          </StyledMenu>
        </div>
      ) : (
        <Button type="submit" color="inherit" onClick={handleLogInClick}>
          Sign In
        </Button>
      )}
    </div>
  );
}
