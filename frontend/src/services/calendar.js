import axios from "axios";

const baseUrl = "http://localhost:3003/api/calendar";

const add = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};

export default { add };
