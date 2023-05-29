import React, { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { CartContext } from "../context/CartContext";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { Link, useLocation, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { v4 as uuidv4 } from "uuid";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import { useSnackbar } from "notistack";
import { InputAdornment } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { getDataWithToken } from "../../services/GetDataService";
import ProductList from "../product/ProductList";
import Invoice from "../utils/Invoice";
const useStyles = makeStyles((theme) => ({
  cardHolder: {
    display: "flex",
    flexDirection: "colunm",
    alignItems: "center",
    height: "85vh",
    [theme.breakpoints.down("sm")]: {
      height: "75vh",
    },
  },
  card: {
    // width: "85%",
    margin: "auto",
    background: "#fff",
    padding: "20px 60px",
    borderRadius: "10px",
    boxSizing: "border-box",
    textAlign: "center",
    // boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",

    [theme.breakpoints.down("sm")]: {
      padding: "20px 20px",
    },
  },
  cardTitle: {
    fontSize: "30px",
    color: "#154360",
    fontWeight: 500,
    margin: "30px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },
  cardText: {
    fontSize: "25px",
    color: "#154360",
    fontWeight: 500,
    margin: "20px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  cardButton: {
    textTransform: "none !important",
    fontSize: "16px !important",
    borderRadius: "25px !important",
    marginTop: "20px !important",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "8px !important",
    },
  },
  tableBodyStyle: {
    "& td": {
      [theme.breakpoints.down("sm")]: {
        padding: "5px !important",
      },
    },
  },
  imgDiv: {
    width: "65px",
    [theme.breakpoints.down("sm")]: {
      width: "65px",
    },
  },
  buttonGroup: {
    width: "200px !important",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "25px !important",
      flexDirection: "column !important",
    },
  },
  removeButton: {
    width: "15px",
  },
  iconButton: {
    padding: "4px !important",
    border: "1px solid #c4c4c4 !important",
    borderRadius: "4px !important",
    [theme.breakpoints.down("sm")]: {
      padding: "5px 0",
    },
  },
  iconStyle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },
  },
  input: {
    // textAlign: "center !important",
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      fontSize: "12px",
      textAlign: "center",
      [theme.breakpoints.down("sm")]: {
        padding: "3px",
        textAlign: "center",
      },
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    width: "80px",
    [theme.breakpoints.down("sm")]: {
      width: "35px",
    },
  },
  input2: {
    // textAlign: "center !important",
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      fontSize: "16px",
      fontWeight: 500,
      textAlign: "right",
      color: "#154360",
      border: "none",
      [theme.breakpoints.down("sm")]: {
        padding: "3px",
        textAlign: "right",
      },
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    // width: "250px",
    [theme.breakpoints.down("sm")]: {
      width: "35px",
    },
  },
  input3: {
    // textAlign: "center !important",
    "& input[type=text]": {
      "-moz-appearance": "textfield",
      fontSize: "16px",
      fontWeight: 500,
      // textAlign: "right",
      color: "#154360",
      border: "none",
      [theme.breakpoints.down("sm")]: {
        padding: "3px",
        textAlign: "right",
      },
    },
    "& input[type=text]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=text]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    // width: "250px",
    [theme.breakpoints.down("sm")]: {
      width: "35px",
    },
  },
  titleStyle: {
    fontSize: "17px",
    color: "#154360",
    fontWeight: 600,
    margin: 0,
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      marginBottom: "10px",
    },
  },
  titleStyle2: {
    fontSize: "22px",
    color: "#154360",
    fontWeight: 500,
    margin: "0 0 20px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },

  priceStyle: {
    color: "#95A5A6",
    margin: "5px 0 0 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  cartImg: {
    width: "40px",
    height: "40px",
    [theme.breakpoints.down("sm")]: {
      width: "60px",
      height: "60px",
    },
  },
  forMobileView: {
    display: "none !important",
    [theme.breakpoints.down("sm")]: {
      display: "block !important",
    },
  },
  forOtherView: {
    [theme.breakpoints.down("sm")]: {
      display: "none !important",
    },
  },
  containerStyle: {
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
  },
  quantityControler: {
    [theme.breakpoints.down("sm")]: {
      // width: "100%",
    },
  },
  amountTitle: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#154360",
    margin: 0,
  },
  amountStyle: {
    fontSize: "16px",
    fontWeight: 500,
    textAlign: "right",
    color: "#154360",
    margin: 0,
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
  select: {
    "& .MuiSelect-select": {
      fontWeight: 500,
      color: "#154360 !important",
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
const OrderItemList = ({ handleOrderChange, handleOpenOrderListClose }) => {
  const classes = useStyles();
  const { state } = useLocation();
  let { id } = useParams();
  const [orderNo, setOrderNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [transactionType, setTransactionType] = useState("Offline");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [transactionId, setTransactionId] = useState("");
  const [shippingAddress, setShippingAddress] = useState("11/A, Dhaka");
  const [promoCode, setPromoCode] = useState("");
  const [productTotalPrice, setProductTotalPrice] = useState(0);
  const [cancelProductData, setCancelProductData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingFetchData, setLoadingFetchData] = useState(false);
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tax, setTax] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [orderListItems, setOrderListItems] = useState([]);
  const [responseData, setResponseData] = useState({});
  const [cancelProductLoading, setCancelProductLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [newProductListDialog, setNewProductListDialog] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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

  const handleClose = () => {
    setOpen(false);
    setCancelProductData({});
  };
  const handleNewProductListDialogClose = () => {
    setNewProductListDialog(false);
  };

  const removeDialog = (row) => {
    console.log("row", row);
    setOpen(true);
    setCancelProductData(row);
  };
  // const removelist = () => {
  //   console.log("cancelProductData", cancelProductData);
  //   handleOrderChange(cancelProductData);
  //   handleClose();
  // };

  const modifyArray = (value, row, i) => {
    console.log("value", value);

    if (parseInt(value) > parseInt(row?.stock_unit)) {
      handleSnakbarOpen(
        `Sorry! available stock is ${row?.stock_unit} unit${
          parseInt(row?.stock_unit) > 1 && "s"
        } `,
        "error"
      );
    } else {
      let newObject;
      if (!value) {
        newObject = { ...row, quantity: 0 };
      } else {
        newObject = { ...row, quantity: parseInt(value) };
      }
      console.log("newObject", newObject);
      let newOrderItems = orderListItems.map((item) => {
        if (item._id === row._id) {
          return newObject;
        } else {
          return item;
        }
      });
      console.log("newOrderItems", newOrderItems);
      setOrderListItems(newOrderItems);
    }
  };
  const increaseQuantity = (qty, row, i) => {
    console.log("qty", qty);
    let newqty = parseInt(qty) + 1;
    modifyArray(newqty, row, i);
  };
  const decreaseQuantity = (qty, row, i) => {
    let newqty = parseInt(qty) - 1;
    if (newqty > 0) {
      modifyArray(newqty, row, i);
    }
  };
  const fnTotalPrice = () => {
    console.log("fnTotalPrice");
    let total = 0;

    orderListItems?.map((item) => {
      let itemPrice;
      if (parseInt(item.discount_price) > 0) {
        itemPrice = parseInt(item.discount_price);
      } else {
        itemPrice = parseInt(item.price);
      }
      return (total += item.quantity * parseInt(itemPrice));
    });
    setProductTotalPrice(total);
  };

  const validation = () => {
    let isError = false;

    if (!name.trim()) {
      handleSnakbarOpen("Please enter customer name", "error");
      document.getElementById("name").focus();
      return (isError = true);
    }
    if (!phoneNo.trim()) {
      handleSnakbarOpen("Please enter customer phone number", "error");
      document.getElementById("phoneNo").focus();
      return (isError = true);
    }
    if (!email.trim()) {
      // handleSnakbarOpen("Please enter email address", "error");
      // document.getElementById("email").focus();
      // return (isError = true);
    } else if (
      !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email.trim()
      )
    ) {
      handleSnakbarOpen("Invalid email address", "error");
      document.getElementById("email").focus();
      return (isError = true);
    }
    if (!address.trim()) {
      handleSnakbarOpen("Please enter shipping address", "error");
      document.getElementById("address").focus();
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
      let newTax = tax;
      let newDiscount = discount;
      let newPaidAmount = paidAmount;
      if (tax === "") {
        newTax = 0;
      }
      if (discount === "") {
        newDiscount = 0;
      }
      if (paidAmount === "") {
        newPaidAmount = 0;
      }
      try {
        let data = {
          customer_name: name,
          customer_email: email,
          customer_phone: phoneNo,
          customer_address: address,
          shipping_address: shippingAddress,
          discount: newDiscount,
          tax: newTax,
          total_amount: calculateTotalAmount(),
          paid_amount: newPaidAmount,
          transaction_type: transactionType,
          payment_method: paymentMethod,
          transaction_id: transactionId,
          order_list: orderListItems,
        };

        let response = await axios({
          url: `/api/v1/order/update/${id}`,
          method: "put",
          data: data,
          headers: { "Content-Type": "application/json" },
        });
        if (response.status >= 200 && response.status < 300) {
          // handleSnakbarOpen("Successful", "success");
          setResponseData(response.data.data);
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
  const calculateTotalAmount = () => {
    return (
      productTotalPrice -
      discount +
      ((productTotalPrice - discount) * tax) / 100
    ).toFixed(2);
  };
  const getData = async (pageNO, limit, newUrl) => {
    console.log("pageNO ==============", pageNO);

    try {
      setLoadingFetchData(true);

      let url = `/api/v1/order/${id}`;

      let allData = await getDataWithToken(url);
      let productDetailsWithStockUnit = [];
      if (allData.status >= 200 && allData.status < 300) {
        if (allData?.data?.data?.product_details?.length > 0) {
          let productIds = allData?.data?.data?.product_details.map(
            (item) => item.product_id
          );
          console.log("productIds", productIds);
          let response = await axios({
            url: `/api/v1/product/product-list-by-ids`,
            method: "post",
            data: { productIds: productIds },
          });
          console.log("response", response?.data?.data);
          if (response.status >= 200 && response.status < 300) {
            response?.data?.data.map((item) => {
              let product = allData?.data?.data.product_details.find(
                (el) => el.product_id === item.product_id
              );
              if (product !== undefined) {
                product.previous_order_quantity = product.quantity;
                product.stock_unit = item.stock_unit;
              }
              productDetailsWithStockUnit.push(product);
            });
          }
          console.log(
            "productDetailsWithStockUnit",
            productDetailsWithStockUnit
          );
        }

        setOrderNo(allData?.data?.data.order_id);
        setName(allData?.data?.data.customer_name);
        setEmail(allData?.data?.data.customer_email);
        setPhoneNo(allData?.data?.data.customer_phone);
        setAddress(allData?.data?.data.customer_address);
        setTransactionType(allData?.data?.data.transaction_type);
        setPaymentMethod(allData?.data?.data.payment_method);
        setTransactionId(allData?.data?.data.transaction_id);
        setShippingAddress(allData?.data?.data.shipping_address);
        setOrderListItems(productDetailsWithStockUnit);
        setDiscount(allData?.data?.data.discount);
        setTax(allData?.data?.data.tax);
        setPaidAmount(allData?.data?.data.paid_amount);

        if (allData.data.data.length < 1) {
          setMessage("No data found");
        }
      }
      setLoadingFetchData(false);
    } catch (error) {
      console.log("error", error);
      setLoadingFetchData(false);
      handleSnakbarOpen(error.response.data.message.toString(), "error");
    }
  };
  const cancelProduct = async (row) => {
    try {
      setCancelProductLoading(true);

      let data = {
        id: id,
        productId: cancelProductData.product_id,
      };
      console.log("data", data);
      // let response = await axios({
      //   url: `/api/v1/order/cancel-product`,
      //   method: "post",
      //   data: data,
      // });
      // console.log("response", response);
      // if (response.status >= 200 && response.status < 300) {
      let newOrderItems = orderListItems.filter(
        (res) => res.product_id !== cancelProductData.product_id
      );
      setOrderListItems(newOrderItems);
      // }
      setCancelProductLoading(false);
      handleClose();
    } catch (error) {
      console.log("error", error);
      setCancelProductLoading(false);
      handleSnakbarOpen(error.response.data.message.toString(), "error");
    }
  };
  useEffect(() => {
    getData();
    console.log("state?.row", state?.row);
  }, []);
  useEffect(() => {
    fnTotalPrice();
  }, [orderListItems]);
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #ddd",
        borderRadius: "5px",
        overflow: "hidden",
        padding: "24px",
      }}
    >
      <>
        <Grid container>
          <Grid item xs={6} sm={6} md={6}>
            <p className={classes.titleStyle2}>
              Update Order &nbsp;
              <span style={{ fontSize: "16px", color: "#7c7c7c" }}>
                ( Order No: {orderNo})
              </span>
              {/* &nbsp;
              <span style={{ fontSize: "16px", color: "#7c7c7c" }}>
                ({orderListItems?.length} Item
                {orderListItems?.length > 1 && "s"})
              </span> */}
            </p>
          </Grid>
          <Grid item xs={6} sm={6} md={6} style={{ textAlign: "right" }}>
            {/* <IconButton onClick={handleOpenOrderListClose}>
                <ClearIcon style={{ color: "#205295" }} />
              </IconButton> */}
            {Object.keys(responseData).length > 0 && (
              <Invoice data={responseData} />
            )}
          </Grid>
        </Grid>

        <Grid
          container
          justifyContent="center"
          // alignItems="center"
          spacing={2}
          // style={{background:"#ddd"}}
        >
          <Grid item xs={2.5}>
            <TextField
              id="name"
              label="Customer Name"
              variant="standard"
              size="small"
              fullWidth
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">
              //       Customer Name
              //     </InputAdornment>
              //   ),
              // }}
              className={classes.input3}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              id="email"
              label="Customer Email"
              variant="standard"
              size="small"
              fullWidth
              className={classes.input3}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">Email</InputAdornment>
              //   ),
              // }}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              id="phoneNo"
              label="Customer Phone"
              variant="standard"
              size="small"
              fullWidth
              className={classes.input3}
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">Phone</InputAdornment>
              //   ),
              // }}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </Grid>
          <Grid item xs={4.5}>
            <TextField
              id="address"
              label="Customer Address"
              variant="standard"
              size="small"
              fullWidth
              // InputProps={{
              //   startAdornment: (
              //     <InputAdornment position="start">Address</InputAdornment>
              //   ),
              // }}
              className={classes.input3}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={2.5}>
            {/* <TextField
                id="transactionType"
                label="Transaction Type"
                variant="standard"
                size="small"
                fullWidth
                className={classes.input3}
                inputProps={{ min: 0, step: 0.01 }}
                onWheel={(e) => e.target.blur()}
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              /> */}
            <FormControl fullWidth variant="standard" size="small">
              <InputLabel id="demo-simple-select-label">
                Transaction Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Transaction Type"
                className={classes.select}
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <MenuItem value={"Offline"}>Offline</MenuItem>
                <MenuItem value={"Online"}>Online</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              id="paymentMethod"
              label="Payment Method"
              variant="standard"
              size="small"
              fullWidth
              className={classes.input3}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Grid>
          <Grid item xs={2.5}>
            <TextField
              id="transactionId"
              label="Transaction Id"
              variant="standard"
              size="small"
              fullWidth
              className={classes.input3}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </Grid>
          <Grid item xs={4.5}>
            <TextField
              id="shippingAddress"
              label="Shipping Address"
              variant="standard"
              size="small"
              fullWidth
              className={classes.input3}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
            />
          </Grid>
        </Grid>
        <br />
        <div style={{ textAlign: "right" }}>
          <Button
            disableElevation
            variant="outlined"
            color="info"
            onClick={() => setNewProductListDialog(true)}
          >
            Add New Product
          </Button>
        </div>
        <br />
        <TableContainer>
          <Table
            aria-label="simple table"
            className={classes.tableStyle}
            //  style={{ border:"1px solid #c4c4c4",}}
          >
            <TableHead className={classes.tableStyle}>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Specification</TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Available Stocks
                </TableCell>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Previous Order Quantity
                </TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="right"> Price</TableCell>
                <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                  {" "}
                  Discount Price
                </TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBodyStyle}>
              {orderListItems.length > 0 ? (
                orderListItems?.map((row, i) => (
                  <TableRow
                    key={i}
                    sx={
                      {
                        // "&:last-child td, &:last-child th": { border: 0 },
                      }
                    }
                  >
                    <TableCell className={classes.imgDiv}>
                      {row?.images.length > 0 ? (
                        <img
                          src={row?.images[0].url}
                          alt=""
                          className={classes.cartImg}
                        />
                      ) : (
                        "No Image Available"
                      )}
                    </TableCell>
                    <TableCell>{row?.name}</TableCell>
                    <TableCell>
                      {" "}
                      {row?.filter_data.length > 0
                        ? row?.filter_data
                            .sort(sortByParentName)
                            .map((e, i) => (
                              <label key={e._id}>
                                {i !== 0 && <>,&nbsp;&nbsp;</>}
                                <b>{e.parent_name}</b> : {e.name}
                              </label>
                            ))
                        : "N/A"}
                    </TableCell>
                    <TableCell>
                      {row?.stock_unit}{" "}
                      {parseInt(row?.stock_unit) > 1 ? "Units" : "Unit"}
                    </TableCell>
                    <TableCell>
                      {row?.previous_order_quantity}{" "}
                      {parseInt(row?.stock_unit) > 1 ? "Units" : "Unit"}
                    </TableCell>
                    <TableCell style={{ whiteSpace: "nowrap" }}>
                      {" "}
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className={classes.buttonGroup}
                      >
                        <Grid className={classes.quantityControler}>
                          <IconButton
                            onClick={() =>
                              decreaseQuantity(row.quantity, row, i)
                            }
                            className={classes.iconButton}
                          >
                            <RemoveIcon className={classes.iconStyle} />
                          </IconButton>
                          &nbsp;
                        </Grid>
                        <Grid className={classes.quantityControler}>
                          {" "}
                          <TextField
                            id="outlined-basic"
                            className={classes.input}
                            variant="outlined"
                            size="small"
                            // style={{ width: "50px"  }}
                            type="number"
                            value={
                              parseInt(row.quantity) === 0 ? "" : row.quantity
                            }
                            onChange={(e) => {
                              modifyArray(e.target.value, row, i);
                            }}
                          />
                        </Grid>
                        <Grid className={classes.quantityControler}>
                          &nbsp;
                          <IconButton
                            aria-label="AddIcon"
                            onClick={() =>
                              increaseQuantity(row.quantity, row, i)
                            }
                            className={classes.iconButton}
                          >
                            <AddIcon className={classes.iconStyle} />
                          </IconButton>
                        </Grid>
                      </Grid>
                      {/* <div className={classes.forMobileView}>
                            <br />
                            {row.quantity * row.price}
                          </div> */}
                    </TableCell>
                    <TableCell align="right" className={classes.forOtherView}>
                      {row.price}
                    </TableCell>
                    <TableCell align="right" className={classes.forOtherView}>
                      {parseInt(row.discount_price) > 0
                        ? row.discount_price
                        : "N/A"}
                    </TableCell>
                    <TableCell align="right" className={classes.forOtherView}>
                      {parseInt(row.discount_price) > 0
                        ? row.quantity * row.discount_price
                        : row.quantity * row.price}
                    </TableCell>
                    <TableCell
                      align="right"
                      // className={classes.forOtherView}
                      className={classes.removeButton}
                    >
                      <IconButton
                        aria-label="delete"
                        color="secondary"
                        onClick={() => removeDialog(row)}
                      >
                        <DeleteIcon style={{ color: "#95A5A6" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} style={{ textAlign: "center" }}>
                    <strong> Please add some products</strong>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <br />
        <Grid
          container
          justifyContent="center"
          // alignItems="center"
          spacing={1}
        >
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              // label="Outlined"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Subtotal </InputAdornment>
                ),
              }}
              className={classes.input2}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={productTotalPrice}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              // label="Outlined"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              className={classes.input2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Discount </InputAdornment>
                ),
              }}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              // label="Outlined"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              className={classes.input2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">TAX </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment
                    position="end"
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      color: "#154360",
                    }}
                  >
                    %{" "}
                  </InputAdornment>
                ),
              }}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={tax}
              onChange={(e) => setTax(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              // label="Outlined"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              className={classes.input2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Paid Amount </InputAdornment>
                ),
              }}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              // label="Outlined"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              className={classes.input2}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Due Amount </InputAdornment>
                ),
              }}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={parseInt(calculateTotalAmount()) - paidAmount}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              // label="Outlined"
              variant="outlined"
              size="small"
              type="number"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Total</InputAdornment>
                ),
              }}
              className={classes.input2}
              inputProps={{ min: 0, step: 0.01 }}
              onWheel={(e) => e.target.blur()}
              value={calculateTotalAmount()}
            />
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              disabled={loading}
              size="large"
              style={{ minHeight: "35px", marginTop: "20px" }}
              disableElevation
              onClick={onSubmit}
            >
              <PulseLoader
                color={"#353b48"}
                loading={loading}
                size={10}
                speedMultiplier={0.5}
              />{" "}
              {loading === false && "Update Order"}
            </Button>
          </Grid>
        </Grid>
        {/* <Grid container alignItems="right" justifyContent="flex-end">
            <Grid item>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 400,
                  color: "#154360",
                }}
              >
                SubTotal Cost
              </p>
            </Grid>
            <Grid item>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: 500,
                  textAlign: "right",
                  color: "#154360",
                }}
              >
                Tk. {productTotalPrice}
              </p>
            </Grid>
          </Grid> */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div style={{ padding: "10px", minWidth: "300px" }}>
            <DialogTitle id="alert-dialog-title">{"Remove Alart?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                You want to cancel {cancelProductData.name} order
              </DialogContentText>
            </DialogContent>
          </div>
          <DialogActions>
            <Button onClick={handleClose}>cancel</Button>
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
        </Dialog>
        <Dialog
          open={newProductListDialog}
          onClose={handleNewProductListDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          fullWidth={true}
          maxWidth="xl"
        >
          <DialogContent>
            <Grid container>
              <Grid item xs={6} sm={6} md={6}></Grid>
              <Grid item xs={6} sm={6} md={6} style={{ textAlign: "right" }}>
                <IconButton onClick={handleNewProductListDialogClose}>
                  <ClearIcon style={{ color: "#205295" }} />
                </IconButton>
              </Grid>
            </Grid>
            <ProductList
              orderListItems={orderListItems}
              setOrderListItems={setOrderListItems}
              isFromOrderList={true}
            />
          </DialogContent>

          <DialogActions>
            {/* <Button variant="outlined" onClick={handleNewProductListDialogClose}>cancel</Button> */}
            {/* <Button
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
            </Button> */}
          </DialogActions>
        </Dialog>
      </>
    </div>
  );
};

export default OrderItemList;
