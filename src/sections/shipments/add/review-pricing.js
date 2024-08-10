import {
  Stack,
  Typography
} from "@mui/material"
import { formatCurrency } from "src/utils/helpers/format-currency"
import { getFlightRate } from "src/utils/helpers/get-flight-rate"
import { useTheme } from '@mui/material/styles'

export const PricingReview = (props) => {
  const {
    shipment,
    flight,
  } = props

  const theme = useTheme()

  const weight = shipment.weightTotal
  const price = getFlightRate(flight, weight)
  const total = price * weight

  return (
    <Stack spacing={0}>
      <Typography
        variant='caption'
        sx={{
          color: theme.palette.neutral[600]
        }}
      >
        Total Weight &times; Rate
      </Typography>
      <Typography
        variant='subtitle2'
        component='span'
        sx={{
          color: theme.palette.neutral[600],
          fontWeight: 600,
        }}
      >
        {weight} kg &times; {formatCurrency(price)}
      </Typography>
      <Typography
        variant='h5'
        component='span'
      >
        {formatCurrency(total)}
      </Typography>
    </Stack>
  )
}