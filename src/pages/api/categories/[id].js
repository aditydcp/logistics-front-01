import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidReference, tableCategories } from "../../../utils/types/references";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(tableCategories, id);
    if (data) {
      res.status(200).json({
        message: `GET category with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Category with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Category schema
    if (!isValidReference(body)) {
      res.status(400).json({
        message: 'Error updating category',
        error: 'Request body does not match Category data model'
      })
    }

    const { data, error } = await updateItem(tableCategories, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating category with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT category with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(tableCategories, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting category with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE category with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}