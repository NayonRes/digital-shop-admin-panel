import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import ForgotPasswordOTPVarify from "./ForgotPasswordOTPVarify";
import EmailIcon from "@mui/icons-material/Email";
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "50px",
    background: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    width: "400px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
}));

const ForgotPassword = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSection, setEmailSection] = useState(true);
  const [otpSection, setOtpSection] = useState(false);
  const [passwordSection, setPasswordSection] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleSnakbarOpen = (msg, vrnt) => {
    let duration;
    if (vrnt === "error") {
      duration = 3000;
    } else {
      duration = 1000;
    }
    enqueueSnackbar(msg, {
      variant: vrnt,
      autoHideDuration: duration,
    });
  };

  const validation = () => {
    let isError = false;
    if (!email.trim()) {
      handleSnakbarOpen("Please enter email address", "error");
      document.getElementById("email").focus();
      return (isError = true);
    } else if (
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      handleSnakbarOpen("Invalid email address", "error");
      document.getElementById("email").focus();

      return (isError = true);
    }

    return isError;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let err = validation();

    if (err) {
      return;
    } else {
      setLoading(true);
      try {
        let data = {
          email,
        };
        let response = await axios({
          url: "api/forgot-password/otp-generate",
          method: "post",
          data: data,
        });
        handleSnakbarOpen(response.data.messages.toString(), "success");
        setEmailSection(false);
        setOtpSection(true);
      } catch (error) {
        console.log("error", error);
        handleSnakbarOpen(error.response.data.messages.toString(), "error");
        setLoading(false);
      }
      setLoading(false);
    }
  };

  return (
    <div>
      {emailSection && (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <form className={classes.form} onSubmit={onSubmit}>
            <img
              src="/image/logo2.svg"
              alt=""
              style={{ display: "block", margin: "auto", maxWidth: "155px" }}
            />
            <br />
            <Typography
              variant="h5"
              component="div"
              style={{ marginBottom: "30px" }}
            >
              Verify your identity.
              <span
                style={{
                  display: "block",
                  fontSize: "16px",
                  letterSpacing: "2px",
                  marginTop: "5px",
                }}
              >
                {" "}
                Please enter your email address.
              </span>
            </Typography>

            <TextField
              autoFocus
              id="email"
              placeholder="Enter your email address"
              fullWidth
              size="small"
              className={classes.inputStyle}
              style={{ marginBottom: "30px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              variant="contained"
              disableElevation
              fullWidth
              style={{ marginBottom: "30px" }}
              disabled={loading}
              // onClick={onSubmit}
              type="submit"
            >
              {loading === false && "Continue"}
              <PulseLoader
                color={"#353b48"}
                loading={loading}
                size={10}
                speedMultiplier={0.5}
              />{" "}
            </Button>
          </form>
        </Grid>
      )}

      {otpSection && <ForgotPasswordOTPVarify email={email} />}
    </div>
  );
};

export default ForgotPassword;
