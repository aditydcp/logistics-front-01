import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidFlightRate, table } from "../../../utils/types/flight-rates";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(table, id);
    if (data) {
      res.status(200).json({
        message: `GET flight rate with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Flight Rate with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Flight Rate schema
    if (!isValidFlightRate(body)) {
      res.status(400).json({
        message: 'Error updating flight rate',
        error: 'Request body does not match Flight Rate data model'
      })
    }

    const { data, error } = await updateItem(table, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating flight rate with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT flight rate with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(table, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting flight rate with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE flight rate with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).end('Method Not Allowed')
  }
}