import axios from "../utils/axios";
const giveFeedback = async (formData, navigate) => {
  const body = JSON.stringify(formData);
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  try {
    const res = await axios.post("/student/feedback", body, config);
    console.log(res);
    navigate("/student/recentTests");
  } catch (e) {
    console.log(e);
  }
};

export default giveFeedback;
