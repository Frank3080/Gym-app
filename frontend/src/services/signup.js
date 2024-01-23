import axios from "axios";
const baseUrl = "http://localhost:3003/api/signup";

const signup = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (err) {
    console.log("Signup failed:", err);
  }
};

export default { signup };
