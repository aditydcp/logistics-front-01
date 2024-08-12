import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidFlight, table } from "../../../utils/types/flights";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(table, id);
    if (data) {
      res.status(200).json({
        message: `GET flight with id ${id}`,
        data: data,
        error: error
      })
    } else if (error) {
      res.status(400).json({
        message: `Error fetching flight`,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Flight with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Flight schema
    if (!isValidFlight(body)) {
      res.status(400).json({
        message: 'Error updating flight',
        error: 'Request body does not match Flight data model'
      })
    }

    const { data, error } = await updateItem(table, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating flight with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT flight with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(table, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting flight with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE flight with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).end('Method Not Allowed')
  }
}