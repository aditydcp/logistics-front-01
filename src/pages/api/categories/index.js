import { getAll, createItem } from "../../../utils/services/queries"
import { isValidReference, tableCategories } from "../../../utils/types/references";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(tableCategories)
    res.status(200).json({
      message: 'GET categories',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate Category schema
    if (!isValidReference(body)) {
      res.status(400).json({
        message: 'Error creating category',
        error: 'Request body does not match Category data model'
      })
    }

    const { data, error } = await createItem(tableCategories, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating category',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST category',
      data: data,
      error: error
    })
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}