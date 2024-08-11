import { getAll, createItem } from "../../../utils/services/queries"
import { isValidRolePriviledge, table } from "../../../utils/types/role-privileges"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET role priviledges',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req

    // Validate User schema
    if (!isValidRolePriviledge(body)) {
      res.status(400).json({
        message: 'Error creating role priviledge',
        error: 'Request body does not match Role Priviledge data model'
      })
    }

    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating role priviledge',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST role priviledge',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}