import { PrismaClient } from '@prisma/client'
// const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()
async function main() {
  // insert Airports
  const changiAirport = await prisma.airport.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Changi Intl',
      code: 'SIN',
      city: 'Singapore',
      country: 'Singapura',
    },
  })
  const klAirport = await prisma.airport.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Kuala Lumpur International Airport",
    code: "KUL",
    city: "Kuala Lumpur",
    country: "Malaysia"
    },
  })
  const cgkAirport = await prisma.airport.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Soekarno Hatta International Airport",
    code: "CGK",
    city: "Jakarta",
    country: "Indonesia"
    },
  })
  const yogyakartaAirport = await prisma.airport.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Yogyakarta International Airport",
    code: "YIA",
    city: "Yogyakarta",
    country: "Indonesia"
    },
  })
  const adisutjiptoAirport = await prisma.airport.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "Adi Sutjipto",
    code: "YOG",
    city: "Yogyakarta",
    country: "Indonesia"
    },
  })
  const juandaAirport = await prisma.airport.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "Juanda",
    code: "ADD",
    city: "Surabaya",
    country: "Indonesia"
    },
  })

  // insert Airlines
  const malayAirlines = await prisma.airline.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Malaysia Airlines',
    logo: '/assets/logos/airlines/logo-malaysiaairlines-square.png',
    },
  })
  const citilinkAirlines = await prisma.airline.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Citilink',
    logo: '/assets/logos/airlines/logo-citilink-square.png',
    },
  })
  const garudaAirlines = await prisma.airline.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Garuda Indonesia',
    logo: '/assets/logos/airlines/logo-garudaindonesia-square.png',
    },
  })

  // insert Flights


  console.log({
    airports: [changiAirport, klAirport, cgkAirport, yogyakartaAirport, adisutjiptoAirport, juandaAirport],
    airlines: [malayAirlines, citilinkAirlines, garudaAirlines],
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })