import { format } from 'date-fns';

export const shipmentPropertyNameMap = {
  pic: 'PIC',
  exporter: 'Exporter',
  importer: 'Importer',
  departureDate: 'Shipment Departure Date',
  quantity: 'Quantity',
  category: 'Cargo Category',
  packaging: 'Packaging',
  weightIndividual: null,
  weightTotal: 'Total Weight',
  sizeIndividual: null,
  sizeTotal: 'Cargo Size',
}

export const shipmentPropertyValueMap = (propertyName, propertyValue) => {
  switch (propertyName) {
    case 'Exporter':
      return propertyValue.name
    case 'Importer':
      return propertyValue.name
    case 'Shipment Departure Date':
      return format(propertyValue, 'EEEE, dd MMMM yyyy');
    case 'Cargo Category':
      return propertyValue.name
    case 'Packaging':
      return propertyValue.name
    case 'Total Weight':
      return `${propertyValue}`;
    case 'Cargo Size':
      return `${propertyValue}`;
    default:
      return propertyValue
  }
}