import { getAll, createItem } from "../../../utils/services/queries"
import { isValidFlightTicket, table } from "../../../utils/types/flight-tickets"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET flight tickets',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate FlightTicket schema
    if (!isValidFlightTicket(body)) {
      res.status(400).json({
        message: 'Error creating flight ticket',
        error: 'Request body does not match Flight Ticket data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating flight ticket',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST flight ticket',
      data: data,
      error: error
    })
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}