import { getById, upsertCompanyWithVerify } from "../../../../utils/services/queries";
import { isValidVerifiedCompany, tableImporters } from "../../../../utils/types/companies";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { data, error } = await getById(tableImporters, id);
    if (error) {
      res.status(400).json({
        message: `Error fetching importer with id ${id}`,
        error: error
      });
    }
    if (!data) {
      res.status(404).json({
        message: `Importer with id ${id} not found`,
        error: error
      });
    }
    let company = data[0]
    if (company.verified_at) {
      res.status(200).json({
        message: `Importer with id ${id} already verified`,
        data: data,
        error: error
      });
    }
    if (!isValidVerifiedCompany(company)) {
      res.status(400).json({
        message: `Error verifying importer with id ${id}`,
        error: 'Invalid or incomplete company data'
      });
    }

    const { name, email, address, phone, logo } = company;
    const companyData = { name, email, address, phone, logo }

    const { data: updateData, error: updateError } = await upsertCompanyWithVerify(tableImporters, companyData, id, true);
    if (updateError) {
      res.status(400).json({
        message: `Error verifying importer with id ${id}`,
        error: error
      });
    }
    res.status(200).json({
      message: `PUT importer with id ${id}`,
      data: updateData,
      error: error
    });
  } else {
    res.status(405).end('Method Not Allowed')
  }
}