import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
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
const AddFilter = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [parentList, setParentList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryName, setCategoryName] = React.useState([]);
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleChange2 = (event) => {
    const {
      target: { value },
    } = event;
    setCategoryName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  function getStyles(name, categoryName, theme) {
    return {
      fontWeight:
        categoryName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleChange = (event) => {
    setParentName(event.target.value);
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
        let categoryIds = [];
        categoryName.map((name) => {
          let result = categoryList.find((res) => res.name === name);
          if (result) {
            categoryIds.push(result.category_id);
          }
        });

        console.log("categoryName", categoryName);
        console.log("categoryIds", categoryIds);
        let data = {
          name: name,
          parent_name: parentName,
          category_id: categoryIds,
        };

        let response = await axios({
          url: `/api/v1/filter/create`,
          method: "post",
          data: data,
        });
        if (response.status >= 200 && response.status < 300) {
          handleSnakbarOpen("Added successfully", "success");
          // navigate("/filter-list");
        }
      } catch (error) {
        console.log("error", error);
        handleSnakbarOpen(error.response.data.message, "error");
        setLoading(false);
      }
      setLoading(false);
    }
  };
  const getData = async () => {
    try {
      setLoading(true);

      const allDataUrl = `/api/v1/filter/dropdownlist`;
      let allData = await getDataWithToken(allDataUrl);
      console.log("allData", allData);

      if (allData.status >= 200 && allData.status < 300) {
        setParentList(allData?.data?.data);

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
  const getCategoryList = async () => {
    try {
      setLoading(true);

      const allDataUrl = `/api/v1/category/leaf-dropdown`;
      let allData = await getDataWithToken(allDataUrl);
      console.log("allData", allData);

      if (allData.status >= 200 && allData.status < 300) {
        setCategoryList(allData?.data?.data);

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
    getData();
    getCategoryList();
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
            Add Filter
          </Typography>

          <TextField
            size="small"
            style={{ marginBottom: "30px" }}
            fullWidth
            id="name"
            label="Filter Name"
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
                <MenuItem key={item.filter_id} value={item.name}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth size="small" style={{ marginBottom: "30px" }}>
            <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={categoryName}
              onChange={handleChange2}
              input={
                <OutlinedInput id="select-multiple-chip" label="Categories" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {categoryList.map((item) => (
                <MenuItem
                  key={item._id}
                  value={item.name}
                  style={getStyles(item.name, categoryName, theme)}
                >
                  {item.name}
                </MenuItem>
              ))}
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
              {loading === false && "Submit"}
            </Button>
          </div>
        </form>
      </Grid>
    </>
  );
};

export default AddFilter;
