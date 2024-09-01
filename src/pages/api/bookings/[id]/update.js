import { createItem, updateItem } from "../../../../utils/services/queries";
import { isValidStatus, table } from "../../../../utils/types/bookings";
import { tableExporters, tableImporters } from "../../../../utils/types/companies";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { exporter_name, importer_name, ...bodyTransform } = req.body;

    // Validate Booking status schema
    if (!isValidStatus(bodyTransform)) {
      res.status(400).json({
        message: 'Error updating booking',
        error: 'Request body does not match Booking status data model'
      })
    }

    // Create exporter if exporter_name exists
    if (exporter_name && bodyTransform.exporter_id === 0) {
      let exporter = {
        name: exporter_name,
        address: null,
        phone: null,
        email: null,
        logo: null
      }
      const { data: exporterData, error: exporterError } = await createItem(tableExporters, exporter);
      if (exporterError) {
        return res.status(400).json({
          message: 'Error creating new exporter',
          error: exporterError
        });
      }
      bodyTransform.exporter_id = exporterData[0].id;
      console.log('exporterData', exporterData)
      console.log('exporterData[0]', exporterData[0])
      console.log('bodyTransform', bodyTransform)
    }

    // Create importer if importer_name exists
    if (importer_name && bodyTransform.importer_id === 0) {
      let importer = {
        name: importer_name,
        address: null,
        phone: null,
        email: null,
        logo: null
      }
      const { data: importerData, error: importerError } = await createItem(tableImporters, importer);
      if (importerError) {
        return res.status(400).json({
          message: 'Error creating new importer',
          error: importerError
        });
      }
      bodyTransform.importer_id = importerData[0].id;
      console.log('importerData', importerData)
      console.log('importerData[0]', importerData[0])
      console.log('bodyTransform', bodyTransform)
    }

    const { data, error } = await updateItem(table, id, bodyTransform)
    if (error) {
      res.status(400).json({
        message: `Error updating booking status with id ${id}`,
        error: error
      })
    }
    res.status(200).json({
      message: `PUT booking status with id ${id}`,
      data: data,
      error: error
    });
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}