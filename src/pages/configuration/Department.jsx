import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "@mui/material/Link";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Stack from "@mui/material/Stack";
import GridViewIcon from "@mui/icons-material/GridView";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const useStyles = makeStyles((theme) => ({
  form: {
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",

    width: "100%",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  },
  buttonStyle: {
    color: "#515151 !important",
    textTransform: "none !important",
    minWidth: "160px !important",
  },
  activeButtonStyle: {
    background: "rgba(158,31,96,1) !important",
    color: "#fff !important",
  },
}));

const Department = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const { login, kinder_cubby_panel_user, logout } = useContext(AuthContext);
  const [productName, setProductName] = useState("Item");
  const [lastName, setLastName] = useState("Islam");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Password123@");
  const [description, setPhone] = useState("+01977885544");
  const [street, setStreet] = useState("street");
  const [locality, setLocality] = useState("locality");
  const [region, setRegion] = useState("region");
  const [price, setPrice] = useState("125");
  const [storeId, setStoreId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [active, setActive] = useState("Department");

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };
  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
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

    if (!productName.trim()) {
      handleSnakbarOpen("Please enter first name", "error");
      document.getElementById("productName").focus();
      return (isError = true);
    }
    if (!lastName.trim()) {
      handleSnakbarOpen("Please enter last name", "error");
      document.getElementById("lastName").focus();
      return (isError = true);
    }
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
    if (!description.trim()) {
      handleSnakbarOpen("Please enter description number", "error");
      document.getElementById("description").focus();
      return (isError = true);
    }
    if (!street.trim()) {
      handleSnakbarOpen("Please enter street", "error");
      document.getElementById("street").focus();
      return (isError = true);
    }
    if (!locality.trim()) {
      handleSnakbarOpen("Please enter locality", "error");
      document.getElementById("locality").focus();
      return (isError = true);
    }
    if (!region.trim()) {
      handleSnakbarOpen("Please enter region", "error");
      document.getElementById("region").focus();
      return (isError = true);
    }
    if (!price.trim()) {
      handleSnakbarOpen("Please enter postal code", "error");
      document.getElementById("price").focus();
      return (isError = true);
    }
    if (!storeId.trim()) {
      handleSnakbarOpen("Please select a storeId", "error");
      document.getElementById("storeId").focus();
      return (isError = true);
    }
    return isError;
  };

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      href="/"
      style={{ color: "#9e1f63" }}
      onClick={handleClick}
    >
      Configuration
    </Link>,
    <Link
      underline="hover"
      key="2"
      href="/"
      style={{ color: "#9e1f63" }}
      onClick={handleClick}
    >
      Department
    </Link>,
    <Typography key="3" color="text.primary">
      Department
    </Typography>,
  ];
  return (
    <div>
      <Grid
        container
        alignItems="center"
        // justifyContent="center"
        // style={{ height: "80vh" }}
      >
        <Grid item xs={12} style={{ marginBottom: "30px" }}>
          <Grid container alignItems="center">
            <Grid item xs={10}>
              <Grid container alignItems="center">
                <Grid
                  style={{
                    borderRight: "1px solid #a3a3a3",
                    padding: "0px 20px",
                  }}
                >
                  <Typography
                    variant="h5"
                    style={{ color: "#515151" }}
                    component="div"
                  >
                    Configuration
                  </Typography>
                </Grid>
                <Grid style={{ padding: "0px 20px" }}>
                  <Stack spacing={2}>
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      {breadcrumbs}
                    </Breadcrumbs>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                disableElevation
                style={{ padding: "8px", minWidth: "0px" }}
              >
                <GridViewIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginBottom: "30px" }}>
          <Button
            className={`${classes.buttonStyle} ${
              active === "Category" ? classes.activeButtonStyle : null
            }`}
            startIcon={<DeleteIcon />}
            onClick={() => setActive("Category")}
          >
            Category
          </Button>
          &nbsp; &nbsp;
          <Button
            className={`${classes.buttonStyle} ${
              active === "Quick List" ? classes.activeButtonStyle : null
            }`}
            startIcon={<DeleteIcon />}
            onClick={() => setActive("Quick List")}
          >
            Quick List
          </Button>
          &nbsp; &nbsp;
          <Button
            className={`${classes.buttonStyle} ${
              active === "Department" ? classes.activeButtonStyle : null
            }`}
            startIcon={<DeleteIcon />}
            onClick={() => setActive("Department")}
          >
            Department
          </Button>
          &nbsp; &nbsp;
          <Button
            className={`${classes.buttonStyle} ${
              active === "Country" ? classes.activeButtonStyle : null
            }`}
            startIcon={<DeleteIcon />}
            onClick={() => setActive("Country")}
          >
            Country
          </Button>
          &nbsp; &nbsp;
          <Button
            className={`${classes.buttonStyle} ${
              active === "Urgency" ? classes.activeButtonStyle : null
            }`}
            startIcon={<DeleteIcon />}
            onClick={() => setActive("Urgency")}
          >
            Urgency
          </Button>
          &nbsp; &nbsp;
        </Grid>

        <form className={classes.form}>
          <Typography
            variant="h5"
            component="div"
            // style={{ marginBottom: "30px" }}
          >
            Department
          </Typography>
          <hr />
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    Department
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    DESIGNATION
                  </TableCell>
                  <TableCell align="center">DESCRIPTION</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    background: "#f9f9f9",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    <FormControl
                      style={{ width: "90%", background: "#fff" }}
                      size="small"
                    >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={department}
                        onChange={handleDepartmentChange}
                      >
                        <MenuItem value={""} disabled>
                          Select
                        </MenuItem>

                        <MenuItem value={10}>Department 1</MenuItem>
                        <MenuItem value={20}>Department 2</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    <FormControl
                      style={{ width: "90%", background: "#fff" }}
                      size="small"
                    >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={designation}
                        onChange={handleDesignationChange}
                      >
                        <MenuItem value={""} disabled>
                          Select
                        </MenuItem>

                        <MenuItem value={10}>Designation 1</MenuItem>
                        <MenuItem value={20}>Designation 2</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell align="center" rowSpan={2}>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={8}
                      // placeholder="Minimum 3 rows"
                      style={{ width: "90%" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    background: "#f9f9f9",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    <TextField
                      size="small"
                      id="outlined-basic"
                      style={{ width: "90%", background: "#fff" }}
                      placeholder="Department"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  >
                    <TextField
                      size="small"
                      id="outlined-basic"
                      style={{ width: "90%", background: "#fff" }}
                      placeholder="Designation"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" colSpan={3}>
                    <Button variant="contained">Add</Button> &nbsp;
                    <Button variant="contained" color="info">
                      Edit
                    </Button>{" "}
                    &nbsp;
                    <Button variant="contained" color="error">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{
                      borderRight: "1px solid #ddd",
                      fontSize: "17px",
                      color: "#837e7e",
                    }}
                  >
                    Admin
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ borderRight: "1px solid #ddd" }}
                  ></TableCell>
                  <TableCell align="center">
                    {" "}
                    <TextField
                      size="small"
                      id="outlined-basic"
                      style={{ width: "90%" }}
                      placeholder="Admin"
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </Grid>
    </div>
  );
};

export default Department;
