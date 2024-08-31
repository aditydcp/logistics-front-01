import { bookingStatusMapper } from "../../../utils/helpers/booking-status-mapper"
import { countByFields, getBookings } from "../../../utils/services/queries"
import { table } from "../../../utils/types/bookings"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const {
      userId,
      page = 1,
      rowsPerPage = 10,
      sortColumn = 'status',
      sortDirection = 'asc'
    } = req.query

    const { data, error } = await getBookings(
      userId,
      page,
      rowsPerPage,
      sortColumn,
      sortDirection
    )

    const { count } = await countByFields(
      table,
      {user_id: userId}
    )

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
      meta: {
        count: bookings.length,
        total: count,
      },
      data: bookings,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}