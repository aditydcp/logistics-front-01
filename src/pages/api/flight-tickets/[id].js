import { getById, updateItem, deleteItem, searchFlightById } from "../../../utils/services/queries"
import { isValidFlightTicket, table } from "../../../utils/types/flight-tickets"

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await searchFlightById(id);
    if (data) {
      res.status(200).json({
        message: `GET flight ticket with id ${id}`,
        data: data,
        error: error
      })
    } else if (error) {
      res.status(400).json({
        message: `Error fetching flight ticket`,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Flight Ticket with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate FlightTicket schema
    if (!isValidFlightTicket(body)) {
      res.status(400).json({
        message: 'Error updating flight ticket',
        error: 'Request body does not match Flight Ticket data model'
      })
    }

    const { data, error } = await updateItem(table, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating flight ticket with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT flight ticket with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(table, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting flight ticket with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE flight ticket with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}