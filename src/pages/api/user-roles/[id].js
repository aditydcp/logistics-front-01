import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidUserRole, table } from "../../../utils/types/user-roles";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(table, id);
    if (data) {
      res.status(200).json({
        message: `GET user role with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `User role with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate User role schema
    if (!isValidUserRole(body)) {
      res.status(400).json({
        message: 'Error updating user role',
        error: 'Request body does not match User Role data model'
      })
    }

    const { data, error } = await updateItem(table, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating user role with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT user role with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(table, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting user role with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE user role with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).end('Method Not Allowed')
  }
}