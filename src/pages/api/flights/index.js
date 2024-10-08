import { getAll, createItem } from "../../../utils/services/queries"
import { isValidFlight, table } from "../../../utils/types/flights"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET flights',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate Flight schema
    if (!isValidFlight(body)) {
      res.status(400).json({
        message: 'Error creating flight',
        error: 'Request body does not match Flight data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating flight',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST flight',
      data: data,
      error: error
    })
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}