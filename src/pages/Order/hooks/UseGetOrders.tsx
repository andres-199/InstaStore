import { useState, useEffect } from "react";
import UserSessionService from "../../../services/userSession.service";
import Order from "../../../interfaces/Order";
import OrderService from "../services/order.service";

const { getOrders } = OrderService;
const { getSession } = UserSessionService;

export const UseGetOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const userSession = getSession();

  useEffect(() => {
    setLoading(true);
    getOrders(userSession)
      .then(setOrders)
      .catch((error) => {
        console.error(error);
        setError(`Failed to fetch orders ${error.message}`);
      })
      .finally(() => setLoading(false));
  }, []);

  return { error, loading, orders };
};
