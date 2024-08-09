import { useState } from "react";
import UserSessionService from "../../../services/userSession.service";
import OrderService from "../services/order.service";

const { assignStoreToOrder } = OrderService;
const { getSession } = UserSessionService;

export const UseAssignStore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAssignStore = async (orderId: string, storeId: string) => {
    setLoading(true);
    setError(null);

    try {
      const userSession = getSession();
      await assignStoreToOrder(userSession, orderId, storeId);
    } catch (err: any) {
      const errorMessage = `Failed to assign store: ${err.message}`;
      console.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { handleAssignStore, loading, error };
};
