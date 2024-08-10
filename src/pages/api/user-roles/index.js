import { getAll, createItem } from "../../../utils/services/queries"
import { isValidUserRole, table } from "../../../utils/types/user-roles"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET user roles',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate User schema
    if (!isValidUserRole(body)) {
      res.status(400).json({
        message: 'Error creating user role',
        error: 'Request body does not match User Role data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating user role',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST user role',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}