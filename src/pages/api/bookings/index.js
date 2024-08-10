import { getAll, createItem } from "../../../utils/services/queries"
import { isValidBooking, table } from "../../../utils/types/bookings"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET bookings',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate Booking schema
    if (!isValidBooking(body)) {
      res.status(400).json({
        message: 'Error creating booking',
        error: 'Request body does not match Booking data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating booking',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST booking',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}