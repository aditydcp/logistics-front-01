import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidReference, tableModules } from "../../../utils/types/references";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(tableModules, id);
    if (data) {
      res.status(200).json({
        message: `GET module with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Module with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Module schema
    if (!isValidReference(body)) {
      res.status(400).json({
        message: 'Error updating module',
        error: 'Request body does not match Module data model'
      })
    }

    const { data, error } = await updateItem(tableModules, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating module with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT module with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(tableModules, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting module with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE module with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}