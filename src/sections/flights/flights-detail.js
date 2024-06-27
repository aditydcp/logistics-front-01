import {
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import { useTheme } from '@mui/material/styles'
import { formatDistance } from "date-fns"
import { FlightDetail } from 'src/components/flights/flights-detail'

export const FlightDetailSection = (props) => {
  const {
    flight
  } = props

  const theme = useTheme()

  return (
    <Stack
      useFlexGap
    >
      {flight.legs.map((leg, index, arr) => (
        <Stack
          key={index}
          useFlexGap
        >
          <FlightDetail
            flight={leg}
            airline={flight.airlines[leg.airlineRef]}
          />
          {index !== arr.length - 1 && (
            <Divider
              variant="middle"
              sx={{
                my: 1.5,
                '&::before, &::after': {
                  borderColor: theme.palette.neutral[400]
                }
              }}
            >
              <Typography
                variant='body2'
              >
                {`Wait for ${formatDistance(
                  leg.arrival.time,
                  arr[index + 1].departure.time,
                )}`}
              </Typography>
            </Divider>
          )}
        </Stack>
      ))}
    </Stack>
  )
}