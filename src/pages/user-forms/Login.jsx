import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useSnackbar } from "notistack";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
const useStyles = makeStyles((theme) => ({
  main: {
    width: "1100px !important",
    padding: "10px 30px",
    background: "#fff",
    borderRadius: "10px",
    textAlign: "center",

    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
    boxSizing: "border-box",
  },
  formStyle: {
    padding: "50px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("admin@admin.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const validation = () => {
    let isError = false;
    if (!email.trim()) {
      handleSnakbarOpen("Please enter email address", "error");
      document.getElementById("email").focus();
      return (isError = true);
    } else if (
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email.trim()
      )
    ) {
      handleSnakbarOpen("Invalid email address", "error");
      document.getElementById("email").focus();
      return (isError = true);
    }

    if (!password.trim()) {
      handleSnakbarOpen("Please enter password", "error");
      document.getElementById("password").focus();
      return (isError = true);
    }
    return isError;
  };

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

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
          email: email.trim(),
          password: password.trim(),
        };
        let response = await axios({
          url: `/api/v1/user/login`,
          method: "post",
          data: data,
        });
        if (response.status >= 200 && response.status < 300) {
          console.log("response", response.data.user);
          handleSnakbarOpen("Successfully", "success");
          // navigate("/category-list");
          login(response.data.user);
          navigate("/verify");
        }
        setLoading(false);
      } catch (error) {
        console.log("error", error.response.data);
        setLoading(false);
        handleSnakbarOpen(error.response.data.message.toString(), "error");
      }
    }
  };
  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.main}
        >
          <Grid item xs={6}>
            <img
              src="/image/login.jpg"
              alt=""
              style={{ display: "block", margin: "auto", maxWidth: "100%" }}
            />
          </Grid>
          <Grid item xs={6}>
            <form className={classes.formStyle} onSubmit={onSubmit}>
              <img
                src="/image/logo2.svg"
                alt=""
                style={{ display: "block", margin: "auto", maxWidth: "155px" }}
              />

              <Typography
                variant="h5"
                component="div"
                style={{ margin: "10px 0px 30px" }}
              >
                Sign-In to continue{" "}
              </Typography>
              <TextField
                autoFocus
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
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormControl
                fullWidth
                variant="outlined"
                style={{ marginBottom: "30px" }}
              >
                <OutlinedInput
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockOutlinedIcon />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              <Button
                variant="contained"
                disableElevation
                fullWidth
                style={{ marginBottom: "30px", minHeight: "37px" }}
                disabled={loading}
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
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Remember me"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    style={{
                      color: "#F91351",
                      textAlign: "right",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot Password?
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
