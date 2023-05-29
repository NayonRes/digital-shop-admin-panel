import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import CountUp from "react-countup";
import BlockIcon from "@mui/icons-material/Block";
import { getDataWithToken } from "../../services/GetDataService";
import PauseIcon from "@mui/icons-material/Pause";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import { useNavigate } from "react-router-dom";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import Skeleton from "@mui/material/Skeleton";
import { Button } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "50px",
    background: "#fff",
    borderRadius: "10px",
    textAlign: "center",
    width: "400px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  card: {
    padding: "15px 20px",
    borderRadius: "10px",
    position: "relative",
    // minHeight: "32vh",
    height: "100%",
    overflow: "hidden",
    cursor: "pointer",
    boxSizing: "border-box",
    // display: "flex",
    // alignItems: "center",
  },
  cardBg1: {
    background:
      "linear-gradient(56deg, rgba(13,71,161,1) 0%, rgba(33,150,243,1) 100%)",
  },
  cardBg2: {
    background:
      "linear-gradient(90deg, rgba(56,142,60,1) 0%, rgba(129,199,132,1) 100%)",
  },
  cardBg3: {
    background:
      "linear-gradient(90deg, rgba(245,124,0,1) 0%, rgba(255,183,77,1) 100%)",
  },
  cardBg4: {
    background:
      "linear-gradient(90deg, rgba(0,121,107,1) 0%, rgba(77,182,172,1) 100%)",
  },
  cardBg5: {
    background:
      "linear-gradient(90deg, rgba(81,45,168,1) 0%, rgba(149,117,205,1) 100%)",
  },
  cardBg6: {
    background:
      "linear-gradient(90deg, rgba(0,151,167,1) 0%, rgba(77,208,225,1) 100%)",
  },
  cardIcon: {
    position: "absolute",
    fontSize: "120px !important",
    bottom: 0,
    right: 0,
    // fontSize: "320px !important",
    // bottom: -80,
    // right: -20,
    opacity: 0.2,
    [theme.breakpoints.down("xl")]: {
      fontSize: "80px !important",
      bottom: 0,
      right: 0,
    },
  },
  white: {
    color: "white",
  },
  centerSelectStyle: {
    [`& .MuiInputLabel-outlined.MuiInputLabel-shrink`]: {
      display: "none",
    },
  },
  tableBodyStyle: {
    [theme.breakpoints.down("xl")]: {
      "& td": {
        paddingTop: "12px",
        paddingBottom: "12px",
      },
    },
  },
  tableHeadStyle: {
    background: "#353b48",
    "& th": {
      color: "#fff",
      fontSize: "16px",
    },
  },
  skeletonStyle: {
    height: "180px !important",
    [theme.breakpoints.down("xl")]: {
      height: "139px !important",
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  let navigate = useNavigate();

  const [cardData, setCardData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const fnLogout = async (e) => {
    e.preventDefault();
    try {
      let url = `/api/v1/user/setCookie`;
      let allData = await getDataWithToken(url);

      if (allData.status >= 200 && allData.status < 300) {
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <React.Fragment>
      <Button onClick={fnLogout}>test cookie function</Button>
      <Grid
        container
        spacing={2}
        // style={{ marginBottom: "30px", display: "none" }}
        style={{ marginBottom: "30px" }}
      >
        <Grid item xs={4}>
          <div
            className={`${classes.card} ${classes.cardBg1}`}
            onClick={() => navigate("/kyc-request")}
          >
            <div>
              <Typography className={classes.white} variant="h1">
                <CountUp start={0} end={177} duration={0.5} />
              </Typography>
              <Typography className={classes.white} variant="h4">
                New Employee
              </Typography>
            </div>
            <BusinessCenterIcon className={classes.cardIcon} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className={`${classes.card} ${classes.cardBg2}`}
            onClick={() => navigate("/kyb-request")}
          >
            <Typography className={classes.white} variant="h1">
              <CountUp start={0} end={255} duration={0.5} />
            </Typography>
            <Typography className={classes.white} variant="h4">
              New Account
            </Typography>
            <HowToRegIcon className={classes.cardIcon} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div
            className={`${classes.card} ${classes.cardBg3}`}
            onClick={() => navigate("/block-user-list")}
          >
            <Typography className={classes.white} variant="h1">
              <CountUp start={0} end={154} duration={0.5} />
            </Typography>
            <Typography className={classes.white} variant="h4">
              Blocked Account
            </Typography>
            <BlockIcon className={classes.cardIcon} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={`${classes.card} ${classes.cardBg4}`}>
            <Typography className={classes.white} variant="h1">
              <CountUp start={0} end={410} duration={0.5} />
            </Typography>
            <Typography className={classes.white} variant="h4">
              Open Tickets
            </Typography>
            <ConfirmationNumberIcon className={classes.cardIcon} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={`${classes.card} ${classes.cardBg5}`}>
            <Typography className={classes.white} variant="h1">
              <CountUp start={0} end={296} duration={0.5} />
            </Typography>
            <Typography className={classes.white} variant="h4">
              On Hold Tickets
            </Typography>
            <PauseIcon className={classes.cardIcon} />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className={`${classes.card} ${classes.cardBg6}`}>
            <Typography className={classes.white} variant="h1">
              <CountUp start={0} end={155} duration={0.5} />
            </Typography>
            <Typography className={classes.white} variant="h4">
              Solved Tickets
            </Typography>
            <LocalActivityIcon className={classes.cardIcon} />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Dashboard;
