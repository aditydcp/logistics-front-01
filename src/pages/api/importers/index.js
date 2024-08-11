import { getAll, createItem } from "../../../utils/services/queries"
import { isValidCompany, tableImporters } from "../../../utils/types/companies";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(tableImporters)
    res.status(200).json({
      message: 'GET importers',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate Importer schema
    if (!isValidCompany(body)) {
      res.status(400).json({
        message: 'Error creating importer',
        error: 'Request body does not match Importer data model'
      })
    }

    const { data, error } = await createItem(tableImporters, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating importer',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST importer',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}