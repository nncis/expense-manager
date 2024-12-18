// const users = [
//   {
//     id: '410544b2-4001-4271-9855-fec4b6a6442a',
//     name: 'User',
//     email: 'user@nextmail.com',
//     password: '123456',
//   },
// ];

const users = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Lucy',
    email: 'lucy@gmail.com',
    password: '123456',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Olivia',
    email: 'olivia@gmail.com',
    password: '123456',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Negra',
    email: 'negrita@gmail.com',
    password: '123456',
  },
];

const expenses = [
  {
    id: "80f5ae6b-8f9e-4a61-8e7c-26d8d2c9c8a1",
    category: "Bakery",
    amount: 5,
    date: '2024-11-10',
    userId: users[0].id,
  },
  {
    id: "6e6b67a1-9c1e-4e41-aacd-65d7fbc82b4f",
    category: "Greengrocery",
    amount: 2.50,
    date: '2024-11-10',
    userId: users[0].id,
  },
  {
    id: "3c38c6e9-c154-4d11-a6ab-3f9a8912d2f2",
    category: "Greengrocery",
    amount: 3.75,
    date: '2024-11-11',
    userId: users[0].id,
  },
  {
    id: "4b90ed32-7f8e-4b9d-8c13-d8c7e5f627b1",
    category: "Bakery",
    amount: 7.50,
    date: '2024-11-12',
    userId: users[0].id,
  },
  {
    id: "2d15be61-6163-42ff-8b15-07dce0a6cf32",
    category: "Bakery",
    amount: 2.75,
    date: '2024-11-13',
    userId: users[0].id,
  },
  {
    id: "7e92793f-3f5a-4b78-97e3-c682cb49a8f4",
    category: "Greengrocery",
    amount: 6.50,
    date: '2024-11-14',
    userId: users[0].id,
  },
  {
    id: "f6f76d42-b31c-462e-8ef2-7bd5f8bdb8cc",
    category: "Greengrocery",
    amount: 3.50,
    date: '2024-11-15',
    userId: users[0].id,
  },
  {
    id: "c1a2f6ad-938d-450c-b479-2c7a26e6b6af",
    category: "Bakery",
    amount: 4.0,
    date: '2024-11-16',
    userId: users[0].id,
  },
  {
    id: "5b2e637a-7554-11ec-90d6-0242ac120003",
    category: "Green Grocery",
    amount: 2,
    date: '2024-11-16',
    userId: users[0].id,
  },
  {
    id: "6bc2d8f4-8c61-4c37-a1f3-bfe5c348bbcc",
    category: "Butcher Shop",
    amount: 9,
    date: '2024-11-29',
    userId: users[1].id,
  },
  {
    id: "704b8a8a-e1ab-4033-b01d-fb9d8c4e1537",
    category: "Barber Shop",
    amount: 5,
    date: '2024-11-14',
    userId: users[1].id,
  },
  {
    id: "943fd6f8-e8cb-4627-bb78-276bfc5de8b7",
    category: "Clothing Store",
    amount: 50,
    date: '2024-11-06',
    userId: users[2].id,
  },
];

export {users, expenses}