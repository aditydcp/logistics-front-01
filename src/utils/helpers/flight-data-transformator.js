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
      packagings: ticket.packaging_references,
      legs: ticket.flights.map(flight => ({
        airlineRef: flight.airline.id - 1,
        planeModel: flight.plane_model,
        weightLimit: flight.weight_limit,
        sizeLimit: flight.size_limit,
        categories: ticket.category_references,
        packagings: ticket.packaging_references,
        departure: {
          airport: ticket.departure_airport,
          time: new Date(flight.departure_datetime).getTime()
        },
        arrival: {
          airport: ticket.arrival_airport,
          time: new Date(flight.arrival_datetime).getTime()
        }
      })),
      price: JSON.parse(ticket.rates_json)[0].price,
      rates: JSON.parse(ticket.rates_json)
    };
  });
}