import {
  Card,
  Container,
  Stack,
} from '@mui/material'
import { FlightTimeline } from 'src/components/flights/flights-timeline';
import { FlightAvatar } from 'src/components/flights/flights-avatar';
import { FlightTicketDetails } from 'src/components/flights/flights-ticket-details';

export const FlightDetail = (props) => {
  const {
    flight,
    airline,
  } = props

  return (
    <Card
      elevation={1}
      variant='outlined'
    >
      <Stack
        direction='row'
        spacing={2}
        sx={{
          p: 2
        }}
        justifyContent='flex-start'
      >
        <Container
          disableGutters
          sx={{
            width: '40%'
          }}
        >
          <FlightTimeline flight={flight} />
        </Container>
        <Stack
          spacing={0.5}
          sx={{
            width: '60%'
          }}
        >
          <FlightAvatar
            flight={flight}
            airline={airline}
          />
          <FlightTicketDetails
            flight={flight}
            type='row'
            topLevelAlignItems='flex-start'
          />
        </Stack>
      </Stack>
    </Card>
  )
}