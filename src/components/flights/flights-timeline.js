import { format } from 'date-fns';
import {
  Typography
} from '@mui/material'
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  timelineOppositeContentClasses,
  TimelineDot,
} from '@mui/lab'

export const FlightTimeline = (props) => {
  const {
    flight,
  } = props

  return (
    <Timeline
      position='right'
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
        p: 0,
        m: 0
      }}
    >
      <TimelineItem
        sx={{
          minHeight: '5rem',
        }}
      >
        <TimelineOppositeContent align='right' sx={{ paddingLeft: 0 }}>
          <Typography
            variant='body1'
          >
            {format(flight.departure.time, 'HH:mm')}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              textWrap: 'nowrap'
            }}
          >
            {format(flight.departure.time, 'd MMM')}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <Typography
            variant='body1'
          >
            {flight.departure.airport.city} ({flight.departure.airport.code})
          </Typography>
          <Typography
            variant='body2'
            sx={{
              wordWrap: 'break-word'
            }}
          >
            {flight.departure.airport.name}
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem
        sx={{
          minHeight: 0,
        }}
      >
        <TimelineOppositeContent
          align='right'
          sx={{
            paddingLeft: 0,
            textWrap: 'nowrap',
          }}
        >
          <Typography
            variant='body1'
          >
            {format(flight.arrival.time, 'HH:mm')}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              textWrap: 'nowrap'
            }}
          >
            {format(flight.arrival.time, 'd MMM')}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>
          <Typography
            variant='body1'
          >
            {flight.arrival.airport.city} ({flight.arrival.airport.code})
          </Typography>
          <Typography
            variant='body2'
            sx={{
              wordWrap: 'break-word'
            }}
          >
            {flight.arrival.airport.name}
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}