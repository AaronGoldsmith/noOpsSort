import axios from "axios";

export const ax_post = (url, body, header) => {
  return axios.post(url, body, header);
};
export const axios_options = (url, headers) => {
  return axios.options(url, { headers });
};
export const API = (endpoint, options, cb) => {
  let params = [];
  if (!options || options.length === 1) {
    return cb(`${endpoint}/${options.API}`);
  }
  Object.keys(options).forEach(key => params.push(`${key}=${options[key]}`));
  return cb(`${endpoint}/${options.API}?` + params.join("&"));
};
