import axios from "axios";
// import emailjs from "@emailjs/browser";

export const uploadImage = async (formData) => {
  const imgbbResult = await axios.post(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    formData
  );
  const photoUrl = imgbbResult.data.data.display_url;
  return photoUrl;
};

export const SaveUserInDb = async (user) => {
  const mongoDBSaveResult = await axios.post("/api/users", {
    ...user,
    role: "user",
  });
  return mongoDBSaveResult;
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
};

export const GetRole = async (user) => {
  try {
    const result = await axios.get(`/get-role/${user?.email}`);
    return result.data.role;
  } catch (err) {
  }
};

export const SendEmail = async (email, massage) => {
  // Set your email template parameters
  var templateParams = {
    to_name: "",
    from_name: "Your Name",
    recipient_email: email,
    message: massage || "your request is rejected",
  };

  // Send email using Email.js
  emailjs
    .send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TAMPLATE_ID,
      templateParams,
      import.meta.env.VITE_PUBLIC_KEY
    )
    .then(
      function (response) {
        console.log("Email sent successfully:", response);
      },
      function (error) {
        console.log("Email sending failed:", error);
      }
    );
};
