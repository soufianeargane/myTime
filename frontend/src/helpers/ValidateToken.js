import axiosInstance from "../api/axiosInstance";

const ValidateToken = async () => {
  try {
    const response = await axiosInstance.get("/auth/validate-token");
    return response.data;
  } catch (error) {
    console.log(error)
    return { error: "Error validating token ssss" };
  }
};

export default ValidateToken;
