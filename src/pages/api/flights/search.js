import { searchFlights } from "../../../utils/services/queries"

export default async function handler(req, res) {
  const { 
    departure_airport_id,
    arrival_airport_id,
    departure_date,
    advance_search,
    weight,
    size,
    category_ids,
    packaging_ids,
  } = req.query
  
  if (req.method === 'GET') {
    const { data, error } = await searchFlights(
      departure_date,
      departure_airport_id,
      arrival_airport_id,
      advance_search? weight : null,
      advance_search? size : null,
      advance_search? category_ids: [],
      advance_search? packaging_ids: []
    )
    
    let statusCode
    if (error) statusCode = 400
    else if (!data || data.length === 0) statusCode = 404
    else statusCode = 200

    res.status(statusCode).json({
      message: 'Search for Flight Tickets',
      meta: {
        count: data?.length ?? 0
      },
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}