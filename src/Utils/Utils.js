import axios from "axios";
// import emailjs from "@emailjs/browser";
const jwt = require("jsonwebtoken");


export const uploadImage = async (formData) => {
  const imgbbResult = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    formData
  );
  const photoUrl = imgbbResult.data.data.display_url;
  return photoUrl;
};

export const SaveUserInDb = async (user) => {
  const res = await axios.get(`/api/users?email=${user.email}`);
  const userInDB = res.data;
  if (!userInDB) {
    const mongoDBSaveResult = await axios.post("/api/users", {
      ...user,
      role: "user",
    });
    return mongoDBSaveResult;
  }
};

export const UpdateUserMongoDB = async (user) => {
  const userUpdateResult = await axios.put("/users", {
    ...user,
    status: "pending",
  });
  return userUpdateResult;
};

export const GetToken = async (email) => {
  const res = await axios.get(`/api/token/${email}`);
  const data = res.data;
  localStorage.setItem("token", data.token);
};

export const GetRole = async (user) => {
  try {
    const result = await axios.get(`/api/get-role?email=${user?.email}`);
    return result.data.role;
  } catch (err) {}
};

export const VerifyToken = async (req) => {
  let isVerify = false;
  try {
    const token = req.headers.get("Token");
    const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET);
    if (decoded) {
      req.userEmail = decoded.email;
      isVerify = true;
    } else {
      isVerify = false;
    }
  } catch (err) {
    isVerify = false;
  }
  return isVerify;
};

export const VerifyAdmin = async (req) => {
  if (req.userEmail === "mdsayel111@gmail.com") {
    return true;
  }
  return false;
};
