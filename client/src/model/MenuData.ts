import axios from "axios";

export async function getMenuCardsData() {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/menu/getAllMenu"
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMenuCardData(id: string) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/v1/menu/findMenuById/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
