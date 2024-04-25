import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  CheckToken,
  ResetPassword,
  SetLocalStorageToken,
  loginUser,
  // loginUser,
} from "../../HTTPHandler/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, logout } from "../../Redux/authSlice/AuthSlice";

const Resetpage = ({ closeFn = null, email = null }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();
  const navigate = useNavigate();
  const bgColor = email ? "#bebebe" : "#eaf6f6";
  const [params] = useSearchParams();
  const token = params.get("token");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // !    This is main for all
  useEffect(() => {
    token && SetLocalStorageToken(token);
    console.log("useeffect", token);
    !email &&
      CheckToken()
        .then((res) => {
          if (res.Status === "Success") {
            dispatch(authenticate({ user: res.Response }));
          } else {
            dispatch(logout());
            navigate("/");
            // setMessage(res.data.ErrMessage);
          }
        })
        .then((err) => {
          console.log(err);
        });
  }, [token, email]);

  //! cleared error
  watch("Password");
  watch("ConfirmPassword");

  // for icon and handle password\
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSubmit = (data) => {
    if (data.Password !== data.ConfirmPassword) {
      setError("ConfirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      return;
    }

    clearErrors("ConfirmPassword");
    data.Email = email ? email : user ? user?.Email : "";
    console.log(data.Email);
    ResetPassword(data)
      .then((res) => {
        console.log(res);
        if (res.Status === "Success") {
          closeFn && closeFn();
          // alert(res.Response?.message);
          toast.success(res.Response?.message);
          loginUser(data);
          navigate("/main");
        } else if (res.Status === "Failure") {
          toast.error(res.ErrMessage);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("Error logging in:", error);
      });
  };
  return (
    <div className={email ? "" : "main"}>
      <div className={email ? "" : "container"}>
        <Box marginTop={email ? 20 : 0}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box
              display={"flex"}
              height={350}
              flexDirection={"column"}
              maxWidth={400}
              justifyContent={"center"}
              alignItems={"center"}
              margin={"auto"}
              padding={5}
              borderRadius={9}
              bgcolor={bgColor}
            >
              <Typography
                variant="h4"
                padding={3}
                textAlign={"center"}
                fontWeight={700}
              >
                Reset Password
              </Typography>
              <TextField
                type={showPassword ? "text" : "password"}
                variant="outlined"
                label="Password"
                {...register("Password", { required: "Password is required" })}
                error={!!errors.Password}
                helperText={errors.Password?.message}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                variant="outlined"
                label="Confirm Password"
                fullWidth
                {...register("ConfirmPassword", {
                  required: "Confirm Password is required",
                })}
                error={!!errors.ConfirmPassword}
                helperText={errors.ConfirmPassword?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <Button
                sx={{ mt: 3, borderRadius: 2 }}
                size="large"
                variant="contained"
                color="success"
                type="submit"
                //onClick={handleClose}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Box>
      </div>
    </div>
  );
};

export default Resetpage;
