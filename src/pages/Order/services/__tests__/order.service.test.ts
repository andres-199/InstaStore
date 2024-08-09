import axios from "axios";
import OrderService from "../order.service";
import UserSession from "../../../../interfaces/UserSession";
import Order from "../../../../interfaces/Order";
import Store from "../../../../interfaces/Store";

jest.mock("axios");

const mockAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>;
const mockAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>;
const mockUserSession: UserSession = {
  token: "mockToken",
  userId: "mockUserId",
};

const mockOrders: Order[] = [
  {
    id: "order1",
    client: "Client 1",
    deliveryAddress: "Address 1",
    coordinates: { lat: 1.1, long: 1.1 },
  },
  {
    id: "order2",
    client: "Client 2",
    deliveryAddress: "Address 2",
    coordinates: { lat: 1.1, long: 1.1 },
  },
];

const mockStores: Store[] = [
  {
    id: "store1",
    name: "Store 1",
    isOpen: true,
    coordinates: { lat: 1.1, long: 1.1 },
    nextDeliveryTime: 30,
  },
  {
    id: "store2",
    name: "Store 2",
    isOpen: false,
    coordinates: { lat: 2.2, long: 2.2 },
    nextDeliveryTime: 45,
  },
];

describe("OrderService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getOrders", () => {
    it("should return orders on successful API call", async () => {
      mockAxiosGet.mockResolvedValueOnce({ data: mockOrders });

      const result = await OrderService.getOrders(mockUserSession);

      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${process.env.REACT_APP_ORDER_API_URL}/api/orders`,
        {
          headers: {
            Authorization: `Bearer ${mockUserSession.token}`,
            "User-Id": mockUserSession.userId,
          },
        }
      );
      expect(result).toEqual(mockOrders);
    });

    it("should throw an error when the API request fails", async () => {
      const errorMessage = "Network Error";
      jest.spyOn(console, "error").mockImplementation(() => {});
      mockAxiosGet.mockRejectedValueOnce(new Error(errorMessage));

      await expect(OrderService.getOrders(mockUserSession)).rejects.toThrow(
        `Error obtaining orders ${errorMessage}`
      );
      expect(console.error).toHaveBeenCalledWith(
        `Error obtaining orders ${errorMessage}`
      );
    });
  });

  describe("getStoresForOrder", () => {
    const orderId = "order1";

    it("should return stores for the given order on successful API call", async () => {
      mockAxiosGet.mockResolvedValueOnce({ data: mockStores });

      const result = await OrderService.getStoresForOrder(
        mockUserSession,
        orderId
      );

      expect(mockAxiosGet).toHaveBeenCalledWith(
        `${process.env.REACT_APP_ORDER_API_URL}/api/orders/${orderId}/stores`,
        {
          headers: {
            Authorization: `Bearer ${mockUserSession.token}`,
            "User-Id": mockUserSession.userId,
          },
        }
      );
      expect(result).toEqual(mockStores);
    });

    it("should throw an error when the API request fails", async () => {
      const errorMessage = "Network Error";
      jest.spyOn(console, "error").mockImplementation(() => {});
      mockAxiosGet.mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        OrderService.getStoresForOrder(mockUserSession, orderId)
      ).rejects.toThrow(
        `Error obtaining stores for order ${orderId}: ${errorMessage}`
      );
      expect(console.error).toHaveBeenCalledWith(
        `Error obtaining stores for order ${orderId}: ${errorMessage}`
      );
    });
  });

  describe("assignStoreToOrder", () => {
    const orderId = "order1";
    const storeId = "store1";

    it("should assign a store to the order on successful API call", async () => {
      mockAxiosPost.mockResolvedValueOnce({});

      await OrderService.assignStoreToOrder(mockUserSession, orderId, storeId);

      expect(mockAxiosPost).toHaveBeenCalledWith(
        `${process.env.REACT_APP_ORDER_API_URL}/api/orders/${orderId}/assign`,
        { storeId },
        {
          headers: {
            Authorization: `Bearer ${mockUserSession.token}`,
            "User-Id": mockUserSession.userId,
          },
        }
      );
    });

    it("should throw an error when the API request fails", async () => {
      const errorMessage = "Network Error";
      jest.spyOn(console, "error").mockImplementation(() => {});
      mockAxiosPost.mockRejectedValueOnce(new Error(errorMessage));

      await expect(
        OrderService.assignStoreToOrder(mockUserSession, orderId, storeId)
      ).rejects.toThrow(
        `Error assigning store ${storeId} to order ${orderId}: ${errorMessage}`
      );
      expect(console.error).toHaveBeenCalledWith(
        `Error assigning store ${storeId} to order ${orderId}: ${errorMessage}`
      );
    });
  });
});
