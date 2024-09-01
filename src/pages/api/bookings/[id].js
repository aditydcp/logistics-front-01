import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidBooking, table } from "../../../utils/types/bookings";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(table, id);
    if (data) {
      res.status(200).json({
        message: `GET booking with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Booking with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Booking schema
    if (!isValidBooking(body)) {
      res.status(400).json({
        message: 'Error updating booking',
        error: 'Request body does not match Booking data model'
      })
    }

    const { data, error } = await updateItem(table, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating booking with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT booking with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(table, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting booking with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE booking with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}