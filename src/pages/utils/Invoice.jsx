import React, { useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

import { useReactToPrint } from "react-to-print";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  cardTitle: {
    fontSize: "42px",
    color: "#154360",
    fontWeight: 500,
    margin: "0 0 15px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },
  cardSubtitle: {
    fontSize: "20px",
    color: "#154360",
    fontWeight: 500,
    margin: "10px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },
  cardSubtitle2: {
    fontSize: "13px",
    color: "#154360",
    fontWeight: 500,
    margin: "3px 0px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "17px",
    },
  },
  cardText: {
    fontSize: "13px",
    color: "#303030",
    // color: "#154360",
    // fontWeight: 500,
    margin: "5px 0",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },

  tableBodyStyle: {
    "& td": {
      [theme.breakpoints.down("sm")]: {
        padding: "5px !important",
      },
    },
  },

  tableStyle: {
    // border: "1px solid #ddd",
    "& thead": {
      background: "#f1f1f1",
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
          // paddingTop: "2px",
          // paddingBottom: "2px",
        },
      },
    },
  },

  logoStyle: {
    cursor: "pointer",
    width: "175px",
    height: "75px",
    display: "block",
    margin: "auto",
  },
}));

const Invoice = ({ data, handleAfterPrint }) => {
  const classes = useStyles();
  const [subtotal, setSubtotal] = useState(0);
  const [totalBeforeTAX, setTotalBeforeTAX] = useState(0);
  const [totalAfterTAX, setTotalAfterTAX] = useState(0);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      // Reset the Promise resolve so we can print again
      // promiseResolveRef.current = null;
      // setIsPrinting(false);
      // handleAfterPrint();
    },
  });

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

  const fnGetSubtotal = () => {
    console.log("fnGetSubtotal");
    let subtotalAmount = 0;

    data?.product_details?.map((item) => {
      let itemPrice;
      if (parseInt(item.discount_price) > 0) {
        itemPrice = parseInt(item.discount_price);
      } else {
        itemPrice = parseInt(item.price);
      }
      return (subtotalAmount += item.quantity * parseInt(itemPrice));
    });
    // setSubtotal(subtotalAmount.toFixed(2));
    // setTotalBeforeTAX((subtotalAmount - data?.discount).toFixed(2));
    // setTotalAfterTAX(
    //   (totalBeforeTAX + (totalBeforeTAX * data?.tax) / 100).toFixed(2)
    // );

    // let totalBeforeTAX = subtotalAmount - row.discount;
    // let totalAfterTAX = totalBeforeTAX + (totalBeforeTAX * 10) / 100;
    return subtotalAmount;
    // setProductTotalPrice(subtotalAmount);
  };
  const fnCalculationSection = () => {
    console.log("fnGetSubtotal");
    let subtotalAmount = 0;

    data?.product_details?.map((item) => {
      let itemPrice;
      if (parseInt(item.discount_price) > 0) {
        itemPrice = parseInt(item.discount_price);
      } else {
        itemPrice = parseInt(item.price);
      }
      return (subtotalAmount += item.quantity * parseInt(itemPrice));
    });

    return (
      <Grid item xs={5}>
        <Grid
          container
          // style={{ background: "antiquewhite", padding: "10px" }}
        >
          <Grid item xs={6}>
            <p className={classes.cardSubtitle2}>Subtotal</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.cardSubtitle2} style={{ textAlign: "right" }}>
              {/* {subtotal} */}
              {subtotalAmount.toFixed(2)}
            </p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.cardSubtitle2}>Discount</p>
          </Grid>
          <Grid item xs={6} style={{ borderBottom: "1px solid #154360" }}>
            <p className={classes.cardSubtitle2} style={{ textAlign: "right" }}>
              {data?.discount?.toFixed(2)}
            </p>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <p className={classes.cardSubtitle2} style={{ textAlign: "right" }}>
              {/* {totalBeforeTAX} */}
              {(subtotalAmount - data?.discount).toFixed(2)}
            </p>
          </Grid>

          <Grid item xs={6}>
            <p className={classes.cardSubtitle2}>TAX</p>
          </Grid>
          <Grid item xs={6} style={{ borderBottom: "1px solid #154360" }}>
            <p className={classes.cardSubtitle2} style={{ textAlign: "right" }}>
              {" "}
              {data?.tax}%
            </p>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={6}>
            <p className={classes.cardSubtitle2} style={{ textAlign: "right" }}>
              {" "}
              {/* {totalAfterTAX} */}
              {(
                subtotalAmount -
                data?.discount +
                ((subtotalAmount - data?.discount) * data?.tax) / 100
              ).toFixed(2)}
            </p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.cardSubtitle2}>Paid Amount</p>
          </Grid>
          <Grid item xs={6}>
            <p className={classes.cardSubtitle2} style={{ textAlign: "right" }}>
              {" "}
              {data?.paid_amount?.toFixed(2)}{" "}
            </p>
          </Grid>

          <Grid item xs={6}>
            <p className={classes.cardSubtitle2}>Due Amount</p>
          </Grid>
          <Grid item xs={6} style={{ borderBottom: "1px solid #154360" }}>
            <p className={classes.cardSubtitle2} style={{ textAlign: "right" }}>
              {(data?.total_amount - data?.paid_amount).toFixed(2)}
            </p>
          </Grid>
          <Grid item xs={6} style={{ background: "#f1f1f1" }}>
            <p className={classes.cardSubtitle2} style={{ fontSize: "18px" }}>
              Total
            </p>
          </Grid>
          <Grid item xs={6} style={{ background: "#f1f1f1" }}>
            <p
              className={classes.cardSubtitle2}
              style={{ textAlign: "right", fontSize: "18px" }}
            >
              {" "}
              {data?.total_amount?.toFixed(2)}{" "}
            </p>
          </Grid>
        </Grid>
      </Grid>
    );
  };
  useEffect(() => {
    // fnGetSubtotal();
    // handlePrint();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        id="getInvoice"
        color="info"
        onClick={handlePrint}
        disableElevation
      >
        GET INVOICE
      </Button>
      <div style={{ display: "none" }}>
        {Object.keys(data).length > 0 && (
          <div
            ref={componentRef}
            style={{
              background: "#fff",
              width: "793.7007874px",
              // height: "1122.519685px",
              margin: "auto",
              // padding: "30px",
              boxSizing: "boder-box",
            }}
          >
            <Grid container alignItems="center">
              <Grid item xs={6}>
                <p className={classes.cardTitle}>Invoice</p>
                <Grid container alignItems="center">
                  <Grid item xs={4}>
                    <p className={classes.cardText}>
                      <b>Invoice No</b>
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p className={classes.cardText}>{data?.order_id}</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className={classes.cardText}>
                      <b>Invoice Date</b>
                    </p>
                  </Grid>
                  <Grid item xs={8}>
                    <p className={classes.cardText}>
                      {" "}
                      {moment(data?.updated_at).format("DD-MM-YYYY, h:mm:ss A")}
                    </p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <img
                  src="/image/logo2.svg"
                  alt=""
                  className={classes.logoStyle}
                />
              </Grid>
            </Grid>
            <hr />
            <Grid container alignItems="center" spacing={6}>
              <Grid item xs={5}>
                <p className={classes.cardSubtitle}>Invoice To</p>

                <Grid container>
                  <Grid item xs={2.5}>
                    <p className={classes.cardText}>
                      <b>Name</b>
                    </p>
                  </Grid>
                  <Grid item xs={8.5}>
                    <p className={classes.cardText}>{data?.customer_name}</p>
                  </Grid>
                  <Grid item xs={2.5}>
                    <p className={classes.cardText}>
                      <b>Phone</b>
                    </p>
                  </Grid>
                  <Grid item xs={8.5}>
                    <p className={classes.cardText}>{data?.customer_phone}</p>
                  </Grid>
                  <Grid item xs={2.5}>
                    <p className={classes.cardText}>
                      <b>Email</b>
                    </p>
                  </Grid>
                  <Grid item xs={8.5}>
                    <p className={classes.cardText}>{data?.customer_email}</p>
                  </Grid>
                  <Grid item xs={2.5}>
                    <p className={classes.cardText}>
                      <b>Address</b>
                    </p>
                  </Grid>
                  <Grid item xs={8.5}>
                    <p className={classes.cardText}>{data?.customer_address}</p>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={5}>
                <p className={classes.cardSubtitle}>Invoice From</p>

                <Grid container>
                  <Grid item xs={2.5}>
                    <p className={classes.cardText}>
                      <b>Name</b>
                    </p>
                  </Grid>
                  <Grid item xs={8.5}>
                    <p className={classes.cardText}>Digital Shop</p>
                  </Grid>
                  <Grid item xs={2.5}>
                    <p className={classes.cardText}>
                      <b>Phone</b>
                    </p>
                  </Grid>
                  <Grid item xs={8.5}>
                    <p className={classes.cardText}>+12345678912</p>
                  </Grid>
                  <Grid item xs={2.5}>
                    <p className={classes.cardText}>
                      <b>Email</b>
                    </p>
                  </Grid>
                  <Grid item xs={8.5}>
                    <p className={classes.cardText}>support@digitalshop.com</p>
                  </Grid>
                  <Grid item xs={2.5}>
                    <p className={classes.cardText}>
                      <b>Address</b>
                    </p>
                  </Grid>
                  <Grid item xs={8.5}>
                    <p className={classes.cardText}>
                      15205 North Kierland Blvd. Suite 100. Scottsdale.
                    </p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <br />

            <TableContainer>
              <Table
                aria-label="simple table"
                className={classes.tableStyle}
                //  style={{ border:"1px solid #c4c4c4",}}
              >
                <TableHead className={classes.tableStyle}>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Specification</TableCell>

                    <TableCell align="right"> Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>

                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className={classes.tableBodyStyle}>
                  {data?.product_details?.length > 0 ? (
                    <>
                      {" "}
                      {data?.product_details?.map((row, i) => (
                        <TableRow
                          key={i}
                          sx={
                            {
                              // "&:last-child td, &:last-child th": { border: 0 },
                            }
                          }
                        >
                          <TableCell>{row.name}</TableCell>
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
                            {/* <b>Brand</b> : Iphone, <b>Color</b> : Silver,{" "}
                          <b>Ram</b> : 4 GB, <b>ROM</b> : 128 GB */}
                          </TableCell>
                          <TableCell align="right">
                            {row?.discount_price > 0
                              ? row?.discount_price.toFixed(2)
                              : row?.price.toFixed(2)}
                          </TableCell>
                          <TableCell align="right">{row?.quantity}</TableCell>
                          <TableCell align="right">
                            {row?.discount_price > 0
                              ? (row?.quantity * row?.discount_price).toFixed(2)
                              : (row?.quantity * row?.price).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
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

            <Grid container alignItems="center">
              <Grid item xs={7}>
                <p className={classes.cardSubtitle}>Payment Info :</p>
                <p className={classes.cardText}>
                  <b>Payment Method :</b>{" "}
                  {data?.payment_method?.length > 0
                    ? data?.payment_method
                    : "N/A"}
                </p>
                <p className={classes.cardText}>
                  <b>Transaction Id :</b>{" "}
                  {data?.transaction_id?.length > 0
                    ? data?.transaction_id
                    : "N/A"}
                </p>
              </Grid>

              {fnCalculationSection()}
              {/* <Grid container>
                  <Grid item xs={6}>
                    <p className={classes.cardSubtitle2}>Subtotal</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p
                      className={classes.cardSubtitle2}
                      style={{ textAlign: "right" }}
                    >
                      {fnGetSubtotal().toFixed(2)}
                    </p>
                  </Grid>
                  <Grid item xs={6}>
                    <p className={classes.cardSubtitle2}>Discount</p>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{ borderBottom: "1px solid #154360" }}
                  >
                    <p
                      className={classes.cardSubtitle2}
                      style={{ textAlign: "right" }}
                    >
                      {data?.discount?.toFixed(2)}
                    </p>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <p
                      className={classes.cardSubtitle2}
                      style={{ textAlign: "right" }}
                    >
                      {(fnGetSubtotal() - data?.discount).toFixed(2)}
                    </p>
                  </Grid>

                  <Grid item xs={6}>
                    <p className={classes.cardSubtitle2}>TAX</p>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{ borderBottom: "1px solid #154360" }}
                  >
                    <p
                      className={classes.cardSubtitle2}
                      style={{ textAlign: "right" }}
                    >
                      {" "}
                      {data?.tax}%
                    </p>
                  </Grid>
                  <Grid item xs={6}></Grid>
                  <Grid item xs={6}>
                    <p
                      className={classes.cardSubtitle2}
                      style={{ textAlign: "right" }}
                    >
                      {" "}
                      {(
                        fnGetSubtotal() -
                        data?.discount +
                        ((fnGetSubtotal() - data?.discount) * data?.tax) / 100
                      ).toFixed(2)}
                    </p>
                  </Grid>
                  <Grid item xs={6}>
                    <p className={classes.cardSubtitle2}>Paid Amount</p>
                  </Grid>
                  <Grid item xs={6}>
                    <p
                      className={classes.cardSubtitle2}
                      style={{ textAlign: "right" }}
                    >
                      {" "}
                      {data?.paid_amount?.toFixed(2)}{" "}
                    </p>
                  </Grid>

                  <Grid item xs={6}>
                    <p className={classes.cardSubtitle2}>Due Amount</p>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{ borderBottom: "1px solid #154360" }}
                  >
                    <p
                      className={classes.cardSubtitle2}
                      style={{ textAlign: "right" }}
                    >
                      {(data?.total_amount - data?.paid_amount).toFixed(2)}
                    </p>
                  </Grid>
                  <Grid item xs={6} style={{ background: "#f1f1f1" }}>
                    <p
                      className={classes.cardSubtitle2}
                      style={{ fontSize: "18px" }}
                    >
                      Total
                    </p>
                  </Grid>
                  <Grid item xs={6} style={{ background: "#f1f1f1" }}>
                    <p
                      className={classes.cardSubtitle2}
                      style={{ textAlign: "right", fontSize: "18px" }}
                    >
                      {" "}
                      {data?.total_amount.toFixed(2)}{" "}
                    </p>
                  </Grid>
                </Grid> */}
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={7}>
                <p className={classes.cardSubtitle}>Terms and Conditions :</p>
                <p className={classes.cardText}>
                  You may cancel your order within a reasonable time before the
                  products are dispatched. Please refer to our website or
                  contact customer support for details on cancellations.Returns
                  and refunds will be handled in accordance with our Return and
                  Refund Policy, which can be found on our website.
                </p>
              </Grid>
              <Grid item xs={5} style={{ textAlign: "center" }}>
                <br />
                <br />
                <br />
                -------------------------------
                <p className={classes.cardSubtitle}>Singature</p>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </>
  );
};

export default Invoice;
