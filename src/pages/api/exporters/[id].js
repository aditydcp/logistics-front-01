import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidCompany, tableExporters } from "../../../utils/types/companies";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(tableExporters, id);
    if (data) {
      res.status(200).json({
        message: `GET exporter with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Exporter with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Exporter schema
    if (!isValidCompany(body)) {
      res.status(400).json({
        message: 'Error updating exporter',
        error: 'Request body does not match Exporter data model'
      })
    }

    const { data, error } = await updateItem(tableExporters, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating exporter with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT exporter with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(tableExporters, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting exporter with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE exporter with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).end('Method Not Allowed')
  }
}