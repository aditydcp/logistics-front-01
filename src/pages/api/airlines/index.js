import { getAll, createItem } from "src/services/queries"

const table = 'airlines'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // const { id } = req.query;
    // console.log(id)

    // if (id) {
    //   res.status(405).json({
    //     message: 'Not allowed with GET by ID',
    //   })
    // }

    const { data, error } = await getAll(table)
    res.status(200).json({
      message: 'GET airlines',
      data: data,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req
    const { data, error } = await createItem(table, body)
    if (error) {
      res.status(400).json({
        message: 'Error creating airline',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST airline',
      data: data,
      error: error
    })
  } else {
    res.status(405).end('Method Not Allowed')
  }
}
