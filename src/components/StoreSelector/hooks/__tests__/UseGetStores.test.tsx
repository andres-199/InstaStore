import { renderHook } from "@testing-library/react-hooks";
import UserSessionService from "../../../../services/userSession.service";
import OrderService from "../../../../pages/Order/services/order.service";
import Store from "../../../../interfaces/Store";
import { UseGetStores } from "../UseGetStores";

jest.mock("../../../../services/userSession.service");
jest.mock("../../../../pages/Order/services/order.service");

const mockGetSession = UserSessionService.getSession as jest.MockedFunction<
  typeof UserSessionService.getSession
>;
const mockGetStoresForOrder =
  OrderService.getStoresForOrder as jest.MockedFunction<
    typeof OrderService.getStoresForOrder
  >;

const mockStores: Store[] = [
  {
    id: "1",
    name: "Tienda 1",
    isOpen: true,
    coordinates: { lat: 10, long: 10 },
    nextDeliveryTime: 30,
  },
  {
    id: "2",
    name: "Tienda 2",
    isOpen: true,
    coordinates: { lat: 20, long: 20 },
    nextDeliveryTime: 15,
  },
];

describe("UseGetStores", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return stores sorted by nextDeliveryTime", async () => {
    mockGetSession.mockReturnValue({
      token: "mockToken",
      userId: "mockUserId",
    });
    mockGetStoresForOrder.mockResolvedValueOnce(mockStores);

    const { result, waitForNextUpdate } = renderHook(() =>
      UseGetStores("mockOrderId")
    );

    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.stores).toEqual([
      {
        id: "2",
        name: "Tienda 2",
        isOpen: true,
        coordinates: { lat: 20, long: 20 },
        nextDeliveryTime: 15,
      },
      {
        id: "1",
        name: "Tienda 1",
        isOpen: true,
        coordinates: { lat: 10, long: 10 },
        nextDeliveryTime: 30,
      },
    ]);
  });

  it("should handle errors correctly", async () => {
    mockGetSession.mockReturnValue({
      token: "mockToken",
      userId: "mockUserId",
    });
    const err = "Network error";
    mockGetStoresForOrder.mockRejectedValueOnce(new Error(err));

    const orderId = "mockOrderId";
    const { result, waitForNextUpdate } = renderHook(() =>
      UseGetStores(orderId)
    );

    expect(result.current.loading).toBe(true);

    await await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toMatch(new RegExp(orderId, "i"));
    expect(result.current.error).toMatch(new RegExp(err, "i"));
    expect(result.current.stores).toEqual([]);
  });

  it("should call getSession and getStoresForOrder with correct arguments", async () => {
    const mockSession = { token: "mockToken", userId: "mockUserId" };
    mockGetSession.mockReturnValue(mockSession);
    mockGetStoresForOrder.mockResolvedValueOnce(mockStores);

    const orderId = "mockOrderId--->>foo";
    const { waitForNextUpdate } = renderHook(() => UseGetStores(orderId));

    await waitForNextUpdate();

    expect(mockGetSession).toHaveBeenCalledTimes(1);
    expect(mockGetStoresForOrder).toHaveBeenCalledWith(mockSession, orderId);
  });
});
