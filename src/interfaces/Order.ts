export default interface Order {
  id: string;
  client: string;
  deliveryAddress: string;
  coordinates: {
    lat: number;
    long: number;
  };
}
