async function getShipments() {
  return {
    data: {
      message: "Hello, you get shipments",
    },
    status: 200,
  }
}

const ShipmentService = {
  getShipments,
}

export default ShipmentService;
