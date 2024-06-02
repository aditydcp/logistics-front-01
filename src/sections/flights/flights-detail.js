import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Chip,
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
import PendingRoundedIcon from '@mui/icons-material/PendingRounded';

export const FlightDetail = (props) => {
  const {
    departure,
    arrival,
    airline,
    airlineLogo,
    planeModel,
    weightLimit,
    sizeLimit,
    categories,
    packagings,
  } = props
  const [activeStep, setActiveStep] = useState(0);
  // const categoriesText = categories.join('\n')
  // const packagingsText = packagings.join('\n')

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
          width: '40%'
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
                  {format(departure.time, 'HH:mm')}
                </Typography>
                <Typography
                  variant='body2'
                >
                  {format(departure.time, 'd MMM')}
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
                  {departure.airport.city} ({departure.airport.code})
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    wordWrap: 'break-word'
                  }}
                >
                  {departure.airport.name}
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
                  {format(arrival.time, 'HH:mm')}
                </Typography>
                <Typography
                  variant='body2'
                >
                  {format(arrival.time, 'd MMM')}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
              </TimelineSeparator>
              <TimelineContent>
                <Typography
                  variant='body1'
                >
                  {arrival.airport.city} ({arrival.airport.code})
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    wordWrap: 'break-word'
                  }}
                >
                  {arrival.airport.name}
                </Typography>
              </TimelineContent>
            </TimelineItem>
        </Timeline>
      </Container>
      <Stack
        spacing={0.5}
        sx={{
          width: '60%'
        }}
      >
        <Stack
          direction='row'
          spacing={1.5}
          alignItems='flex-start'
          justifyContent='flex-start'
        >
          <img
            src={airlineLogo}
            alt={airline}
            loading="lazy"
            style={{ width: "2.5rem" }}
          />
          <Stack
          >
            <Typography variant='body1'>
              {airline}
            </Typography>
            <Typography variant='body2'>
              {planeModel}
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
                Available {weightLimit} kg
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
                Size Available {sizeLimit} m<sup>3</sup>
              </Typography>
            </Stack>
          </Stack>
          <Stack
            spacing={1}
            sx={{
              width: '-webkit-fill-available'
            }}
          >
            <Stack spacing={0.5} >
              <Typography variant='body2'>
                Categories
              </Typography>
              <Stack
                direction='row'
                flexWrap='wrap'
                spacing={1}
                useFlexGap
              >
                {categories.map((category) => (
                  <Chip key={category} label={category} size='small'/>
                ))}
              </Stack>
            </Stack>
            <Stack spacing={0.5} >
              <Typography variant='body2'>
                Packaging
              </Typography>
              <Stack
                direction='row'
                flexWrap='wrap'
                spacing={1}
                useFlexGap
              >
                {packagings.map((packaging) => (
                  <Chip key={packaging} label={packaging} size='small'/>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}