import { renderHook } from "@testing-library/react-hooks";
import { UseGetOrders } from "../UseGetOrders";
import UserSessionService from "../../../../services/userSession.service";
import OrderService from "../../services/order.service";
import Order from "../../../../interfaces/Order";

jest.mock("../../../../services/userSession.service");
jest.mock("../../services/order.service");

const mockGetSession = UserSessionService.getSession as jest.MockedFunction<
  typeof UserSessionService.getSession
>;
const mockGetOrders = OrderService.getOrders as jest.MockedFunction<
  typeof OrderService.getOrders
>;

const mockOrders: Order[] = [
  {
    id: "1",
    client: "Client 1",
    deliveryAddress: "Address 1",
    coordinates: { lat: 0, long: 0 },
  },
  {
    id: "2",
    client: "Client 2",
    deliveryAddress: "Address 2",
    coordinates: { lat: 0, long: 0 },
  },
];

describe("UseGetOrders", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should set loading to true while fetching orders", async () => {
    mockGetSession.mockReturnValue({
      token: "mockToken",
      userId: "mockUserId",
    });
    mockGetOrders.mockResolvedValueOnce(mockOrders);

    const { result, waitForNextUpdate } = renderHook(() => UseGetOrders());

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
  });

  it("should return orders on successful fetch", async () => {
    mockGetSession.mockReturnValue({
      token: "mockToken",
      userId: "mockUserId",
    });
    mockGetOrders.mockResolvedValueOnce(mockOrders);

    const { result, waitForNextUpdate } = renderHook(() => UseGetOrders());

    await waitForNextUpdate();

    expect(result.current.orders).toEqual(mockOrders);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should handle errors correctly", async () => {
    const mockError = new Error("Network error");
    mockGetSession.mockReturnValue({
      token: "mockToken",
      userId: "mockUserId",
    });
    mockGetOrders.mockRejectedValueOnce(mockError);

    const { result, waitForNextUpdate } = renderHook(() => UseGetOrders());

    await waitForNextUpdate();

    expect(result.current.error).toBe("Failed to fetch orders Network error");
    expect(result.current.loading).toBe(false);
    expect(result.current.orders).toEqual([]);
  });

  it("should call getSession and getOrders with correct arguments", async () => {
    const mockSession = { token: "mockToken", userId: "mockUserId" };
    mockGetSession.mockReturnValue(mockSession);
    mockGetOrders.mockResolvedValueOnce(mockOrders);

    const { waitForNextUpdate } = renderHook(() => UseGetOrders());

    await waitForNextUpdate();

    expect(mockGetSession).toHaveBeenCalledTimes(1);
    expect(mockGetOrders).toHaveBeenCalledWith(mockSession);
  });
});
