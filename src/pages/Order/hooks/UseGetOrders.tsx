import { useState, useEffect } from "react";
import UserSessionService from "../../../services/userSession.service";
import Order from "../../../interfaces/Order";
import OrderService from "../services/order.service";

const { getOrders } = OrderService;
const { getSession } = UserSessionService;

export const UseGetOrders = (pollingInterval = 10000) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = (witLoading = false) => {
    if (witLoading) {
      setLoading(true);
    }
    getOrders(getSession())
      .then(setOrders)
      .catch((error) => {
        const message = `Failed to fetch orders ${error.message}`;
        console.error(message);
        setError(message);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders(true);
    const intervalId = setInterval(fetchOrders, pollingInterval);
    return () => clearInterval(intervalId);
  }, [pollingInterval]);

  return { error, loading, orders, fetchOrders };
};
