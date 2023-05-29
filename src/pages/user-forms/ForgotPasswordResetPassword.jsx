import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { AuthContext } from "../../context/AuthContext";
import PulseLoader from "react-spinners/PulseLoader";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

const ForgotPasswordResetPassword = ({ email, otp }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { login, ecom_admin_panel } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPasswordShow, setNewPasswordShow] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
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

    if (!newPassword.trim()) {
      handleSnakbarOpen("Please enter new password", "error");
      document.getElementById("newPassword").focus();
      return (isError = true);
    }
    if (!confirmPassword.trim()) {
      handleSnakbarOpen("Please enter confirm password", "error");
      document.getElementById("confirmPassword").focus();
      return (isError = true);
    }
    if (newPassword.trim() !== confirmPassword.trim()) {
      handleSnakbarOpen(
        "Your new password and confirm password is not same",
        "error"
      );
      document.getElementById("confirmPassword").focus();
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
          email: email,
          otp: parseInt(otp),
          password: newPassword,
          password_confirmation: confirmPassword,
        };
        let response = {};
        handleSnakbarOpen(response.data.messages.toString(), "success");
        login({});
        navigate("/");
      } catch (error) {
        console.log("error", error);
        handleSnakbarOpen(error.response.data.messages.toString(), "error");

        setLoading(false);
      }
      setLoading(false);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "80vh" }}
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
            Reset your password
          </Typography>

          <FormControl
            fullWidth
            variant="outlined"
            style={{ marginBottom: "30px" }}
          >
            <OutlinedInput
              id="newPassword"
              autoFocus
              type={newPasswordShow ? "text" : "password"}
              placeholder="New password"
              size="small"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setNewPasswordShow(!newPasswordShow)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {newPasswordShow ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            style={{ marginBottom: "30px" }}
          >
            <OutlinedInput
              id="confirmPassword"
              type={confirmPasswordShow ? "text" : "password"}
              placeholder="Confirm password"
              size="small"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {confirmPasswordShow ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

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
    </div>
  );
};

export default ForgotPasswordResetPassword;
