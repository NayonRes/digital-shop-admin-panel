import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";

import {
  Alert,
  Collapse,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { getDataWithToken } from "../../services/GetDataService";
import TextEditor from "../utils/TextEditor";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import DropZoneImage from "../utils/DropZoneImage";
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "50px",
    background: "#fff",
    borderRadius: "10px",
    // width: "400px",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  checkboxStyle: {
    "& span": {
      fontSize: "20px",
      fontWeight: 600,
      [theme.breakpoints.down("xl")]: {
        fontSize: "14px",
      },
    },
  },
  checkboxStyle2: {
    "& span": {
      // fontSize: "20px",
      // fontWeight: 600,
      [theme.breakpoints.down("xl")]: {
        fontSize: "12px",
      },
    },
  },
}));
const UpdateProduct = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [sku, setSku] = useState("");
  const [stockUnit, setStockUnit] = useState(null);
  const [convertedContent, setConvertedContent] = useState(null);
  const [status, setStatus] = useState(false);
  const [category, SetCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [message, setMessage] = useState("");
  const [filterMessage, setFilterMessage] = useState("");
  const [filterList, setFilterList] = useState([]);
  const [filterLoading, setFilterLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleChange = (event) => {
    SetCategory(event.target.value);
    let categoryData = categoryList.find(
      (res) => res.category_id === event.target.value
    );
    console.log("event.target.value", event.target.value);
    console.log("categoryData", categoryData);
    getFilters(categoryData);
  };
  const getFilters = async (row) => {
    try {
      let newList = [];
      setFilterLoading(true);
      setFilterMessage("");

      let response = await axios({
        url: `/api/v1/category/category-filter-list`,
        method: "post",
        data: row,
      });
      console.log("response", response);
      if (response.status >= 200 && response.status < 300) {
        response?.data?.data.map((obj) => {
          let newObj = {
            ...obj,
            selectedFilterId: "",
          };
          obj.filter_values.map((item) => {
            if (state?.row?.filter_id.includes(item.filter_id)) {
              console.log("if==============================", item.filter_id);
              newObj.selectedFilterId = item.filter_id;
            }
          });

          newList.push(newObj);
        });
        console.log("newList", newList);
        setFilterList(newList);

        if (response.data.data.length < 1) {
          setFilterMessage("No filter is available for this category");
        }
      }
      setFilterLoading(false);
    } catch (error) {
      console.log("error", error);
      setFilterLoading(false);
      handleSnakbarOpen(error.response.data.message.toString(), "error");
    }
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
    if (!price) {
      handleSnakbarOpen("Please enter price", "error");
      document.getElementById("price").focus();
      return (isError = true);
    }
    // if (!discountPrice) {
    //   handleSnakbarOpen("Please enter discount price", "error");
    //   document.getElementById("discountPrice").focus();
    //   return (isError = true);
    // }
    if (!stockUnit) {
      handleSnakbarOpen("Please enter stock unit", "error");
      document.getElementById("stockUnit").focus();
      return (isError = true);
    }
    if (!sku) {
      handleSnakbarOpen("Please enter sku", "error");
      document.getElementById("sku").focus();
      return (isError = true);
    }
    if (!category.trim()) {
      handleSnakbarOpen("Please select a category", "error");
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
      console.log("filterList", filterList);

      let filterIdList = [];

      filterList.map((item) => {
        if (item.selectedFilterId) {
          filterIdList.push(item.selectedFilterId);
        }
      });
      console.log("filterIdList", filterIdList);
      if (filterIdList.length < 1) {
        handleSnakbarOpen("Please select filters", "error");
        return setLoading(false);
      }

      try {
        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("price", price);
        if (discountPrice) {
          formdata.append("discount_price", discountPrice);
        }
        formdata.append("description", convertedContent);
        formdata.append("sku", sku);
        formdata.append("stock_unit", stockUnit);
        formdata.append("category_id", category);
        for (let i = 0; i < filterIdList.length; i++) {
          formdata.append("filter_id", filterIdList[i]);
        }
        for (let i = 0; i < files.length; i++) {
          formdata.append("images", files[i]);
        }

        let response = await axios({
          url: `/api/v1/product/update/${state?.row?._id}`,
          method: "put",
          data: formdata,
          headers: { "Content-Type": "application/json" },
        });
        if (response.status >= 200 && response.status < 300) {
          handleSnakbarOpen("Updated successfully", "success");
          // navigate("/product-list");
        }
      } catch (error) {
        console.log("error", error);
        handleSnakbarOpen(error.response.data.message, "error");
        setLoading(false);
      }
      setLoading(false);
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
        } else {
          let categoryData = allData?.data?.data.find(
            (res) => res.category_id === state?.row?.category_id
          );
          console.log("state?.row?.category_id", state?.row?.category_id);
          console.log("categoryData", categoryData);
          getFilters(categoryData);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      handleSnakbarOpen(error.response.data.message.toString(), "error");
    }
  };
  const handlePermissionChange = (item, index, el, i) => {
    let newObj = { ...el, isChecked: !el.isChecked };
    let newFilterValues = item.filter_values;
    item.filter_values[i] = newObj;
    const isAnyPermissionFalse = newFilterValues.some(
      (el) => el.isChecked === false
    );

    filterList[index] = {
      ...item,
      allChecked: !isAnyPermissionFalse,
      filter_values: newFilterValues,
    };

    setRefresh(!refresh);
  };
  const handlePermissionSelectByTitle = (checked, item, index) => {
    console.log("item", item);
    let newArray = item.filter_values.map((obj) => ({
      ...obj,
      isChecked: checked,
    }));

    filterList[index] = {
      ...item,
      allChecked: checked,
      filter_values: newArray,
    };
    setRefresh(!refresh);
  };
  const handleFilter = (event) => {
    console.log("event.target.value", event.target.value);

    filterList.map((obj) => {
      obj.filter_values.map((item) => {
        if (item.filter_id === event.target.value) {
          obj.selectedFilterId = event.target.value;
        }
      });
    });

    setRefresh(!refresh);
  };
  const filterSectionLoading = () => {
    let content = [];

    for (let i = 0; i < 6; i++) {
      content.push(
        <Grid item xs={4} key={i}>
          <div className={classes.checkboxStyle}>
            <Skeleton></Skeleton>
          </div>
          <div
            style={{
              paddingLeft: "48px",
              boxSizing: "border-box",
            }}
          >
            <Skeleton></Skeleton>

            <Skeleton></Skeleton>

            <Skeleton></Skeleton>
          </div>
        </Grid>
      );
    }
    return content;
  };
  useEffect(() => {
    console.log("state?.row", state?.row);
    getCategoryList();
    setName(state?.row?.name);
    setPrice(state?.row?.price);
    setDiscountPrice(state?.row?.discount_price);
    setStockUnit(state?.row?.stock_unit);
    setSku(state?.row?.sku);
    // setStatus(state?.row?.status);
    setStatus(true);
    SetCategory(state?.row?.category_id);
    // setConvertedContent(state?.row?.description);

    // getDropdownData(state?.row?.name);
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
            Update Product
          </Typography>

          <TextField
            size="small"
            style={{ marginBottom: "30px" }}
            fullWidth
            id="name"
            label="Product Name *"
            variant="outlined"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            type="number"
            size="small"
            style={{ marginBottom: "30px" }}
            fullWidth
            id="price"
            label="Price *"
            variant="outlined"
            inputProps={{ min: 0, step: 0.01 }}
            onWheel={(e) => e.target.blur()}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <TextField
            type="number"
            size="small"
            style={{ marginBottom: "30px" }}
            fullWidth
            id="discountPrice"
            label="Discount Price"
            variant="outlined"
            inputProps={{ min: 0, step: 0.01 }}
            onWheel={(e) => e.target.blur()}
            value={discountPrice}
            onChange={(e) => {
              setDiscountPrice(e.target.value);
            }}
          />
          <TextField
            type="number"
            size="small"
            style={{ marginBottom: "30px" }}
            fullWidth
            id="stockUnit"
            label="Stock Unit *"
            variant="outlined"
            inputProps={{ min: 0 }}
            onWheel={(e) => e.target.blur()}
            value={stockUnit}
            onChange={(e) => {
              setStockUnit(e.target.value);
            }}
          />
          <TextField
            size="small"
            style={{ marginBottom: "30px" }}
            fullWidth
            id="sku"
            label="SKU"
            variant="outlined"
            value={sku}
            onChange={(e) => {
              setSku(e.target.value);
            }}
          />
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
          <FormControl fullWidth size="small" style={{ marginBottom: "30px" }}>
            <InputLabel id="demo-simple-select-label">Category *</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="category"
              value={category}
              label="Category *"
              onChange={handleChange}
            >
              {categoryList?.map((item) => (
                <MenuItem key={item.category_id} value={item.category_id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Collapse in={category.length > 0} timeout="auto" unmountOnExit>
            {filterMessage.length > 0 ? (
              <Typography variant="h6" style={{ color: "#ddd" }}>
                {filterMessage}
              </Typography>
            ) : (
              <Grid container spacing={1}>
                {filterLoading ? (
                  filterSectionLoading()
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h6">Select the filters</Typography>
                    </Grid>
                    {filterList?.map((item) => (
                      <Grid item xs={12} key={item.filter_name}>
                        <div className={classes.checkboxStyle}>
                          <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">
                              {item.filter_name}
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              value={item.selectedFilterId}
                              onChange={handleFilter}
                            >
                              {item.filter_values?.map((el) => (
                                <FormControlLabel
                                key={el.filter_id}
                                  value={el.filter_id}
                                  control={<Radio />}
                                  label={el.name}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            )}
            <br />
          </Collapse>

          <div style={{ marginBottom: "30px" }}>
            <Typography variant="h6">
              Upload Images <span style={{ color: "#c4c4c4" }}>(Optional)</span>{" "}
            </Typography>
            <Alert severity="info" style={{ marginBottom: "8px" }}>
              You can upload max 5 (jpg / jpeg / png) images.Try resolution
              800*600 for better image view
            </Alert>
            <Alert severity="warning" style={{ marginBottom: "8px" }}>
              If you upload new image, all previous images will be deleted.
            </Alert>
            <DropZoneImage files={files} setFiles={setFiles} maxFilesNo={5} />
            {files.length < 1 && (
              <div style={{ textAlign: "center" }}>
                {state?.row?.images.map((item, i) => (
                  <img
                    src={item.url}
                    alt=""
                    style={{
                      display: "inline-flex",
                      borderRadius: 2,
                      border: "1px solid #c4c4c4",
                      marginTop: 15,
                      marginBottom: 8,
                      marginRight: 8,
                      width: 120,
                      height: 150,
                      padding: 4,
                      boxSizing: "border-box",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
          <div style={{ marginBottom: "30px" }}>
            <Typography variant="h6">
              Enter Description{" "}
              <span style={{ color: "#c4c4c4" }}>(Optional)</span>
            </Typography>

            <TextEditor
              convertedContent={convertedContent}
              setConvertedContent={setConvertedContent}
              data={state?.row?.description}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              type="submit"
              style={{ minHeight: "35px" }}
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

export default UpdateProduct;
