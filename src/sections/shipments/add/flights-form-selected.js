import { useState } from 'react'
import { format } from 'date-fns';
import {
  Button,
  Card,
  Chip,
  Container,
  Grid,
  Stack,
  SvgIcon,
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
import { formatCurrency } from 'src/utils/format-currency';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import SwitchCameraRoundedIcon from '@mui/icons-material/SwitchCameraRounded';

export const FlightsFormSelected = (props) => {
  const {
    flight,
    setFlight,
  } = props

  const theme = useTheme()

  const onDeselect = () => {
    setFlight(null)
  }

  return (
    <>
      <Card
        elevation={0}
        sx={{
          p: 3,
          // borderColor: theme.palette.primary.main
          border: `1px solid ${theme.palette.primary.main}`
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
        >
          <Typography variant='h6' component='span'>
            Flight has been selected
          </Typography>
          <Stack
            direction='row'
            spacing={1.5}
            alignItems='center'
            justifyContent='flex-start'
            sx={{
              ml: 1
            }}
          >
            <img
              src={flight.airlineLogo}
              alt={flight.airline}
              loading="lazy"
              style={{ width: "3rem" }}
            />
            <Typography variant='h6' component='span'>
              {flight.airline}
            </Typography>
          </Stack>
          <Grid
            container
            sx={{
              mx: 1
            }}
          >
            <Grid
              item
              xs={12}
              md={3}
            >
              <Stack
                spacing={0.5}
                alignItems="flex-center"
              >
                <Typography variant='subtitle1' component='span'>
                  {flight.planeModel}
                </Typography>
                <Stack
                  direction='row'
                  spacing={1}
                  alignItems='center'
                >
                  <SvgIcon sx={{ fontSize: '1rem' }}>
                    <WorkOutlineRoundedIcon />
                  </SvgIcon>
                  <Typography variant='body2'>
                    Available {flight.weightLimit} kg
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
                    Size Available {flight.sizeLimit} m<sup>3</sup>
                  </Typography>
                </Stack>
                <Stack
                  spacing={1}
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
                      {flight.categories.map((category) => (
                        <Chip key={category} label={category} size='small' />
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
                      {flight.packagings.map((packaging) => (
                        <Chip key={packaging} label={packaging} size='small' />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
            >
              <Container
                disableGutters
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
                        sx={{
                          wordWrap: 'break-word'
                        }}
                      >
                        {flight.arrival.airport.name}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                </Timeline>
              </Container>
            </Grid>
            <Grid
            item
            xs={12}
            md={4}
            >
              <Typography
                variant='caption'
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
                direction='row'
                spacing={0.5}
                alignItems='center'
              >
                <Typography
                  variant='h6'
                  component='span'
                  align='right'
                  sx={{
                    lineHeight: 'unset',
                    // color: theme.palette.accent.red
                  }}
                >
                  {formatCurrency(flight.price)}
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
            </Grid>
          </Grid>
          <Button
            variant='outlined'
            sx={{
              mt: 1,
              width: 'fit-content',
            }}
            onClick={onDeselect}
          >
            Cancel selection
          </Button>
        </Stack>
      </Card>
    </>
  )
}