import axios from "axios";
export const axios_get = (url, header) => axios.get(url, header)

export const axios_post = (url, body, header) => axios.post(url, body, header);

export const axios_options = (url, headers) =>  axios.options(url, { headers });

export const API = (endpoint, options, cb) =>
{
  let params = [];
  if (!options || options.length === 1) {
    return cb(`${endpoint}/${options.API}`);
  }
  Object.keys(options).forEach(key => params.push(`${key}=${options[key]}`));
  return cb(`${endpoint}/${options.API}?` + params.join("&"));
};
