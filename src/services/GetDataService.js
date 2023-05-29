import axios from "axios";

const getDataWithToken = async (url) => {
  console.log("url", url);
  try {
    const localData = JSON.parse(localStorage.getItem("ecom_admin_panel"));

    // console.log("localData.token", localData.token);
    let response = await axios({
      method: "get",
      url: url,

      // headers: {
      //   Authorization: `Bearer ${localData.token}`,
      // },
    });

    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log("error", error);
    return error.response;
  }
};

export { getDataWithToken };
