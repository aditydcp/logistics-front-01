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

export const airlinesData = [
  {
    id: '1',
    name: 'Malaysia Airlines',
    logo: '/assets/logos/airlines/logo-malaysiaairlines-square.png',
  },
  {
    id: '2',
    name: 'Citilink',
    logo: '/assets/logos/airlines/logo-citilink-square.png',
  },
  {
    id: '3',
    name: 'Garuda Indonesia',
    logo: '/assets/logos/airlines/logo-garudaindonesia-square.png',
  },
]

export const flightsData = [
  {
    id: '1',
    airlines: [airlinesData[0]],
    journeyDetails: {
      departure: {
        airport: airportsData[0],
        time: addDays(addHours(now, 6), 0).getTime(),
      },
      arrival: {
        airport: airportsData[1],
        time: addDays(addHours(now, 9), 0).getTime(),
      },
    },
    weightLimit: 1000,
    sizeLimit: 100,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
    legs: [
      {
        airlineRef: 0,
        planeModel: 'MH-360',
        weightLimit: 1000,
        sizeLimit: 100,
        categories: ['General Cargo', 'Special Cargo'],
        packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
        departure: {
          airport: airportsData[0],
          time: addDays(addHours(now, 6), 0).getTime(),
        },
        arrival: {
          airport: airportsData[1],
          time: addDays(addHours(now, 9), 0).getTime(),
        },
      },
    ],
    price: 55000,
  },
  {
    id: '2',
    airlines: [airlinesData[0]],
    journeyDetails: {
      departure: {
        airport: airportsData[1],
        time: addDays(addHours(now, 1), 0).getTime(),
      },
      arrival: {
        airport: airportsData[5],
        time: addDays(addHours(now, 17), 0).getTime(),
      },
    },
    weightLimit: 1000,
    sizeLimit: 100,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
    legs: [
      {
        airlineRef: 0,
        planeModel: 'MH-871',
        weightLimit: 1000,
        sizeLimit: 100,
        categories: ['General Cargo', 'Special Cargo'],
        packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
        departure: {
          airport: airportsData[1],
          time: addDays(addHours(now, 1), 0).getTime(),
        },
        arrival: {
          airport: airportsData[5],
          time: addDays(addHours(now, 17), 0).getTime(),
        },
      },
    ],
    price: 55000,
  },
  {
    id: '3',
    airlines: [airlinesData[1]],
    journeyDetails: {
      departure: {
        airport: airportsData[2],
        time: addDays(addHours(now, 2), 0).getTime(),
      },
      arrival: {
        airport: airportsData[5],
        time: addDays(addHours(now, 10), 0).getTime(),
      },
    },
    weightLimit: 350,
    sizeLimit: 100,
    categories: ['General Cargo', 'Mail Cargo'],
    packagings: ['Keranjang', 'Karton', 'Wooden Box'],
    legs: [
      {
        airlineRef: 0,
        planeModel: 'QG-252',
        weightLimit: 350,
        sizeLimit: 100,
        categories: ['General Cargo', 'Mail Cargo'],
        packagings: ['Keranjang', 'Karton', 'Wooden Box'],
        departure: {
          airport: airportsData[2],
          time: addDays(addHours(now, 2), 0).getTime(),
        },
        arrival: {
          airport: airportsData[5],
          time: addDays(addHours(now, 10), 0).getTime(),
        },
      },
    ],
    price: 50000,
  },
  {
    id: '4',
    airlines: [airlinesData[2]],
    journeyDetails: {
      departure: {
        airport: airportsData[0],
        time: addDays(addHours(now, 4), 0).getTime(),
      },
      arrival: {
        airport: airportsData[5],
        time: addDays(addHours(now, 7), 0).getTime(),
      },
    },
    weightLimit: 1500,
    sizeLimit: 100,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
    legs: [
      {
        airlineRef: 0,
        planeModel: 'GA-855',
        weightLimit: 1500,
        sizeLimit: 100,
        categories: ['General Cargo', 'Special Cargo'],
        packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
        departure: {
          airport: airportsData[0],
          time: addDays(addHours(now, 4), 0).getTime(),
        },
        arrival: {
          airport: airportsData[5],
          time: addDays(addHours(now, 7), 0).getTime(),
        },
      },
    ],
    price: 60000,
  },
  {
    id: '5',
    airlines: [airlinesData[2]],
    journeyDetails: {
      departure: {
        airport: airportsData[0],
        time: addDays(addHours(now, 7), 0).getTime(),
      },
      arrival: {
        airport: airportsData[2],
        time: addDays(addHours(now, 19), 0).getTime(),
      },
    },
    weightLimit: 1500,
    sizeLimit: 100,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
    legs: [
      {
        airlineRef: 0,
        planeModel: 'GA-837',
        weightLimit: 1500,
        sizeLimit: 100,
        categories: ['General Cargo', 'Special Cargo'],
        packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
        departure: {
          airport: airportsData[0],
          time: addDays(addHours(now, 7), 0).getTime(),
        },
        arrival: {
          airport: airportsData[2],
          time: addDays(addHours(now, 19), 0).getTime(),
        },
      },
    ],
    price: 60000,
  },
  {
    id: '6',
    airlines: [airlinesData[2]],
    journeyDetails: {
      departure: {
        airport: airportsData[2],
        time: addDays(addHours(now, 7), 0).getTime(),
      },
      arrival: {
        airport: airportsData[5],
        time: addDays(addHours(now, 13), 0).getTime(),
      },
    },
    weightLimit: 1500,
    sizeLimit: 100,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
    legs: [
      {
        airlineRef: 0,
        planeModel: 'GA-304',
        weightLimit: 1500,
        sizeLimit: 100,
        categories: ['General Cargo', 'Special Cargo'],
        packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
        departure: {
          airport: airportsData[2],
          time: addDays(addHours(now, 7), 0).getTime(),
        },
        arrival: {
          airport: airportsData[5],
          time: addDays(addHours(now, 13), 0).getTime(),
        },
      },
    ],
    price: 60000,
  },
  {
    id: '7',
    airlines: [airlinesData[1]],
    journeyDetails: {
      departure: {
        airport: airportsData[0],
        time: addDays(addHours(now, 4), 0).getTime(),
      },
      arrival: {
        airport: airportsData[2],
        time: addDays(addHours(now, 12), 0).getTime(),
      },
    },
    weightLimit: 350,
    sizeLimit: 250,
    categories: ['General Cargo', 'Mail Cargo'],
    packagings: ['Keranjang', 'Karton'],
    legs: [
      {
        airlineRef: 0,
        planeModel: 'QG-527',
        weightLimit: 350,
        sizeLimit: 250,
        categories: ['General Cargo', 'Mail Cargo'],
        packagings: ['Keranjang', 'Karton'],
        departure: {
          airport: airportsData[0],
          time: addDays(addHours(now, 4), 0).getTime(),
        },
        arrival: {
          airport: airportsData[2],
          time: addDays(addHours(now, 12), 0).getTime(),
        },
      },
    ],
    price: 50000,
  },
  {
    id: '8',
    airlines: [airlinesData[1]],
    journeyDetails: {
      departure: {
        airport: airportsData[0],
        time: addDays(addHours(now, 4), 0).getTime(),
      },
      arrival: {
        airport: airportsData[3],
        time: addDays(addHours(now, 16), 0).getTime(),
      },
    },
    weightLimit: 350,
    sizeLimit: 100,
    categories: ['General Cargo'],
    packagings: ['Keranjang', 'Karton'],
    legs: [
      {
        airlineRef: 0,
        planeModel: 'QG-527',
        weightLimit: 350,
        sizeLimit: 250,
        categories: ['General Cargo', 'Mail Cargo'],
        packagings: ['Keranjang', 'Karton'],
        departure: {
          airport: airportsData[0],
          time: addDays(addHours(now, 4), 0).getTime(),
        },
        arrival: {
          airport: airportsData[2],
          time: addDays(addHours(now, 12), 0).getTime(),
        },
      },
      {
        airlineRef: 0,
        planeModel: 'QG-577',
        weightLimit: 700,
        sizeLimit: 100,
        categories: ['General Cargo'],
        packagings: ['Keranjang', 'Karton', 'Wooden Box'],
        departure: {
          airport: airportsData[2],
          time: addDays(addHours(now, 14), 0).getTime(),
        },
        arrival: {
          airport: airportsData[2],
          time: addDays(addHours(now, 16), 0).getTime(),
        },
      },
    ],
    price: 60000,
  },
]