import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
// import swal from "sweetalert2";
import { toast } from "react-toastify";

import { forgotUser } from "../../HTTPHandler/api";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Forgot() {
  // const [email, setEmail] = useState(""); // State to hold the email input
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched", // Validate the form on field touch
  });

  const onSubmit = async (data) => {
    forgotUser(data)
      .then((res) => {
        if (res.Status === "Success") {
          console.log(res.data);
          toast.success("Reset link sent to your email");
        } else {
          toast.error(res.ErrMessage || "Failed to send the reset link");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Network error or server is unreachable");
      });
  };

  return (
    <div className="main">
      <div className="container">
        <Box>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                maxWidth={400}
                height={350}
                margin={"auto"}
                padding={5}
                bgcolor={"#eaf6f6"}
                borderRadius={9}
                sx={{
                  ":hover": {
                    boxShadow: "8px 8px 20px #27CC9B",
                  },
                }}
              >
                <Typography
                  variant="h4"
                  padding={3}
                  textAlign={"center"}
                  pb={6}
                >
                  Reset password
                </Typography>
                <TextField
                  type="email"
                  variant="outlined"
                  label="Email"
                  name="Email"
                  autoComplete="email"
                  autoFocus
                  {...register("Email", {
                    required: "Email is required",
                    pattern: /^\S+@\S+\.\S+$/,
                  })}
                  fullWidth
                  sx={{ width: "300px", mb: 2 }}
                  error={Boolean(errors.Email)}
                  helperText={errors.Email && errors.Email.message}
                />
                <Button
                  sx={{ mt: 2, borderRadius: 5 }}
                  size="large"
                  variant="contained"
                  type="submit"
                >
                  Send Password Reset Link
                </Button>
                <Link to="/" sx={{ textAlign: "center" }}>
                  Back to Login
                  <ArrowForwardIcon sx={{ mt: 2 }} />
                </Link>
              </Box>
            </form>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Forgot;
