export default interface Store {
  id: string;
  name: string;
  isOpen: boolean;
  coordinates: {
    lat: number;
    long: number;
  };
  nextDeliveryTime: number;
}
