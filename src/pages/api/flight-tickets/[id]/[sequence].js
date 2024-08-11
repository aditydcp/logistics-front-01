import { updateItem, deleteItem, getByFields } from "../../../../utils/services/queries"
import { isValidFlightTicketFlight, table } from "../../../../utils/types/flight-ticket-flights"

export default async function handler(req, res) {
  const { id, sequence } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getByFields(table, {'flight_ticket_id': id});

    if (error) {
      res.status(404).json({
        message: `Flight from flight ticket with id ${id} not found`,
        error: error
      })
    }

    // get flight with given sequence
    const flight = data.find(flight => flight.sequence === sequence);

    if (flight) {
      res.status(200).json({
        message: `GET flight from flight ticket with id ${id}`,
        data: flight,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Flight from flight ticket with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Flight schema
    if (!isValidFlightTicketFlight(body)) {
      res.status(400).json({
        message: 'Error updating flight from flight ticket',
        error: 'Request body does not match FlightTicket-Flight data model'
      })
    }

    const { flightTicketFlightsData, flightTicketFlightsDataError } = await getByFields(table, {'flight_ticket_id': id});

    if (flightTicketFlightsDataError) {
      res.status(400).json({
        message: `Error updating flight from flight ticket with id ${id}`,
        error: error
      })
    }

    // get flight with given sequence
    const flight = flightTicketFlightsData.find(flight => flight.sequence === sequence);

    if (!flight) {
      res.status(404).json({
        message: `Flight from flight ticket with id ${id} not found`,
        error: error
      })
    }

    const { data, error } = await updateItem(table, flight.id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating flight from flight ticket with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT flight from flight ticket with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { flightTicketFlightsData, flightTicketFlightsDataError } = await getByFields(table, {'flight_ticket_id': id});

    if (flightTicketFlightsDataError) {
      res.status(400).json({
        message: `Error deleting flight from flight ticket with id ${id}`,
        error: error
      })
    }

    // get flight with given sequence
    const flight = flightTicketFlightsData.find(flight => flight.sequence === sequence);

    if (!flight) {
      res.status(404).json({
        message: `Flight from flight ticket with id ${id} not found`,
        error: error
      })
    }

    const { data, error } = await deleteItem(table, flight.id);
    if (error) {
      res.status(400).json({
        message: `Error deleting flight from flight ticket with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE flight from flight ticket with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).end('Method Not Allowed')
  }
}