import axios from "axios";
import { devLogError } from "@utils/devLogger";

export const ajax = async ({ method = "GET", url, headers = {}, data }) => {
  try {
    const response = await axios({
      method,
      url,
      headers: {
        Accept: "application/json",
        ...headers,
      },
      [method === "GET" ? "params" : "data"]: data,
    });

    return (response || {}).data;
  } catch (e) {
    devLogError(`Network error: ${e.message}`);
    throw e;
  }
};
