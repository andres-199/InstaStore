import { renderHook, act } from "@testing-library/react-hooks";
import { UseAssignStore } from "../UseAssignStore";
import UserSessionService from "../../../../services/userSession.service";
import OrderService from "../../services/order.service";

jest.mock("../../../../services/userSession.service");
jest.mock("../../services/order.service");

const mockGetSession = UserSessionService.getSession as jest.MockedFunction<
  typeof UserSessionService.getSession
>;
const mockAssignStoreToOrder =
  OrderService.assignStoreToOrder as jest.MockedFunction<
    typeof OrderService.assignStoreToOrder
  >;

describe("UseAssignStore", () => {
  const mockUserSession = {
    token: "mockToken",
    userId: "mockUserId",
  };
  const order = "order";
  const store = "store";

  beforeEach(() => {
    mockGetSession.mockReturnValue(mockUserSession);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => UseAssignStore());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("should set loading to true and call assignStoreToOrder successfully", async () => {
    mockAssignStoreToOrder.mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => UseAssignStore());

    await act(async () => {
      await result.current.handleAssignStore(order, store);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockGetSession).toHaveBeenCalledTimes(1);
    expect(mockAssignStoreToOrder).toHaveBeenCalledWith(
      mockUserSession,
      order,
      store
    );
  });

  it("should set an error message when assignStoreToOrder fails", async () => {
    const errorMessage = "Network Error";
    mockAssignStoreToOrder.mockRejectedValueOnce(new Error(errorMessage));

    const { result } = renderHook(() => UseAssignStore());

    await act(async () => {
      await result.current.handleAssignStore(order, store);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(
      `Failed to assign store: ${errorMessage}`
    );
    expect(mockGetSession).toHaveBeenCalledTimes(1);
    expect(mockAssignStoreToOrder).toHaveBeenCalledWith(
      mockUserSession,
      order,
      store
    );
  });
});
