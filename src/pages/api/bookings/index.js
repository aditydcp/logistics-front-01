import { status } from "nprogress"
import { bookingStatusMapper } from "../../../utils/helpers/booking-status-mapper"
import { getAll, createItem } from "../../../utils/services/queries"
import { isValidBooking, table } from "../../../utils/types/bookings"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    if (error) {
      res.status(400).json({
        message: 'Error getting bookings',
        error: error
      })
    }
    if (!data || data.length === 0) {
      res.status(404).json({
        message: 'Error getting bookings',
        error: 'No bookings found'
      })
    }

    const bookings = data.map(booking => {
      let bookingStatusProps = bookingStatusMapper[booking.status]
      
      return ({
      ...booking,
      status: {
        value: booking.status,
        label: bookingStatusProps.label,
        color: bookingStatusProps.color,
      },
      actions: bookingStatusProps.actions,
    })})

    res.status(200).json({
      message: 'GET bookings',
      data: bookings,
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