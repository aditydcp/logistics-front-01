import { getAll, createItem } from "../../../utils/services/queries"
import { isValidReference, tablePackagings } from "../../../utils/types/references";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(tablePackagings)
    res.status(200).json({
      message: 'GET packagings',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate Packaging schema
    if (!isValidReference(body)) {
      res.status(400).json({
        message: 'Error creating packaging',
        error: 'Request body does not match Packaging data model'
      })
    }

    const { data, error } = await createItem(tablePackagings, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating packaging',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST packaging',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}