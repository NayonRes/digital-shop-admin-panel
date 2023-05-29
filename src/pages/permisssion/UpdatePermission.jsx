import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getDataWithToken } from "../../services/GetDataService";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "50px",
    background: "#fff",

    borderRadius: "10px",
    width: "400px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
}));
const UpdatePermission = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const theme = useTheme();
  const { state } = useLocation();
  const [name, setName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [moduleList, setModuleList] = useState([]); 
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  
 
  const handleChange = (event) => {
    setModuleName(event.target.value);
  };
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
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
  const validation = () => {
    let isError = false;

    if (!name.trim()) {
      handleSnakbarOpen("Please enter title", "error");
      document.getElementById("name").focus();
      return (isError = true);
    }
    if (!moduleName.trim()) {
      handleSnakbarOpen("Please select a module", "error");
      document.getElementById("module-id").focus();
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
          name: name,
          module_name: moduleName,
          status: status,
        };

        let response = await axios({
          url: `/api/v1/permission/update/${state?.row?._id}`,
          method: "put",
          data: data,
        });
        console.log("responseresponseresponse", response);
        if (response.status >= 200 && response.status < 300) {
          handleSnakbarOpen("Update successfully", "success");
          navigate("/permission-list");
        }
      } catch (error) {
        console.log("error", error);
        handleSnakbarOpen(error.response.data.message, "error");
        setLoading(false);
      }
      setLoading(false);
    }
  };
  const getDropdownData = async (filterName) => {
    try {
      setLoading(true);

      const allDataUrl = `/api/v1/permission/dropdownlist`;
      let allData = await getDataWithToken(allDataUrl);
      console.log("allData", allData);

      if (allData.status >= 200 && allData.status < 300) {
        let list = allData?.data?.data.filter(
          (item) => item.name !== filterName
        );
        setModuleList(list);

        if (allData.data.data.length < 1) {
          setMessage("No data found");
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      handleSnakbarOpen(error.response.data.message.toString(), "error");
    }
  };

  useEffect(() => {
    setName(state?.row?.name);
    setModuleName(state?.row?.module_name);
    setStatus(state?.row?.status);
    getDropdownData(state?.row?.name);
  }, []);
  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "85vh" }}
      >
        <form className={classes.form} onSubmit={onSubmit}>
          <Typography
            variant="h5"
            style={{ marginBottom: "30px", textAlign: "center" }}
          >
            Update Permission
          </Typography>

          <TextField
            size="small"
            style={{ marginBottom: "30px" }}
            fullWidth
            id="name"
            label="Permission Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <FormControl fullWidth size="small" style={{ marginBottom: "30px" }}>
            <InputLabel id="demo-simple-select-label">Module Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="module-id"
              value={moduleName}
              label="Module Name"
              onChange={handleChange}
            >
              {moduleList?.map((item, i) => (
                <MenuItem key={item.filter_id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth size="small" style={{ marginBottom: "30px" }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="status"
              value={status}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value={true}>Active</MenuItem>
              <MenuItem value={false}>Inactive</MenuItem>
            </Select>
          </FormControl>

          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              disabled={loading}
              type="submit"
              style={{ minWidth: "180px", minHeight: "35px" }}
              autoFocus
              disableElevation
            >
              <PulseLoader
                color={"#353b48"}
                loading={loading}
                size={10}
                speedMultiplier={0.5}
              />{" "}
              {loading === false && "Update"}
            </Button>
          </div>
        </form>
      </Grid>
    </>
  );
};

export default UpdatePermission;
