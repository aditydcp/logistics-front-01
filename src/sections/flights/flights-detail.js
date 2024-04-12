import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Container,
  Stack,
  Step,
  Stepper,
  StepContent,
  StepLabel,
  SvgIcon,
  Tooltip,
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
import { useTheme } from '@mui/material/styles'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import SwitchCameraRoundedIcon from '@mui/icons-material/SwitchCameraRounded';

export const FlightDetail = (props) => {
  const { flight } = props
  const [activeStep, setActiveStep] = useState(0);
  const categoriesText = flight.categories.join('\n')
  const packagingsText = flight.packagings.join('\n')

  return (
    <Stack
      direction='row'
      spacing={2}
      sx={{
        mx: 1,
        py: 1
      }}
      justifyContent='flex-start'
    >
      <Container
        disableGutters
        sx={{
          width: '-webkit-fill-available'
        }}
      >
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
            <TimelineOppositeContent align='right' sx={{ paddingLeft: 0 }}>
              <Typography
                variant='body1'
              >
                {format(flight.arrival.time, 'HH:mm')}
              </Typography>
              <Typography
                variant='body2'
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
              >
                {flight.arrival.airport.name}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Container>
      <Stack
        spacing={0.5}
        sx={{
          width: '-webkit-fill-available'
        }}
      >
        <Stack
          direction='row'
          spacing={1.5}
          alignItems='flex-start'
          justifyContent='flex-start'
        >
          <img
            src={flight.airlineLogo}
            alt={flight.airline}
            loading="lazy"
            style={{ width: "2.5rem" }}
          />
          <Stack
          >
            <Typography variant='body1'>
              {flight.airline}
            </Typography>
            <Typography variant='body2'>
              {flight.planeModel}
            </Typography>
          </Stack>
        </Stack>
        <Stack
          direction='row'
          spacing={2}
          alignItems='flex-start'
          // justifyContent='space-between'
        >
          <Stack
            sx={{
              width: '-webkit-fill-available'
            }}
          >
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
            >
              <SvgIcon sx={{ fontSize: '1rem' }}>
                <WorkOutlineRoundedIcon />
              </SvgIcon>
              <Typography variant='body2'>
                Weight Limit {flight.weightLimit} kg
              </Typography>
            </Stack>
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
            >
              <SvgIcon sx={{ fontSize: '1rem' }}>
                <SwitchCameraRoundedIcon />
              </SvgIcon>
              <Typography variant='body2'>
                Size Limit {flight.sizeLimit} m<sup>3</sup>
              </Typography>
            </Stack>
          </Stack>
          <Stack
            sx={{
              width: '-webkit-fill-available'
            }}
          >
            <Tooltip 
              arrow
              describeChild
              enterDelay={200}
              leaveDelay={400}
              placement='right'
              sx={{
                width: 'fit-content'
              }}
              title={<>
                {flight.categories.map((category) => (
                  <span key={category}>
                    {category}<br />
                  </span>
                ))}
              </>}
            >
              <Typography variant='body2'>
                {`${flight.categories.length} Categories`}
              </Typography>
            </Tooltip>
            <Tooltip 
              arrow
              describeChild
              enterDelay={200}
              leaveDelay={400}
              placement='right'
              sx={{
                width: 'fit-content'
              }}
              title={<>
                {flight.packagings.map((packaging) => (
                  <span key={packaging}>
                    {packaging}<br />
                  </span>
                ))}
              </>}
            >
              <Typography variant='body2'>
                {`${flight.packagings.length} Packaging`}
              </Typography>
            </Tooltip>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}