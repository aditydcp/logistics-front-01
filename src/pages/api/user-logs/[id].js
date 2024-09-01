import { getById } from "../../../utils/services/queries"
import { table } from "../../../utils/types/user-logs";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(table, id);
    if (data) {
      res.status(200).json({
        message: `GET user log with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `User Log with id ${id} not found`,
        error: error
      })
    }
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}