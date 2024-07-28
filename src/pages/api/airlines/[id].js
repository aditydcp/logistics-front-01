import { getById, updateItem, deleteItem } from "src/services/queries"

const table = 'airlines'

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getById(table, id);
    if (data) {
      res.status(200).json({
        message: `GET airline with id ${id}`,
        data: data,
        error: error
      })
    } else {
      res.status(404).json({
        message: `Airline with id ${id} not found`,
        error: error
      })
    }
  } else if (req.method === 'PUT') {
    const { data, error } = await updateItem(table, id, req.body);
    if (error) {
      res.status(400).json({
        message: `Error updating airline with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: message
    });
  } else if (req.method === 'DELETE') {
    const { data, error } = await deleteItem(table, id);
    if (error) {
      res.status(400).json({
        message: `Error deleting airline with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: message
  });
  } else {
    res.status(405).end('Method Not Allowed')
  }
}

async function update(id, airline) {
  const result = await db.query(
      `UPDATE airlines 
      SET name="${airline.name}", logo_url="${airline.logo_url}"
      WHERE id=${id}`
  );

  let message = 'Error in updating airline';

  if (result.affectedRows) {
      message = 'Airline updated successfully';
  }

  return {message};
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM airlines WHERE id=${id}`
  );

  let message = 'Error in deleting airline';

  if (result.affectedRows) {
      message = 'Airline deleted successfully';
  }

  return {message};
}