import { getById, updateItem, deleteItem } from "../../../../../utils/services/queries";
import { isValidFlightReference, table } from "../../../../../utils/types/flight-references";

const refType = 'packaging'

export default async function handler(req, res) {
  const { id, refId } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(table, refId);
    if (data) {
      res.status(200).json({
        message: `GET packaging from flight with id ${refId}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Packaging with id ${refId} from flight not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    body.flight_id = id
    body.ref_type = refType

    // Validate Packaging schema
    if (!isValidFlightReference(body)) {
      res.status(400).json({
        message: 'Error updating packaging from flight',
        error: 'Request body does not match Flight Reference data model'
      })
    }

    const { data, error } = await updateItem(table, refId, body);
    if (error) {
      res.status(400).json({
        message: `Error updating packaging from flight with id ${refId}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT packaging from flight with id ${refId}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(table, refId);
    if (error) {
      res.status(400).json({
        message: `Error deleting packaging from flight with id ${refId}`,
        error: error
      })
    }
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}