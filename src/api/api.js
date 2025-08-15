import axios from "axios";

const apii = {
  calculateFuel: async (data) => {
    try {
      const API_URL = process.env.NODE_ENV === "production" ? "/api/calculate" : "http://localhost:3001/api/calculate";
      const response = await axios.post(API_URL, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке запроса:", error);
      throw error;
    }
  },
};

export default apii;