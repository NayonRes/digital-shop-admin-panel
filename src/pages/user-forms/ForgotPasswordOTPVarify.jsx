import React, { useRef, useState, useContext } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Countdown from "react-countdown";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { AuthContext } from "../../context/AuthContext";
import ForgotPasswordResetPassword from "./ForgotPasswordResetPassword";
import OtpInput from "react-otp-input";
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "50px",
    background: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    width: "400px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  newInputStyle: {
    background: "none",
    minWidth: "40px",
    minHeight: "40px",
    fontSize: "16px",
    borderRadius: "3px",
    border: "1px solid #c3bebe",
  },
  newFocusStyle: {
    borderRadius: "3px",
    border: "1px solid #353b48",
    outline: "1px solid #353b48",
  },
}));

const ForgotPasswordOTPVarify = ({ email }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { login, ecom_admin_panel } = useContext(AuthContext);

  const [showOTPSection, setShowOTPSection] = useState(true);
  const [loading, setLoading] = useState(false);
  const [otpTimeOut, setOtpTimeOut] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [minutes, setMinutes] = useState(5);
  const [myOTP, setMyOTP] = useState({ otp: "" });
  const handleChange = (otp) => {
    setMyOTP({ otp });
  };

  const buttonref = useRef(null);

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

  const onSubmit = async (e) => {
    e.preventDefault();

    setShowOTPSection(false);
  };

  return (
    <React.Fragment>
      {showOTPSection ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ height: "100vh" }}
        >
          <div className={classes.form}>
            <img
              src="/image/logo2.svg"
              alt=""
              style={{ display: "block", margin: "auto", maxWidth: "155px" }}
            />{" "}
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
                We have sent a 6 digits varification code to{" "}
                {ecom_admin_panel.email}
              </span>
            </Typography>
            {/* {otpTimeOut && (
            <React.Fragment>
              <Grid
                id="mainGrid"
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={6}>
                  <Button
                    variant="outlined"
                    disableElevation
                    fullWidth
                    style={{
                      background: "none",
                      border: "none",
                      color: "#666666",
                    }} 
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate("/")}
                  >
                    BACk TO LOGIN
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    //   className={classes.buttonStyle}
                    // inputRef={buttonref}
                    ref={buttonref}
                    // onKeyDown={submitKeyDown}
                    type="submit"
                    onClick={resendOTP}
                    disabled={loading}
                  >
                    {loading === false && "Resend OTP"}
                    <PulseLoader
                      color={"#353b48"}
                      loading={loading}
                      size={10}
                      speedMultiplier={0.5}
                    />{" "}
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          )} */}
            {otpTimeOut === false && (
              <React.Fragment>
                <Grid
                  id="mainGrid"
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item xs={12}>
                    <OtpInput
                      value={myOTP.otp}
                      onChange={handleChange}
                      numInputs={6}
                      isInputNum={true}
                      shouldAutoFocus={true}
                      isInputSecure={true}
                      inputStyle={classes.newInputStyle}
                      focusStyle={classes.newFocusStyle}
                      containerStyle={{ justifyContent: "space-between" }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="primary"
                      //   className={classes.buttonStyle}
                      // inputRef={buttonref}
                      ref={buttonref}
                      // onKeyDown={submitKeyDown}
                      type="submit"
                      onClick={onSubmit}
                      disabled={loading}
                    >
                      {loading === false && "Continue"}
                      <PulseLoader
                        color={"#353b48"}
                        loading={loading}
                        size={10}
                        speedMultiplier={0.5}
                      />{" "}
                    </Button>
                    <br />
                    <br />
                    <Button
                      variant="outlined"
                      fullWidth
                      color="primary"
                      style={{ border: "none" }}
                      onClick={() => navigate("/")}
                      startIcon={<ArrowBackIcon />}
                    >
                      Back to Login
                    </Button>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </div>
        </Grid>
      ) : (
        <ForgotPasswordResetPassword email={email} otp={myOTP.otp} />
      )}
    </React.Fragment>
  );
};

export default ForgotPasswordOTPVarify;
