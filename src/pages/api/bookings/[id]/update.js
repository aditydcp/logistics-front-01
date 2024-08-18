import { updateItem } from "../../../../utils/services/queries";
import { isValidStatus, table } from "../../../../utils/types/bookings";


export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { body } = req

    // Validate Booking status schema
    if (!isValidStatus(body)) {
      res.status(400).json({
        message: 'Error updating booking',
        error: 'Request body does not match Booking status data model'
      })
    }

    const { data, error } = await updateItem(table, id, body)
    if (error) {
      res.status(400).json({
        message: `Error updating booking status with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT booking status with id ${id}`,
      data: data,
      error: error
    });
  } else {
    res.status(405).end('Method Not Allowed')
  }
}