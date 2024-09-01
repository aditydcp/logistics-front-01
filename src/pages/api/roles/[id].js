import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidReference, tableRoles } from "../../../utils/types/references";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(tableRoles, id);
    if (data) {
      res.status(200).json({
        message: `GET role with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Role with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Role schema
    if (!isValidReference(body)) {
      res.status(400).json({
        message: 'Error updating role',
        error: 'Request body does not match Role data model'
      })
    }

    const { data, error } = await updateItem(tableRoles, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating role with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT role with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(tableRoles, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting role with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE role with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}