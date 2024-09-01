import { getAll, createItem } from "../../../utils/services/queries"
import { isValidReference, tableRoles } from "../../../utils/types/references";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(tableRoles)
    res.status(200).json({
      message: 'GET roles',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate Role schema
    if (!isValidReference(body)) {
      res.status(400).json({
        message: 'Error creating role',
        error: 'Request body does not match Role data model'
      })
    }

    const { data, error } = await createItem(tableRoles, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating role',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST role',
      data: data,
      error: error
    })
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}