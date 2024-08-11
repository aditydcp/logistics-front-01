import { getAll, createItem } from "../../../utils/services/queries"
import { isValidUserLog, table } from "../../../utils/types/user-logs"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET user logs',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate User schema
    if (!isValidUserLog(body)) {
      res.status(400).json({
        message: 'Error creating user log',
        error: 'Request body does not match User Log data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating user log',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST user log',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}