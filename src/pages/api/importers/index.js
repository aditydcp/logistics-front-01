import { companyStatusMapper } from "../../../utils/helpers/status-action-mapper";
import { getAll, upsertCompanyWithVerify } from "../../../utils/services/queries"
import { isValidCompany, tableImporters } from "../../../utils/types/companies";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await getAll(tableImporters)
    if (error) {
      res.status(400).json({
        message: 'Error getting importers',
        error: error
      })
    }
    if (!data || data.length === 0) {
      res.status(404).json({
        message: 'Error getting importers',
        error: 'No importers found'
      })
    }
    
    const companies = data.map(company => {
      let statusValue = company.verified_at ? 1 : 0
      let companyStatusProps = companyStatusMapper[statusValue]
      
      return ({
      ...company,
      status: {
        value: statusValue,
        label: companyStatusProps.label,
        color: companyStatusProps.color,
      },
      actions: companyStatusProps.actions,
    })})

    res.status(200).json({
      message: 'GET importers',
      data: companies,
      error: error
    })
  } else if (req.method === 'POST') {
    const { body } = req
    const { verify = false } = req.query

    // Validate Importer schema
    if (!isValidCompany(body)) {
      res.status(400).json({
        message: 'Error creating importer',
        error: 'Request body does not match Importer data model'
      })
    }

    const { data, error } = await upsertCompanyWithVerify(tableImporters, body, null, verify)
    if (error) {
      res.status(400).json({
        message: 'Error creating importer',
        error: error
      })
    }
    res.status(200).json({
      message: 'POST importer',
      data: data,
      error: error
    })
  } else {
    res.status(405).json(errorMessages.methodNotAllowed)
  }
}