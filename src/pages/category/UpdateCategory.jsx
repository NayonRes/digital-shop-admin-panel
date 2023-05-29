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
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "50px",
    background: "#fff",

    borderRadius: "10px",
    width: "400px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
}));
const UpdateCategory = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { state } = useLocation();
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("");
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [parentList, setParentList] = useState([]);
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event) => {
    setParentName(event.target.value);
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
    if (!parentName.trim()) {
      handleSnakbarOpen("Please select a parent", "error");
      document.getElementById("parent-id").focus();
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
          parent_name: parentName,
          status: status,
        };

        let response = await axios({
          url: `/api/v1/category/update/${state?.row?._id}`,
          method: "put",
          data: data,
        });
        console.log("responseresponseresponse", response);
        if (response.status >= 200 && response.status < 300) {
          handleSnakbarOpen("Update successfully", "success");
          navigate("/category-list");
        }
      } catch (error) {
        console.log("error", error);
        handleSnakbarOpen(error.response.data.message, "error");
        setLoading(false);
      }
      setLoading(false);
    }
  };
  const getDropdownData = async (catName) => {
    try {
      setLoading(true);

      const allDataUrl = `/api/v1/category/dropdownlist`;
      let allData = await getDataWithToken(allDataUrl);
      console.log("allData", allData);

      if (allData.status >= 200 && allData.status < 300) {
        let list = allData?.data?.data.filter((item) => item.name !== catName);
        setParentList(list);

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
    setParentName(state?.row?.parent_name);
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
            Update Category
          </Typography>

          <TextField
            size="small"
            style={{ marginBottom: "30px" }}
            fullWidth
            id="name"
            label="Category Name"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <FormControl fullWidth size="small" style={{ marginBottom: "30px" }}>
            <InputLabel id="demo-simple-select-label">Parent Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="parent-id"
              value={parentName}
              label="Parent Name"
              onChange={handleChange}
            >
              {parentList?.map((item, i) => (
                <MenuItem key={item.category_id} value={item.name}>
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

export default UpdateCategory;
