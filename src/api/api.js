import axios from "axios";

const apii = {
  calculateFuel: async (data) => {
    try {
      const response = await axios.post("/api/calculate", data, {
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