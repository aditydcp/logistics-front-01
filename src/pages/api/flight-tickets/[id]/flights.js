import { getByField, createItem } from "../../../../utils/services/queries"
import { isValidFlightTicketFlight, table } from "../../../../utils/types/flight-ticket-flights"

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getByField(table, 'flight_ticket_id', id)
    res.status(200).json({
      message: 'GET flights from flight ticket',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Alter body to include flight ticket id
    body.flight_ticket_id = id

    const { flightsData, flightsDataError } = await getByField(table, 'flight_ticket_id', id)

    // if sequence is not provided, set it to the last sequence + 1
    if (!body.sequence) {
      // if error finding flights, set sequence to 1
      if (flightsDataError) {
        body.sequence = 1
      }
      // else find the last sequence
      else {
        body.sequence = flightsData.reduce((max, flight) => {
          return flight.sequence > max ? flight.sequence : max
        }, 0) + 1
      }
    }

    // Validate FlightTicket schema
    if (!isValidFlightTicketFlight(body)) {
      res.status(400).json({
        message: 'Error creating flight for flight ticket',
        error: 'Request body does not match FlightTicket-Flight data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating flight for flight ticket',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST flight for flight ticket',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}