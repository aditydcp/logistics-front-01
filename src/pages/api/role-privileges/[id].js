import { getById, updateItem, deleteItem } from "../../../utils/services/queries"
import { isValidRolePriviledge, table } from "../../../utils/types/role-privileges";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(table, id);
    if (data) {
      res.status(200).json({
        message: `GET role priviledge with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Role Priviledge with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { body } = req

    // Validate Role Priviledge schema
    if (!isValidRolePriviledge(body)) {
      res.status(400).json({
        message: 'Error updating role priviledge',
        error: 'Request body does not match Role Priviledge data model'
      })
    }

    const { data, error } = await updateItem(table, id, body);
    if (error) {
      res.status(400).json({
        message: `Error updating role priviledge with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT role priviledge with id ${id}`,
      data: data,
      error: error
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(table, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting role priviledge with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `DELETE role priviledge with id ${id}`,
      data: data,
      error: error
  });
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}