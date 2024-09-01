import { getAll, upsertCompanyWithVerify } from "../../../utils/services/queries"
import { isValidCompany, tableExporters } from "../../../utils/types/companies";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(tableExporters)
    res.status(200).json({
      message: 'GET exporters',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req
    const { verify = false } = req.query

    // Validate Exporter schema
    if (!isValidCompany(body)) {
      res.status(400).json({
        message: 'Error creating exporter',
        error: 'Request body does not match Exporter data model'
      })
    }

    const { data, error } = await upsertCompanyWithVerify(tableExporters, body, null, verify)
    if (error) {
      res.status(400).json({
        message: 'Error creating exporter',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST exporter',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}