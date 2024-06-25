import {
  Stack,
  Typography,
} from "@mui/material"
import { useTheme } from '@mui/material/styles'
import { formatCurrency } from "src/utils/format-currency"
import { getFlightRate } from "src/utils/get-flight-rate"

export const FlightRates = (props) => {
  const {
    flight,
    shipment,
    titleHeader = false,
  } = props

  const theme = useTheme()

  const selectedSx = {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 1,
    py: 0.5,
    px: 1,
  }

  return (
    <Stack
      spacing={titleHeader ? 1 : 0}
    >
      <Typography
        variant={titleHeader ? 'h6' : 'caption'}
        component='span'
        // align='right'
        sx={{
          lineHeight: 'unset',
          // color: theme.palette.accent.red
        }}
      >
        Rate
      </Typography>
      <Stack
        spacing={0.5}
      >
        {flight.rates.map(rate => {
          const isSelected = shipment ? rate.price === getFlightRate(flight, shipment.weightTotal) : false

          return (
            <Stack
              key={rate.min}
              direction='row'
              spacing={0.5}
              alignItems='center'
              sx={isSelected ? selectedSx : { px: shipment ? 1 : 0 }}
            >
              <Stack
                direction='row'
                spacing={0.25}
                alignItems='center'
                >
              <Typography
                variant='subtitle1'
                component='span'
                align='right'
                sx={{
                  lineHeight: 'unset',
                  fontWeight: isSelected ? 700 : 500,
                  // color: theme.palette.accent.red
                }}
              >
                {formatCurrency(rate.price)}
              </Typography>
              <Typography
                variant='caption'
                component='span'
                align='right'
                sx={{
                  lineHeight: 'unset',
                  // color: theme.palette.accent.red
                }}
              >
                /kg
              </Typography>
              </Stack>
              {rate.min !== 0 &&
                <Typography
                  variant='caption'
                  component='span'
                  align='right'
                  sx={{
                    lineHeight: 'unset',
                    // color: theme.palette.accent.red
                  }}
                >
                  {`(${rate.min} kg or more)`}
                </Typography>
              }
            </Stack>
          )
        })}
      </Stack>
    </Stack>
  )
}