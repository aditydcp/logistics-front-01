import {
  Card,
  Stack,
} from "@mui/material"
import { FlightRates } from "src/components/flights/flights-rates"

export const FlightRatesSection = (props) => {
  const {
    flight
  } = props

  return (
    <Card
      elevation={1}
      variant='outlined'
    >
      <Stack
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <FlightRates
          flight={flight}
          titleHeader
        />
      </Stack>
    </Card>
  )
}