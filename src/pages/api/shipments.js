import ShipmentService from '../../services/shipments/base'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    let response = await ShipmentService.getShipments();
    res.status(response.status).json(response.data).end()
  } else {
    res.status(501).json({error: 'Method not implemented'}).end()
  }
}