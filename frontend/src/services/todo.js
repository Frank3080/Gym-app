import axios from "axios";

const baseUrl = "http://localhost:3003/api/todos";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data.map((item) => ({
    id: item._id,
    value: item.value,
  }));
};

const create = async (newItem) => {
  const response = await axios.post(baseUrl, { value: newItem });
  return response.data;
};

const update = async (id, updatedText) => {
  const response = await axios.put(`${baseUrl}/${id}`, { value: updatedText });
  return {
    id: response.data._id,
    value: response.data.value,
  };
};

const remove = async (id) => {
  try {
    if (!id) {
      throw new Error("Invalid or missing ID");
    }

    await axios.delete(`${baseUrl}/${id}`);
  } catch (error) {
    console.error("Error in remove function:", error.message);
    throw error; // rethrow the error to propagate it to the caller
  }
};

const todoService = { getAll, create, update, remove };

export default todoService;
