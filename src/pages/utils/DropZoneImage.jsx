// Checked

import React, { useState, useMemo, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { useSnackbar } from "notistack";
const useStyles = makeStyles(() => ({
  marginBottomStyle: {
    marginBottom: "30px",
  },

  inputStyle: {
    borderRadius: "8px",
  },
  inputStyle2: {
    borderRadius: "8px",
    // "& .MuiInputBase-input": {
    //   color: "#A2A2A2",
    // },
    "& .MuiSelect-outlined.MuiSelect-outlined": {
      fontSize: "14px",
      padding: 13,
    },
    "& .MuiSelect-select:focus": {
      backgroundColor: "#fff",
    },
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 8,
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& .MuiOutlinedInput-inputMarginDense": {
      padding: 13,
    },
  },
  selectStyle: {
    textAlign: "left",

    "& img": {
      position: "relative",
      top: "2px",
      marginRight: "5px",
    },
  },
  selectItemStyle: {
    fontWeight: 600,
  },
  muteColor: {
    color: "#19181666",
  },
  inputRoot: {
    "& .MuiOutlinedInput-input": {
      // color: "green",
      // fontWeight: 600,
    },
    "& .MuiInputLabel-root": {
      // color: "green",
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      // borderColor: "#eee",
      // backgroundColor: "#eee",
      color: "#333",
    },
    "&:hover .MuiOutlinedInput-input": {
      // color: "red",
    },
    "&:hover .MuiInputLabel-root": {
      // color: "red",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      // borderColor: "red",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      // color: "purple",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      // color: "purple",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      // borderColor: "purple",
    },
  },
  flag: {
    marginRight: 10,
  },
  select: {
    "& .MuiSelect-select:focus": {
      backgroundColor: "#fff",
      borderWidth: 0,
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#fff",
    },
    padding: "5px",
    height: 45,
    borderRadius: 8,
  },
  buttonStyle: {
    border: "1px solid #19181666",
    background: "rgba(0,0,0,0)",
    padding: "10px 20px",
    fontSize: "14px",
    color: "#19181666",
    // fontWeight: 600,
    textTransform: "capitalize",
    borderRadius: "8px",
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none",
      background: "rgba(0,0,0,0)",
      border: "1px solid black",
    },
  },

  textStyle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
  },
}));
const DropZoneImage = ({ files, setFiles, maxFilesNo }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
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

  const [reload, setReload] = useState(false);

  //=========================Drop Zone======================================
  const thumb = {
    display: "inline-flex",
    justifyContent: "center",
    borderRadius: 2,
    border: "1px solid #c4c4c4",
    marginTop: 15,
    marginBottom: 8,
    marginRight: 8,
    width: 150,
    height: 150,
    padding: 4,
    boxSizing: "border-box",
    position: "relative",
  };
  const removeButton = {
    background: "#8d8d8d60",
    position: "absolute",
    right: 6,
    top: 7,
  };
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    margin: "auto",
    height: "100%",
    width: "100%",
  };
  const baseStyle = {
    // flex: 1,
    // display: "flex",
    // flexDirection: "column",
    // alignItems: "center",
    // padding: "20px",
    // borderWidth: 2,
    // borderRadius: 2,

    // backgroundColor: "#fafafa",
    // color: "#bdbdbd",
    borderColor: "rgba(196,196,196,1)",
    borderStyle: "dashed",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const activeStyle = {
    // borderColor: "#2196f3",
    borderColor: "blue",
  };

  const acceptStyle = {
    // borderColor: "#00e676",
    borderColor: "#FEBF03",
    backgroundColor: "#ddd",
  };

  const rejectStyle = {
    // borderColor: "#ff1744",
    borderColor: "red",
  };
  const {
    getRootProps,
    getInputProps,
    open,
    acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    // Disable click and keydown behavior
    noClick: false,
    noKeyboard: true,
    // accept: "image/jpeg,image/jpg, image/png",
    accept: {
      "image/*": [],
    },

    // accept:  "application/pdf",
    // maxFiles: 5,
    onDrop: (acceptedFiles) => {
      let newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      console.log("files", files);
      console.log("newFiles", newFiles);
      console.log("files.concat(newFiles", files.concat(newFiles));
      if (files.concat(newFiles).length > parseInt(maxFilesNo)) {
        handleSnakbarOpen("sorry! max 5 images", "error");
      } else {
        setFiles(files.concat(newFiles));
      }
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  console.log("style", isDragActive);
  const filesDetail = acceptedFiles.map((file) => (
    <label key={file.path}>
      {file.path} - {file.size} bytes &nbsp;&nbsp; &nbsp;
    </label>
  ));
  const thumbs = files?.map((file, i) => (
    <div style={thumb} key={i}>
      <div style={thumbInner}>
        <img src={URL.createObjectURL(file)} style={img} />
        {/* <img src={file.preview} style={img} /> */}
      </div>
      <IconButton
        style={removeButton}
        size="small"
        onClick={() => removeFile(i)}
      >
        <ClearIcon style={{ color: "#fff", fontSize: "18px" }} />
      </IconButton>
    </div>
  ));
  const removeFile = (index) => {
    console.log("index", index);
    console.log("files", files);
    let newFiles = files.splice(index, 1);
    console.log("newFiles", newFiles);
    setReload(!reload);
    // setFiles(newFiles);
  };
  const testing = () => {
    console.log("acceptedFiles", acceptedFiles);
    console.log("files", files);
  };
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [acceptedFiles]
  );
  // ==================================================================
  return (
    <>
      {/* <button onClick={testing}>testing</button> */}
      <div>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />

          <p style={{ textAlign: "center", color: "#c4c4c4" }}>
            Drag 'n' drop some files here, or click to select files
            <br />
            (Only jpg / jpeg and png images will be accepted)
          </p>
        </div>
      </div>
      <div style={{ textAlign: "center" }}>{thumbs}</div>
    </>
  );
};

export default DropZoneImage;
