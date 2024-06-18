import { addDays, addHours } from 'date-fns';
const now = new Date();

export const exporters = [
  { id: 1, name: 'Exporter A' },
  { id: 2, name: 'Exporter B' },
  { id: 3, name: 'Exporter C' },
  { id: 4, name: 'Exporter D' },
]

export const importers = [
  { id: 1, name: 'Importer A' },
  { id: 2, name: 'Importer B' },
  { id: 3, name: 'Importer C' },
  { id: 4, name: 'Importer D' },
]

export const categoriesData = [
  "General Cargo",
  "Special Cargo",
  "Live Animals",
  "Dangerous or Hazardous Cargo",
  "High-Value or Fragile Cargo",
  "Perishable Cargo",
  "Temperature-Controlled Cargo",
  "Mail Cargo",
  "Human Remains, Tissue and Organ Cargo",
]

export const packagingData = [
  "Keranjang",
  "Karton",
  "Palet",
  "Wooden Palet",
  "Wooden Box",
  "Koli",
]

export const airportsData = [
  {
    name: "Changi Intl",
    code: "SIN",
    city: "Singapore",
    country: "Singapura"
  },
  { 
    name: "Kuala Lumpur International Airport",
    code: "KUL",
    city: "Kuala Lumpur",
    country: "Malaysia"
  },
  { 
    name: "Soekarno Hatta International Airport",
    code: "CGK",
    city: "Jakarta",
    country: "Indonesia"
  },
  { 
    name: "Yogyakarta International Airport",
    code: "YIA",
    city: "Yogyakarta",
    country: "Indonesia"
  },
  { 
    name: "Adi Sutjipto",
    code: "YOG",
    city: "Yogyakarta",
    country: "Indonesia" 
  },
  { 
    name: "Juanda",
    code: "ADD",
    city: "Surabaya",
    country: "Indonesia"
  },
];

export const flightsData = [
  {
    id: '1',
    airline: 'Malaysia Airlines',
    airlineLogo: '/assets/logos/airlines/logo-malaysiaairlines-square.png',
    planeModel: 'MH-360',
    weightLimit: 1000,
    sizeLimit: 100,
    departure: {
      airport: airportsData[0],
      time: addDays(addHours(now, 6), 0).getTime(),
    },
    arrival: {
      airport: airportsData[1],
      time: addDays(addHours(now, 9), 0).getTime(),
    },
    price: 55000,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
  },
  {
    id: '2',
    airline: 'Malaysia Airlines',
    airlineLogo: '/assets/logos/airlines/logo-malaysiaairlines-square.png',
    planeModel: 'MH-871',
    weightLimit: 1000,
    sizeLimit: 100,
    departure: {
      airport: airportsData[1],
      time: addDays(addHours(now, 1), 0).getTime(),
    },
    arrival: {
      airport: airportsData[5],
      time: addDays(addHours(now, 17), 0).getTime(),
    },
    price: 55000,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
  },
  {
    id: '3',
    airline: 'Citilink',
    airlineLogo: '/assets/logos/airlines/logo-citilink-square.png',
    planeModel: 'QG-252',
    weightLimit: 350,
    sizeLimit: 100,
    departure: {
      airport: airportsData[2],
      time: addDays(addHours(now, 2), 0).getTime(),
    },
    arrival: {
      airport: airportsData[5],
      time: addDays(addHours(now, 10), 0).getTime(),
    },
    price: 50000,
    categories: ['General Cargo', 'Mail Cargo'],
    packagings: ['Keranjang', 'Karton', 'Wooden Box'],
  },
  {
    id: '4',
    airline: 'Garuda Indonesia',
    airlineLogo: '/assets/logos/airlines/logo-garudaindonesia-square.png',
    planeModel: 'GA-855',
    weightLimit: 1500,
    sizeLimit: 100,
    departure: {
      airport: airportsData[0],
      time: addDays(addHours(now, 4), 0).getTime(),
    },
    arrival: {
      airport: airportsData[5],
      time: addDays(addHours(now, 7), 0).getTime(),
    },
    price: 60000,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
  },
  {
    id: '5',
    airline: 'Garuda Indonesia',
    airlineLogo: '/assets/logos/airlines/logo-garudaindonesia-square.png',
    planeModel: 'GA-837',
    weightLimit: 1500,
    sizeLimit: 100,
    departure: {
      airport: airportsData[0],
      time: addDays(addHours(now, 7), 0).getTime(),
    },
    arrival: {
      airport: airportsData[2],
      time: addDays(addHours(now, 19), 0).getTime(),
    },
    price: 60000,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
  },
  {
    id: '6',
    airline: 'Garuda Indonesia',
    airlineLogo: '/assets/logos/airlines/logo-garudaindonesia-square.png',
    planeModel: 'GA-304',
    weightLimit: 1500,
    sizeLimit: 100,
    departure: {
      airport: airportsData[2],
      time: addDays(addHours(now, 7), 0).getTime(),
    },
    arrival: {
      airport: airportsData[5],
      time: addDays(addHours(now, 13), 0).getTime(),
    },
    price: 60000,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
  },
  {
    id: '7',
    airline: 'Citilink',
    airlineLogo: '/assets/logos/airlines/logo-citilink-square.png',
    planeModel: 'QG-527',
    weightLimit: 350,
    sizeLimit: 100,
    departure: {
      airport: airportsData[0],
      time: addDays(addHours(now, 4), 0).getTime(),
    },
    arrival: {
      airport: airportsData[2],
      time: addDays(addHours(now, 12), 0).getTime(),
    },
    price: 50000,
    categories: ['General Cargo', 'Mail Cargo'],
    packagings: ['Keranjang', 'Karton', 'Wooden Box'],
  },
]