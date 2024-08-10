import { getAll, createItem } from "../../../utils/services/queries"
import { isValidAirport } from "../../../utils/types/airports"

const table = 'airports'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET airports',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate Airport schema
    if (!isValidAirport(body)) {
      res.status(400).json({
        message: 'Error creating airport',
        error: 'Request body does not match Airport data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating airport',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST airport',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}