import { getAll, createItem } from "../../../utils/services/queries"
import { isValidFlightRate, table } from "../../../utils/types/flight-rates"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET flight rates',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate Flight Rate schema
    if (!isValidFlightRate(body)) {
      res.status(400).json({
        message: 'Error creating flight rate',
        error: 'Request body does not match Flight Rate data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating flight rate',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST flight rate',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}