import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "@mui/material/Button";
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
const NoMatch = () => {
  const classes = useStyles();
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "85vh" }}
      >
        <div className={classes.form}>
          <img src="/image/Page404.png" alt="" width="220px" />
          <h1 style={{ marginTop: "0px" }}>Page Not Found</h1>

          <p>Sorry, we couldn't find the page you are looking for</p>
          <div style={{ marginTop: "30px" }}>
            <Button
              component={Link}
              variant="contained"
              to="/dashboard"
              startIcon={<ArrowBackIcon />}
            >
              GO TO HOMEPAGE
            </Button>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default NoMatch;
