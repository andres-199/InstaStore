import { useState, useEffect } from "react";
import UserSessionService from "../../../services/userSession.service";
import OrderService from "../../../pages/Order/services/order.service";
import Store from "../../../interfaces/Store";

const { getStoresForOrder } = OrderService;
const { getSession } = UserSessionService;

interface UseGetStoresState {}

export const UseGetStores = (orderId: string) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getStoresForOrder(getSession(), orderId)
      .then((_stores) =>
        setStores(
          _stores.sort((a, b) => a.nextDeliveryTime - b.nextDeliveryTime)
        )
      )
      .catch((error) => {
        const errorMessage = `Failed to fetch stores for order ${orderId} ${error.message}`;
        console.error(errorMessage);
        setError(errorMessage);
      })
      .finally(() => setLoading(false));
  }, []);

  return { error, loading, stores };
};
