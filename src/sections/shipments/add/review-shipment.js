import {
  Grid,
  Typography
} from '@mui/material';
import { shipmentPropertyNameMap, shipmentPropertyValueMap } from 'src/utils/shipment-data';

export const ShipmentReview = (props) => {
  const {
    shipment
  } = props

  return (
    <Grid container spacing={1} sx={{ ml: 5, width: 'auto' }}>
      {Object.entries(shipment).map(([key, value]) => (
        shipmentPropertyNameMap[key] &&
        <Grid item xs={12} key={key}>
          <Grid container spacing={0}>
            <Grid item xs={5}>
              <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                {shipmentPropertyNameMap[key]}
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant='body1'>
                {shipmentPropertyValueMap(shipmentPropertyNameMap[key], value)}
                {shipmentPropertyNameMap[key] === 'Total Weight' && ' kg'}
                {shipmentPropertyNameMap[key] === 'Cargo Size' && ' m'}
                {shipmentPropertyNameMap[key] === 'Cargo Size' && (
                  <sup>3</sup>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}