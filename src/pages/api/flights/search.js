import { parseQueryValue } from "../../../utils/helpers/query-parser";
import { searchFlights } from "../../../utils/services/queries"

export default async function handler(req, res) {
  const { 
    departure_airport_id,
    arrival_airport_id,
    departure_date,
    advance_search,
    weight,
    size,
  } = req.query

  const advanceSearch = advance_search === 'true'
  const categoryIds = advanceSearch && req.query['category_ids[]'] ? parseQueryValue(req.query['category_ids[]']) : [];
  const packagingIds = advanceSearch && req.query['packaging_ids[]'] ? parseQueryValue(req.query['packaging_ids[]']) : [];
  
  if (req.method === 'GET') {
    const { data, error } = await searchFlights(
      departure_date,
      departure_airport_id,
      arrival_airport_id,
      advanceSearch && weight ? parseInt(weight) : null,
      advanceSearch && size ? parseInt(size) : null,
      categoryIds,
      packagingIds,
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