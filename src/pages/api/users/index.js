import { getAll, createItem } from "../../../utils/services/queries"
import { isValidUser, table } from "../../../utils/types/users"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET users',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate User schema
    if (!isValidUser(body)) {
      res.status(400).json({
        message: 'Error creating user',
        error: 'Request body does not match User data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating user',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST user',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}