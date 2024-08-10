import { getAll, createItem } from "../../../utils/services/queries"
import { isValidAirline, table } from "../../../utils/types/airlines"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET airlines',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate Airline schema
    if (!isValidAirline(body)) {
      res.status(400).json({
        message: 'Error creating airline',
        error: 'Request body does not match Airline data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating airline',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST airline',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}