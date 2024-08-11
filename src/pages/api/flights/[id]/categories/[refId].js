import { getById, updateItem, deleteItem } from "../../../../../utils/services/queries";
import { isValidFlightReference, table } from "../../../../../utils/types/flight-references";

export default async function handler(req, res) {
  const { id, refId } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(table, refId);
    if (data) {
      res.status(200).json({
        message: `GET category from flight with id ${refId}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Category with id ${refId} from flight not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    body.flight_id = id
    body.ref_type = 'category'

    // Validate Category schema
    if (!isValidFlightReference(body)) {
      res.status(400).json({
        message: 'Error updating category from flight',
        error: 'Request body does not match Flight Reference data model'
      })
    }

    const { data, error } = await updateItem(table, refId, body);
    if (error) {
      res.status(400).json({
        message: `Error updating category from flight with id ${refId}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT category from flight with id ${refId}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(table, refId);
    if (error) {
      res.status(400).json({
        message: `Error deleting category from flight with id ${refId}`,
        error: error
      })
    }
  } else {
    res.status(405).end('Method Not Allowed')
  }
}