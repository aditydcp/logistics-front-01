import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidAirport } from "../../../utils/types/airports";

const table = 'airports'

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(table, id);
    if (data) {
      res.status(200).json({
        message: `GET airport with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Airport with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Airport schema
    if (!isValidAirport(body)) {
      res.status(400).json({
        message: 'Error updating airport',
        error: 'Request body does not match Airport data model'
      })
    }

    const { data, error } = await updateItem(table, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating airport with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT airport with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(table, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting airport with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE airport with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).end('Method Not Allowed')
  }
}