import axios from "axios";
import UserSession from "../../../interfaces/UserSession";
import Order from "../../../interfaces/Order";
import { orders } from "./orders";
import Store from "../../../interfaces/Store";
import { stores } from "./stores";

/**
 * Please remove comments on each method to return hardcoded data
 * And comment to run tests
 */

const getOrders = async (userSession: UserSession) => {
  try {
    /* return orders; */
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

const getStoresForOrder = async (
  userSession: UserSession,
  orderId: string
): Promise<Store[]> => {
  try {
    /* return stores; */
    const url = `${process.env.REACT_APP_ORDER_API_URL}/api/orders/${orderId}/stores`;
    const response = await axios.get<Store[]>(url, {
      headers: {
        Authorization: `Bearer ${userSession.token}`,
        "User-Id": userSession.userId,
      },
    });
    return response.data;
  } catch (error: any) {
    const message = `Error obtaining stores for order ${orderId}: ${error.message}`;
    console.error(message);
    throw new Error(message);
  }
};

const assignStoreToOrder = async (
  userSession: UserSession,
  orderId: string,
  storeId: string
): Promise<void> => {
  try {
    /* return; */
    const url = `${process.env.REACT_APP_ORDER_API_URL}/api/orders/${orderId}/assign`;
    await axios.post(
      url,
      { storeId },
      {
        headers: {
          Authorization: `Bearer ${userSession.token}`,
          "User-Id": userSession.userId,
        },
      }
    );
  } catch (error: any) {
    const message = `Error assigning store ${storeId} to order ${orderId}: ${error.message}`;
    console.error(message);
    throw new Error(message);
  }
};

const OrderService = { getOrders, getStoresForOrder, assignStoreToOrder };

export default OrderService;
