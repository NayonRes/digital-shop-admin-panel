import React, { useState, useEffect, useContext } from "react";
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
import ClearIcon from "@mui/icons-material/Clear";
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
const CategoryList = () => {
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
  const [name, setName] = useState("");
  const [parentName, setParentName] = useState("");
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [filterListDialog, setFilterListDialog] = useState(false);
  const [filterList, setFilterList] = useState([]);
  const [categoryNameOfFilter, setCategoryNameOfFilter] = useState("");
  const handleFilterListDialogOpen = () => {
    setFilterListDialog(true);
  };

  const handleFilterListDialogClose = () => {
    setFilterListDialog(false);
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
          {[...Array(5).keys()].map((e, i) => (
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
        url: `/api/v1/category/delete/${deleteData.row._id}`,
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
    setName("");
    setStatus("");
    setParentName("");
    setPage(0);
    const newUrl = `/api/v1/category?limit=${rowsPerPage}&page=1`;
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
        if (status === "None") {
          newStatus = "";
        }
        url = `/api/v1/category?name=${name}&parent_name=${parentName}&status=${newStatus}&limit=${newLimit}&page=${
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

  const getFilters = async (row) => {
    try {
      setFilterLoading(true);

      let response = await axios({
        url: `/api/v1/category/category-filter-list`,
        method: "post",
        data: row,
      });
      console.log("response", response);
      if (response.status >= 200 && response.status < 300) {
        setFilterList(response?.data?.data);
        // setTotalData(response?.data?.totalData);
        setCategoryNameOfFilter(row.name);
        if (response.data.data.length < 1) {
          setMessage("No data found");
        }
      }
      setFilterLoading(false);
      handleFilterListDialogOpen();
    } catch (error) {
      console.log("error", error);
      setFilterLoading(false);
      handleSnakbarOpen(error.response.data.message.toString(), "error");
    }
  };
  useEffect(() => {
    getData();
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
          <Grid item lg={6} xl={6}>
            <Typography variant="h6" color="info" gutterBottom component="div">
              Category List
            </Typography>
          </Grid>
          <Grid item lg={6} xl={6} style={{ textAlign: "right" }}>
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
          <br />
          <Grid item xs={12}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <br />
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <TextField
                    id="Category Name"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="Parent Name"
                    fullWidth
                    size="small"
                    variant="outlined"
                    label="Parent Name"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
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
            // width: "Calc(100vw - 367px)",
            // padding: "10px 16px 0px",
            boxSizing: "border-box",
          }}
        >
          <Table aria-label="simple table" className={classes.tableStyle}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Parent Name</TableCell>
                <TableCell>Filters</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action &nbsp;&nbsp;&nbsp;</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loading &&
                tableDataList.length > 0 &&
                tableDataList.map((row, i) => (
                  <TableRow
                    key={row?.category_id}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>{row?.parent_name}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="info"
                        size="small"
                        onClick={() => {
                          getFilters(row);
                        }}
                      >
                        View
                      </Button>
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

                    <TableCell align="right">
                      <IconButton
                        variant="contained"
                        // color="success"
                        disableElevation
                        component={Link}
                        to={`/update-category`}
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
                ))}

              {!loading && tableDataList.length < 1 ? (
                <TableRow>
                  <TableCell colSpan={9} style={{ textAlign: "center" }}>
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
        open={deleteDialog}
        onClose={handleDeleteDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ padding: "10px", minWidth: "300px" }}>
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You want to delete {deleteData?.row?.name}
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
        open={filterListDialog}
        onClose={handleFilterListDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Grid container style={{ borderBottom: "1px solid #154360" }}>
            <Grid item xs={6} sm={6} md={6}>
              <p className={classes.dialogTitleStyle}>
                {categoryNameOfFilter} Filter List
              </p>
            </Grid>
            <Grid item xs={6} sm={6} md={6} style={{ textAlign: "right" }}>
              <IconButton onClick={handleFilterListDialogClose}>
                <ClearIcon style={{ color: "#205295" }} />
              </IconButton>
            </Grid>
          </Grid>
          <DialogContentText style={{ minWidth: "400px" }}>
            {filterList.length > 0 ? (
              filterList.map((row, i) => (
                <div key={row.filter_name}>
                  <p style={{ fontWeight: "bold" }}>{row.filter_name}</p>
                  <div>
                    {row?.filter_values?.map((value) => (
                      <label key={value.filter_id} style={{ color: "#727272" }}>
                        {value.name},&nbsp;&nbsp;
                      </label>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No filter is available for this category</p>
            )}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryList;
