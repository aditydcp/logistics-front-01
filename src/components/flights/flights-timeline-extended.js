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
import { FlightAvatar } from './flights-avatar';

export const FlightTimelineExtended = (props) => {
  const {
    flights,
    airlines,
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
        <TimelineOppositeContent
          align='right'
          sx={{ paddingLeft: 0 }}
        >
          <Typography
            variant='body1'
          >
            {format(flights[0].departure.time, 'HH:mm')}
          </Typography>
          <Typography
            variant='body2'
            sx={{
              textWrap: 'nowrap'
            }}
          >
            {format(flights[0].departure.time, 'd MMM')}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent
          sx={{
            pb: 2
          }}
        >
          <Typography
            variant='body1'
          >
            {flights[0].departure.airport.city} ({flights[0].departure.airport.code})
          </Typography>
          <Typography
            variant='body2'
            sx={{
              wordWrap: 'break-word'
            }}
          >
            {flights[0].departure.airport.name}
          </Typography>
          <FlightAvatar
            flight={flights[0]}
            airline={airlines[flights[0].airlineRef]}
            size='small'
            showPlaneModel
            sx={{
              mt: 0.25
            }}
          />
        </TimelineContent>
      </TimelineItem>
      {flights.map((flight, index, array) => (
        <TimelineItem
          key={index}
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
            {index < array.length - 1 && (
              <TimelineConnector />
            )}
          </TimelineSeparator>
          <TimelineContent
            sx={{
              pb: index < array.length - 1 ? 2 : 0
            }}
          >
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
            {index < array.length - 1 && (
              <FlightAvatar
                flight={array[index + 1]}
                airline={airlines[array[index + 1].airlineRef]}
                size='small'
                showPlaneModel
                sx={{
                  mt: 0.25
                }}
              />
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}