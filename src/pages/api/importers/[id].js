import { getById, updateItem, deleteItem, upsertCompanyWithVerify } from "../../../utils/services/queries"
import { isValidCompany, tableImporters } from "../../../utils/types/companies";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(tableImporters, id);
    if (data) {
      res.status(200).json({
        message: `GET importer with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Importer with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req
    const { verify = false } = req.query

    // Validate Importer schema
    if (!isValidCompany(body)) {
      res.status(400).json({
        message: 'Error updating importer',
        error: 'Request body does not match Importer data model'
      })
    }

    const { data, error } = await upsertCompanyWithVerify(tableImporters, body, id, verify)
    if (error) {
      res.status(400).json({
        message: `Error updating importer with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT importer with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(tableImporters, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting importer with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE importer with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).end('Method Not Allowed')
  }
}