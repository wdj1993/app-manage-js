const md5 = require("js-md5");
const { getToken } = require("./authority");

const timeStampNow = () => {
  return (Date.parse(new Date().toString()) / 1000).toString();
}

const sign = (params,useToken = true) => {
  const data = params;
  data.timestamp = timeStampNow();
  if (useToken) {
    data.token = getToken();
  }
  const signKey = 'ca8b188f52d454f7a51f664dd4216ad7';
  const list = [];
  Object.keys(params).forEach((item) => {
    list.push(item + params[item].toString());
  });
  data.sign = md5(list.sort().join('') + signKey)
    .toString()
    .toUpperCase();
  return data;
}

export default sign;