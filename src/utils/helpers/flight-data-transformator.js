import { packagingData } from "./placeholder-data";

export function transformFlightData(data) {
  return data.map(ticket => {
    const firstFlight = ticket.flights[0];
    const lastFlight = ticket.flights[ticket.flights.length - 1];

    return {
      id: ticket.ticket_id.toString(),
      airlines: ticket.flights.map(flight => ({
        id: flight.airline.id,
        name: flight.airline.name,
        logo: flight.airline.logo
      })),
      journeyDetails: {
        departure: {
          airport: ticket.departure_airport,
          time: new Date(ticket.departure_datetime).getTime()
        },
        arrival: {
          airport: ticket.arrival_airport,
          time: new Date(ticket.arrival_datetime).getTime()
        }
      },
      weightLimit: ticket.weight_limit,
      sizeLimit: ticket.size_limit,
      categories: ticket.category_references,
      categoriesData: ticket.categories,
      packagings: ticket.packaging_references,
      packagingData: ticket.packagings,
      legs: ticket.flights.map((flight, index) => ({
        airlineRef: index,
        airline: flight.airline,
        planeModel: flight.plane_model,
        weightLimit: flight.weight_limit,
        sizeLimit: flight.size_limit,
        categories: flight.category_references,
        categoriesData: flight.categories,
        packagings: flight.packaging_references,
        packagingData: flight.packagings,
        departure: {
          airport: flight.departure_airport,
          time: new Date(flight.departure_datetime).getTime()
        },
        arrival: {
          airport: flight.arrival_airport,
          time: new Date(flight.arrival_datetime).getTime()
        }
      })),
      price: JSON.parse(ticket.rates_json)[0].price,
      rates: JSON.parse(ticket.rates_json)
    };
  });
}