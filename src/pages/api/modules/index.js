import { getAll, createItem } from "../../../utils/services/queries"
import { isValidReference, tableModules } from "../../../utils/types/references";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(tableModules)
    res.status(200).json({
      message: 'GET modules',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate Module schema
    if (!isValidReference(body)) {
      res.status(400).json({
        message: 'Error creating module',
        error: 'Request body does not match Module data model'
      })
    }

    const { data, error } = await createItem(tableModules, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating module',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST module',
      data: data,
      error: error
    })
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}