import React, { useState, useEffect, useContext, useRef } from "react";
import { getDataWithToken } from "../../services/GetDataService";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Skeleton from "@mui/material/Skeleton";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import TableChartIcon from "@mui/icons-material/TableChart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";
import axios from "axios";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import { AuthContext } from "../../context/AuthContext";
import { Collapse, Grid } from "@mui/material";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { DateField } from "@mui/x-date-pickers/DateField";
import Checkbox from "@mui/material/Checkbox";
import moment from "moment";
import Slide from "@mui/material/Slide";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Invoice from "../utils/Invoice";
import ReactToPrint from "react-to-print";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  tableBodyStyle: {
    "& tr:nth-of-type(odd)": {
      background: "#f3f3f3",
    },
    "& tr:last-child": {
      background: "none",
    },

    "& tr:hover": {
      // cursor: "pointer",
      background: "#DCDCDC",
    },
    "& tr:last-child:hover": {
      // cursor: "default",
      background: "none",
    },
    "& td": {
      padding: "10px 16px",
    },
    [theme.breakpoints.down("xl")]: {
      "& td": {
        // paddingTop: "12px",
        // paddingBottom: "12px",
        padding: "12px 16px",
      },
      // "& td:nth-child(n+3)": {
      //   paddingLeft: "0px",
      // },
    },
  },
  tableStyle: {
    border: "1px solid #ddd",
    "& thead": {
      background: "#ddd",
      "& tr": {
        "& th": {
          paddingTop: "8px",
          paddingBottom: "8px",
        },
      },
    },
    "& tbody": {
      "& tr": {
        "& td": {
          paddingTop: "2px",
          paddingBottom: "2px",
        },
      },
    },
  },
  dialogTitleStyle: {
    fontSize: "22px",
    color: "#154360",
    fontWeight: 500,
    margin: "0 0 20px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },
}));
const UserList = () => {
  const classes = useStyles();
  const [tableDataList, setTableDataList] = useState([]);
  const [page, setPage] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const [orderID, setOrderID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [status, setStatus] = useState("");
  const [category, SetCategory] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [open, setOpen] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [filterList, setFilterList] = useState([]);
  const [startingTime, setStartingTime] = useState(null);
  const [endingTime, setEndingTime] = useState(null);

  const [imageDialog, setImageDialog] = useState(false);
  const [images, setImages] = useState([]);
  const [detailDialog, setDetailDialog] = useState(false);
  const [details, setDetails] = useState([]);
  const [cancelProductData, setCancelProductData] = useState({});
  const [cancelProductDialog, setCancelProductDialog] = useState(false);
  const [cancelProductLoading, setCancelProductLoading] = useState(false);
  const componentRef = useRef();
  const handleDetailClickOpen = (obj) => {
    console.log("obj", obj);
    setDetails(obj);
    setDetailDialog(true);
  };
  const handleDetailClose = () => {
    setDetails({});
    setDetailDialog(false);
  };
  const handleCancelProductClickOpen = (obj) => {
    setCancelProductData(obj);
    setCancelProductDialog(true);
  };
  const handleCancelProductClose = () => {
    setCancelProductData({});
    setCancelProductDialog(false);
  };
  const handleImageClickOpen = (images) => {
    setImages(images);
    setImageDialog(true);
  };
  const handleImageClose = () => {
    setImages([]);
    setImageDialog(false);
  };

  const handleChange = (event) => {
    SetCategory(event.target.value);
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

  const cancelProduct = async (row) => {
    console.log("cancelProductData.product_id", cancelProductData);
    try {
      setCancelProductLoading(true);

      let data = {
        id: details._id,
        productId: cancelProductData.product_id,
      };
      console.log("data", data);
      let response = await axios({
        url: `/api/v1/order/cancel-product`,
        method: "post",
        data: data,
      });
      console.log("response", response);
      if (response.status >= 200 && response.status < 300) {
        let newProductDetails = details.product_details.filter(
          (res) => res.product_id !== cancelProductData.product_id
        );
        console.log("details", details);
        console.log("newProductDetails", newProductDetails);
        setDetails({ ...details, product_details: newProductDetails });
        let newTableDataList = [];
        tableDataList.map((item) => {
          if (item._id === details._id) {
            newTableDataList.push({
              ...item,
              product_details: newProductDetails,
            });
          } else {
            newTableDataList.push(item);
          }
          setTableDataList(newTableDataList);
        });
      }
      setCancelProductLoading(false);
      handleCancelProductClose();
    } catch (error) {
      console.log("error", error);
      // setCancelProductLoading(false);
      handleSnakbarOpen(error.response.data.message.toString(), "error");
    }
  };
  const handleDeleteDialogClose = () => {
    setDeleteDialog(false);
    setDeleteData({});
  };

  const handleDeleteDialog = (i, row) => {
    setDeleteData({ index: i, row: row });
    setDeleteDialog(true);
  };

  const pageLoading = () => {
    let content = [];

    for (let i = 0; i < 10; i++) {
      content.push(
        <TableRow key={i}>
          {[...Array(14).keys()].map((e, i) => (
            <TableCell key={i}>
              <Skeleton></Skeleton>
            </TableCell>
          ))}
        </TableRow>
      );
    }
    return content;
  };
  const handleDelete = async () => {
    try {
      setLoading2(true);
      let response = await axios({
        url: `/api/v1/user/delete/${deleteData.row._id}`,
        method: "delete",
      });
      if (response.status >= 200 && response.status < 300) {
        handleSnakbarOpen("Deleted successfully", "success");
        getData();
      }
      setDeleteDialog(false);
      setLoading2(false);
    } catch (error) {
      console.log("error", error);
      setLoading2(false);
      handleSnakbarOpen(error.response.data.message.toString(), "error");
      setDeleteDialog(false);
    }
  };

  const handleChangePage = (event, newPage) => {
    console.log("newPage", newPage);
    getData(newPage);
    setPage(newPage);
  };

  const clearFilter = (event) => {
    console.log("clearFilter");
    setOrderID("");
    setCustomerName("");
    setStatus("");
    setCustomerEmail("");
    setCustomerPhone("");
    SetCategory("");
    setMinPrice("");
    setMaxPrice("");
    setStartingTime(null);
    setEndingTime(null);
    setPage(0);
    const newUrl = `/api/v1/order?limit=${rowsPerPage}&page=1`;
    getData(0, rowsPerPage, newUrl);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log("event.target.value", event.target.value);
    setRowsPerPage(parseInt(event.target.value, rowsPerPage));
    getData(0, event.target.value);
    setPage(0);
  };

  const getData = async (pageNO, limit, newUrl) => {
    console.log("pageNO ==============", pageNO);

    try {
      setLoading(true);
      let newPageNO = page;
      let url;
      if (pageNO >= 0) {
        console.log("if------------------------");
        newPageNO = pageNO;
      }
      let newLimit = rowsPerPage;
      if (limit) {
        newLimit = limit;
      }
      if (newUrl) {
        url = newUrl;
      } else {
        let newStatus = status;
        let newMinPrice = minPrice;
        let newMaxPrice = maxPrice;
        let newStartingTime = "";
        let newEndingTime = "";
        if (status === "None") {
          newStatus = "";
        }
        if (minPrice === null) {
          newMinPrice = "";
        }
        if (maxPrice === null) {
          newMaxPrice = "";
        }
        if (startingTime !== null) {
          newStartingTime = dayjs(startingTime).format("YYYY-MM-DD");
        }
        if (endingTime !== null) {
          newEndingTime = dayjs(endingTime).format("YYYY-MM-DD");
        }

        url = `/api/v1/user?orderID=${orderID}&customerName=${customerName}&customerEmail=${customerEmail}&customerPhone=${customerPhone}&minPrice=${newMinPrice}&maxPrice=${newMaxPrice}&startDate=${newStartingTime}&endDate=${newEndingTime}&status=${newStatus}&limit=${newLimit}&page=${
          newPageNO + 1
        }`;
      }
      let allData = await getDataWithToken(url);

      if (allData.status >= 200 && allData.status < 300) {
        setTableDataList(allData?.data?.data);
        // setRowsPerPage(allData?.data?.limit);
        setTotalData(allData?.data?.totalData);

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

  const check = () => {
    console.log("startingTime", dayjs(startingTime).format("YYYY-MM-DD"));
    let start = dayjs(startingTime).format("YYYY-MM-DD");
    console.log("new Start", start.concat("T00:00:00"));
  };

  const sortByParentName = (a, b) => {
    const nameA = a.parent_name.toUpperCase();
    const nameB = b.parent_name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  };
  useEffect(() => {
    getData();
    getCategoryList();
  }, []);

  return (
    <>
      <div
        style={{
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "5px",
          overflow: "hidden",
          padding: "24px",
        }}
      >
        <Grid container columnSpacing={3} style={{ padding: "16px 0" }}>
          <Grid item lg={9} xl={9}>
            <Typography
              variant="h6"
              color="info"
              gutterBottom
              component="div"
              onClick={check}
            >
              User List
            </Typography>
          </Grid>
          <Grid item lg={3} xl={3} style={{ textAlign: "right" }}>
            <Button
              disableElevation
              variant="outlined"
              size="large"
              color="info"
              // startIcon={<FilterListIcon />}
              onClick={() => setOpen(!open)}
            >
              {open ? <FilterListOffIcon /> : <FilterListIcon />}
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <br />
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    id="OrderID"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Order Id"
                    value={orderID}
                    onChange={(e) => setOrderID(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="Customer Name"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="customerPhone"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Customer Phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="customerEmail"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Customer Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControl variant="outlined" fullWidth size="small">
                    <InputLabel id="demo-status-outlined-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-status-outlined-label"
                      id="demo-status-outlined"
                      label="Status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="None">None</MenuItem>
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={3}>
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    id="minPrice"
                    label="Minimum Price"
                    variant="outlined"
                    inputProps={{ min: 0, step: 0.01 }}
                    onWheel={(e) => e.target.blur()}
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                    }}
                  />
                </Grid> */}
                {/* <Grid item xs={3}>
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    id="maxPrice"
                    label="Maximum Price"
                    variant="outlined"
                    inputProps={{ min: 0, step: 0.01 }}
                    onWheel={(e) => e.target.blur()}
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                    }}
                  />
                </Grid> */}

                <Grid item xs={3} style={{ paddingTop: "16px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField", "DateField"]}>
                      <DateField
                        size="small"
                        fullWidth
                        format="DD-MM-YYYY"
                        label="Starting Date"
                        value={startingTime}
                        onChange={(newValue) => setStartingTime(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={3} style={{ paddingTop: "16px" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateField", "DateField"]}>
                      <DateField
                        size="small"
                        fullWidth
                        format="DD-MM-YYYY"
                        label="Ending Date"
                        value={endingTime}
                        onChange={(newValue) => setEndingTime(newValue)}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={3}>
                  <Grid container spacing={{ lg: 6, xl: 3 }}>
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        color="info"
                        disableElevation
                        size="large"
                        fullWidth
                        onClick={clearFilter}
                      >
                        <RestartAltIcon />
                      </Button>
                    </Grid>
                    <Grid item xs={9}>
                      <Button
                        variant="contained"
                        disableElevation
                        // color="success"
                        style={{ padding: "6.7px 22px" }}
                        size="large"
                        startIcon={<SearchIcon />}
                        fullWidth
                        onClick={(event) => handleChangePage(event, 0)}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>

        <div
          style={{
            overflowX: "auto",

            minWidth: "100%",
            width: "Calc(100vw - 385px)",
            // padding: "10px 16px 0px",
            boxSizing: "border-box",
          }}
        >
          <Table aria-label="simple table" className={classes.tableStyle}>
            <TableHead>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>Image</TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  User Name
                </TableCell>

                <TableCell style={{ whiteSpace: "nowrap" }}>
                  User Email
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  User Role
                </TableCell>

                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Created Info
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Updated Info
                </TableCell>
                <TableCell style={{ minWidth: "120px" }}>Status</TableCell>
                {/* <TableCell align="center" style={{ minWidth: "120px" }}>
                  Invoice
                </TableCell> */}
                <TableCell align="right" style={{ minWidth: "120px" }}>
                  Action &nbsp;&nbsp;&nbsp;
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                tableDataList.length > 0 &&
                tableDataList.map((row, i) => (
                  <>
                    <TableRow
                      key={row?.user_id}
                      // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        {/* {row?.image?.url?.length > 0 ? (
                          <> */}
                        <img
                          src={
                            row?.image?.url?.length > 0
                              ? row?.image?.url
                              : "/image/userpic.png"
                          }
                          alt=""
                          width="50px"
                          height="50px"
                          style={{
                            display: "block",
                            margin: "5px 0px",
                            borderRadius: "5px",
                            border: "1px solid #d1d1d1",
                          }}
                        />

                        {/* </>
                        ) : (
                          "No Image"
                        )} */}
                      </TableCell>
                      <TableCell>{row?.name}</TableCell>
                      <TableCell>{row?.email}</TableCell>
                      <TableCell>{row?.role}</TableCell>

                      <TableCell>
                        <b>{row?.created_by}</b>

                        <br />
                        {moment(row?.created_at).format(
                          "DD-MM-YYYY, h:mm:ss a"
                        )}
                      </TableCell>
                      <TableCell>
                        <b>{row?.updated_by}</b>
                        <br />
                        {moment(row?.updated_at).format(
                          "DD-MM-YYYY, h:mm:ss a"
                        )}
                      </TableCell>
                      <TableCell>
                        {row?.status ? (
                          <>
                            <TaskAltOutlinedIcon
                              style={{
                                color: "#10ac84",
                                height: "16px",
                                position: "relative",
                                top: "4px",
                              }}
                            />{" "}
                            <span
                              style={{
                                color: "#10ac84",
                              }}
                            >
                              Active &nbsp;
                            </span>
                          </>
                        ) : (
                          <>
                            <HighlightOffOutlinedIcon
                              style={{
                                color: "#ee5253",
                                height: "16px",
                                position: "relative",
                                top: "4px",
                              }}
                            />
                            <span
                              style={{
                                color: "#ee5253",
                              }}
                            >
                              Inactive
                            </span>
                          </>
                        )}
                      </TableCell>

                      {/* <TableCell align="center" style={{ minWidth: "130px" }}>
                        <Invoice data={row} />
                      </TableCell> */}
                      <TableCell align="right" style={{ minWidth: "130px" }}>
                        {/* <IconButton
                          variant="contained"
                          disableElevation
                          onClick={() => handleDetailClickOpen(row)}
                        >
                          <VisibilityOutlinedIcon />
                        </IconButton> */}
                        <IconButton
                          variant="contained"
                          disableElevation
                          onClick={() => handleDetailClickOpen(row)}
                        >
                          <VisibilityOutlinedIcon />
                        </IconButton>
                        <IconButton
                          variant="contained"
                          color="info"
                          disableElevation
                          component={Link}
                          to={`/update-user/${row._id}`}
                          state={{ row }}
                        >
                          <EditOutlinedIcon />
                        </IconButton>

                        <IconButton
                          variant="contained"
                          disableElevation
                          onClick={() => handleDeleteDialog(i, row)}
                        >
                          <DeleteOutlineIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </>
                ))}

              {!loading && tableDataList.length < 1 ? (
                <TableRow>
                  <TableCell colSpan={15} style={{ textAlign: "center" }}>
                    <strong> {message}</strong>
                  </TableCell>
                </TableRow>
              ) : null}
              {loading && pageLoading()}
            </TableBody>
          </Table>
        </div>
        {tableDataList.length > 0 ? (
          <div>
            <TablePagination
              style={{ display: "block", border: "none" }}
              rowsPerPageOptions={[10, 20, 50]}
              count={totalData}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <br />
        )}
      </div>
      <Dialog
        open={detailDialog}
        onClose={handleDetailClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        fullWidth={true}
      >
        {/* <div style={{ padding: "10px", minWidth: "300px" }}> */}
        {/* <DialogTitle id="alert-dialog-title">{"Product Detail"}</DialogTitle> */}
        <DialogContent>
          <Grid container style={{ borderBottom: "1px solid #154360" }}>
            <Grid item xs={6} sm={6} md={6}>
              <p className={classes.dialogTitleStyle}>User Details</p>
            </Grid>
            <Grid item xs={6} sm={6} md={6} style={{ textAlign: "right" }}>
              <IconButton onClick={handleDetailClose}>
                <ClearIcon style={{ color: "#205295" }} />
              </IconButton>
            </Grid>
          </Grid>
          <br />
        </DialogContent>

        {/* </div> */}
      </Dialog>
      <Dialog
        open={imageDialog}
        onClose={handleImageClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        {/* <div style={{ padding: "10px", minWidth: "300px" }}> */}
        <DialogTitle id="alert-dialog-title">{"Images"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div style={{ display: "flex", gap: "10px" }}>
              {images.length > 0
                ? images.map((item) => (
                    <img
                      key={item.url}
                      src={item.url}
                      alt=""
                      width="220px"
                      height="220px"
                    />
                  ))
                : "No Image Available"}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageClose}>Close</Button>
        </DialogActions>
        {/* </div> */}
      </Dialog>
      <Dialog
        open={deleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ padding: "10px", minWidth: "300px" }}>
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You want to delete <b>{deleteData?.row?.name} </b>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteDialogClose}>cancel</Button>
            <Button
              variant="contained"
              disabled={loading2}
              onClick={handleDelete}
              style={{ minWidth: "100px", minHeight: "35px" }}
              autoFocus
              disableElevation
            >
              <PulseLoader
                color={"#353b48"}
                loading={loading2}
                size={10}
                speedMultiplier={0.5}
              />{" "}
              {loading2 === false && "Confirm"}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog
        open={cancelProductDialog}
        onClose={handleCancelProductClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ padding: "10px", minWidth: "300px" }}>
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You want to cancel <b>{cancelProductData?.name}</b> order
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelProductClose}>cancel</Button>
            <Button
              variant="contained"
              disabled={cancelProductLoading}
              onClick={cancelProduct}
              style={{ minWidth: "100px", minHeight: "35px" }}
              autoFocus
              disableElevation
            >
              <PulseLoader
                color={"#353b48"}
                loading={cancelProductLoading}
                size={10}
                speedMultiplier={0.5}
              />{" "}
              {cancelProductLoading === false && "Confirm"}
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </>
  );
};

export default UserList;
