import { getByFields, createItem } from "../../../../../utils/services/queries"
import { isValidFlightReference, table } from "../../../../../utils/types/flight-references";

const refType = 'category'

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    res.status(405).end('Method Not Allowed')

    // TODO: Should get by multiple field conditions
    // const { data, error } = await getByFields(table, ['flight_id', 'ref_type'], [id, refType])
    // res.status(200).json({
    //   message: 'GET category from flights',
    //   data: data,
    //   error: error
    // })
  } else if (req.method === 'POST') {
    const { body } = req

    body.ref_type = refType

    // Validate Flight schema
    if (!isValidFlightReference(body)) {
      res.status(400).json({
        message: 'Error creating category for flight',
        error: 'Request body does not match Flight Reference data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating category for flight',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST category for flight',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}