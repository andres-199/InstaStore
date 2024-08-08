import axios from "axios";
import UserSession from "../../../interfaces/UserSession";
import Order from "../../../interfaces/Order";
import { orders } from "./orders";

const getOrders = async (userSession: UserSession) => {
  try {
    return orders;
    const url = `${process.env.REACT_APP_ORDER_API_URL}/api/orders`;
    const response = await axios.get<Order[]>(url, {
      headers: {
        Authorization: `Bearer ${userSession.token}`,
        "User-Id": userSession.userId,
      },
    });
    return response.data;
  } catch (error: any) {
    const message = `Error obtaining orders ${error.message}`;
    console.error(message);
    throw new Error(message);
  }
};

const OrderService = { getOrders };

export default OrderService;
