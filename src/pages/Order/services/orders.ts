export const orders = [
  {
    id: "order-1234",
    client: "Juan Pérez",
    deliveryAddress: "Calle 123 # 45-67, Bogotá, Colombia",
  },
  {
    id: "order-5678",
    client: "María López",
    deliveryAddress: "Carrera 78 # 12-34, Bogotá, Colombia",
  },
  {
    id: "order-9012",
    client: "Pedro Gómez",
    deliveryAddress: "Avenida 45 # 56-78, Bogotá, Colombia",
  },
  {
    id: "order-3456",
    client: "Ana Rodríguez",
    deliveryAddress: "Calle 89 # 10-12, Bogotá, Colombia",
  },
  {
    id: "order-7890",
    client: "Carlos Sánchez",
    deliveryAddress: "Carrera 23 # 45-67, Bogotá, Colombia",
  },
  {
    id: "order-2345",
    client: "Sofía Martínez",
    deliveryAddress: "Avenida 78 # 12-34, Bogotá, Colombia",
  },
  {
    id: "order-6789",
    client: "Javier Ramírez",
    deliveryAddress: "Calle 45 # 56-78, Bogotá, Colombia",
  },
  {
    id: "order-0123",
    client: "Luisa Fernández",
    deliveryAddress: "Carrera 89 # 10-12, Bogotá, Colombia",
  },
  {
    id: "order-4567",
    client: "Miguel Hernández",
    deliveryAddress: "Avenida 23 # 45-67, Bogotá, Colombia",
  },
  {
    id: "order-8901",
    client: "Valeria Gutiérrez",
    deliveryAddress: "Calle 78 # 12-34, Bogotá, Colombia",
  },
  {
    id: "order-2109",
    client: "Sebastián Molina",
    deliveryAddress: "Carrera 45 # 56-78, Bogotá, Colombia",
  },
  {
    id: "order-6782",
    client: "Gabriela Reyes",
    deliveryAddress: "Avenida 89 # 10-12, Bogotá, Colombia",
  },
  {
    id: "order-0125",
    client: "Diego Soto",
    deliveryAddress: "Calle 23 # 45-67, Bogotá, Colombia",
  },
  {
    id: "order-4569",
    client: "Camila Herrera",
    deliveryAddress: "Carrera 78 # 12-34, Bogotá, Colombia",
  },
  {
    id: "order-8903",
    client: "Santiago Rojas",
    deliveryAddress: "Avenida 45 # 56-78, Bogotá, Colombia",
  },
  {
    id: "order-2101",
    client: "Isabel Gómez",
    deliveryAddress: "Calle 89 # 10-12, Bogotá, Colombia",
  },
  {
    id: "order-6785",
    client: "Andrés Martínez",
    deliveryAddress: "Carrera 23 # 45-67, Bogotá, Colombia",
  },
  {
    id: "order-0127",
    client: "Juliana Ramírez",
    deliveryAddress: "Avenida 78 # 12-34, Bogotá, Colombia",
  },
  {
    id: "order-4561",
    client: "Mateo Fernández",
    deliveryAddress: "Calle 45 # 56-78, Bogotá, Colombia",
  },
  {
    id: "order-8905",
    client: "Sofía Gutiérrez",
    deliveryAddress: "Carrera 89 # 10-12, Bogotá, Colombia",
  },
  {
    id: "order-2103",
    client: "Sebastián Soto",
    deliveryAddress: "Avenida 23 # 45-67, Bogotá, Colombia",
  },
  {
    id: "order-6787",
    client: "Gabriela Herrera",
    deliveryAddress: "Calle 78 # 12-34, Bogotá, Colombia",
  },
  {
    id: "order-0129",
    client: "Diego Rojas",
    deliveryAddress: "Carrera 45 # 56-78, Bogotá, Colombia",
  },
  {
    id: "order-4563",
    client: "Camila Gómez",
    deliveryAddress: "Avenida 89 # 10-12, Bogotá, Colombia",
  },
  {
    id: "order-8907",
    client: "Santiago Martínez",
    deliveryAddress: "Calle 23 # 45-67, Bogotá, Colombia",
  },
  {
    id: "order-2105",
    client: "Isabel Ramírez",
    deliveryAddress: "Carrera 78 # 12-34, Bogotá, Colombia",
  },
  {
    id: "order-6789",
    client: "Andrés Fernández",
    deliveryAddress: "Avenida 45 # 56-78, Bogotá, Colombia",
  },
  {
    id: "order-0131",
    client: "Juliana Gutiérrez",
    deliveryAddress: "Calle 89 # 10-12, Bogotá, Colombia",
  },
  {
    id: "order-4565",
    client: "Mateo Soto",
    deliveryAddress: "Carrera 23 # 45-67, Bogotá, Colombia",
  },
  {
    id: "order-8909",
    client: "Sofía Herrera",
    deliveryAddress: "Avenida 78 # 12-34, Bogotá, Colombia",
  },
].map((order, i) => ({ ...order, id: `${order.id}-${i}` }));
