import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidReference, tablePackagings } from "../../../utils/types/references";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(tablePackagings, id);
    if (data) {
      res.status(200).json({
        message: `GET packaging with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Packaging with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Packaging schema
    if (!isValidReference(body)) {
      res.status(400).json({
        message: 'Error updating packaging',
        error: 'Request body does not match Packaging data model'
      })
    }

    const { data, error } = await updateItem(tablePackagings, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating packaging with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT packaging with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(tablePackagings, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting packaging with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE packaging with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}