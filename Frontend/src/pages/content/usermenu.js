import React, { useState } from "react";
import {
  Avatar,
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { Settings, ExitToApp, Person } from "@mui/icons-material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./usermenu.css";
import pozentLogo from "./pozent_corporation_logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/authSlice/AuthSlice";

function UserMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const register = () => {
    handleClose();
    navigate("/register");
  };

  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bgcolor={"#3c9ab0"}
        width={"100%"}
        height={"40%"}
      >
        <Box>
          <img width={170} height={70} src={pozentLogo} alt="Pozent" />
        </Box>
        <Typography color={"white"}>ATTENDANCE MANAGEMENT SYSTEM</Typography>
        <Link to="/allData" className="li">
          View Info
        </Link>
        <Box mr={3}>
          <Avatar onClick={handleOpen} style={{ cursor: "pointer" }}></Avatar>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "flex-end",
        }}
      >
        <Box
          sx={{
            width: 300,
            height: "100%",
            bgcolor: "background.paper",
            p: 2,
            boxShadow: 24,
            mt: 8,
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            mb={5}
          >
            <Avatar
              onClick={handleOpen}
              style={{ cursor: "pointer", width: "100px", height: "100px" }}
            ></Avatar>

            <Typography variant="h6" component="h2" paddingTop={2}>
              {data.RoleId}-{data.Email}
            </Typography>
            <Box
              width={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <Typography color={data.RoleId === 2 ? "green" : "red"}>
                {data.RoleId === 2 ? "User" : "Admin"}
              </Typography>
              <Button onClick={handleLogout}>
                <ExitToApp />
                Sign Out
              </Button>
            </Box>
          </Box>

          <Divider />
          <List>
            {data.RoleId === 2 ? (
              <></>
            ) : (
              <ListItem button onClick={register}>
                <Person sx={{ mr: 2 }} />
                <ListItemText primary="Register" />
              </ListItem>
            )}

            <ListItem button>
              <Settings sx={{ mr: 2 }} />
              <ListItemText primary="Settings" />
            </ListItem>
          </List>
        </Box>
      </Modal>
      <Box width={"100%"} height={"50%"}>
        <Outlet />
      </Box>
      <Box width={"100%"} height={"20%"}>
        <Box height={50} color={"whitesmoke"} bgcolor={"#3c9ab0"}>
          contact
        </Box>
      </Box>
    </div>
  );
}

export default UserMenu;
