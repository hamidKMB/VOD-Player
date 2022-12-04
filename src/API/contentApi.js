import axios from "axios";

const getContentDetails = (streamUrl) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      method: "get",
      url: `/w/content/streamPageDetail/${streamUrl}`,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const getContentSrc = (streamUrl) => {
  return new Promise((resolve, reject) => {
    axios({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      method: "get",
      url: `/w/content/stream/${streamUrl}`,
    })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export default getContentDetails;
export { getContentSrc };
