import axios from "axios";

export async function getUsers() {
  try {
    const res = await axios.get(`http://localhost:3001/users/`);
    return res;
  } catch (error) {
    return error.response;
  }
}

export async function getUserById(userId) {
  try {
    const res = await axios.get(`http://localhost:3001/users/${userId}`);
    return res;
  } catch (error) {
    return error.response;
  }
}
