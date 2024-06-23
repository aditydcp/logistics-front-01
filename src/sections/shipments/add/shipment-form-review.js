import { useRouter } from 'next/router';
import {
  Button,
  Box,
  Chip,
  Container,
  Divider,
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
import { format } from 'date-fns';
import { formatCurrency } from 'src/utils/format-currency';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import SwitchCameraRoundedIcon from '@mui/icons-material/SwitchCameraRounded';
import { shipmentPropertyNameMap, shipmentPropertyValueMap } from 'src/utils/shipment-data';

export const ShipmentFormReview = (props) => {
  const {
    shipment,
    flight,
    handleComplete,
  } = props;

  const theme = useTheme()
  const router = useRouter()

  const shipmentIsFilled = Object.values(shipment).every(item => item !== null);

  const onSubmit = () => {
    handleComplete()
    router.push('/')
  }

  return (
    <Stack
      spacing={4}
      useFlexGap
    >
      <Stack
        spacing={2}
        useFlexGap
        direction='row'
      >
        <Box
          sx={{
            width: '-webkit-fill-available'
          }}
        >
          <Stack
            spacing={1}
            useFlexGap
          >
            <Stack
              spacing={1}
              useFlexGap
              direction='row'
            >
              <SvgIcon>
                <AssignmentRoundedIcon />
              </SvgIcon>
              <Typography variant='h6' component='span' sx={{ mb: .5 }}>
                Shipment Details
              </Typography>
            </Stack>
            {shipmentIsFilled ? (
              <Grid container spacing={1} sx={{ ml: 5, width: 'auto' }}>
                {Object.entries(shipment).map(([key, value]) => (
                  shipmentPropertyNameMap[key] &&
                  <Grid item xs={12} key={key}>
                    <Grid container spacing={0}>
                      <Grid item xs={5}>
                    <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                      {shipmentPropertyNameMap[key]}
                    </Typography>
                    </Grid>
                    <Grid item xs={7}>
                    <Typography variant='body1'>
                      {shipmentPropertyValueMap(shipmentPropertyNameMap[key], value)}
                      {shipmentPropertyNameMap[key] === 'Total Weight' && ' kg'}
                      {shipmentPropertyNameMap[key] === 'Cargo Size' && ' m'}
                      {shipmentPropertyNameMap[key] === 'Cargo Size' && (
                        <sup>3</sup>
                      )}
                    </Typography>
                    </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography variant='body'>
                Please fill out shipment details first
              </Typography>
            )}
          </Stack>
        </Box>
        <Divider
          orientation='vertical'
          flexItem
          sx={{
            borderColor: theme.palette.neutral[300]
          }}
        />
        <Box
          sx={{
            width: '-webkit-fill-available'
          }}
        >
          <Stack
            spacing={1}
            useFlexGap
          >
            <Stack
              spacing={1}
              useFlexGap
              direction='row'
            >
              <SvgIcon>
                <FlightRoundedIcon />
              </SvgIcon>
              <Typography variant='h6' component='span' sx={{ mb: .5 }}>
                Flight Details
              </Typography>
            </Stack>
            {flight ? (
              <Stack
                spacing={2}
                useFlexGap
              >
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
                    src={flight.airlines.logo}
                    alt={flight.airlines}
                    loading="lazy"
                    style={{ width: "3rem" }}
                  />
                  <Typography variant='h6' component='span'>
                    {flight.airlines.name}
                  </Typography>
                </Stack>
                <Grid
                  container
                  rowSpacing={2}
                  sx={{
                    mx: 1
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    md={6}
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
                    md={6}
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
                              {format(flight.journeyDetails.departure.time, 'HH:mm')}
                            </Typography>
                            <Typography
                              variant='body2'
                              sx={{
                                textWrap: 'nowrap'
                              }}
                            >
                              {format(flight.journeyDetails.departure.time, 'd MMM')}
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
                              {flight.journeyDetails.departure.airport.city} ({flight.journeyDetails.departure.airport.code})
                            </Typography>
                            <Typography
                              variant='body2'
                              sx={{
                                wordWrap: 'break-word'
                              }}
                            >
                              {flight.journeyDetails.departure.airport.name}
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
                              {format(flight.journeyDetails.arrival.time, 'HH:mm')}
                            </Typography>
                            <Typography
                              variant='body2'
                              sx={{
                                textWrap: 'nowrap'
                              }}
                            >
                              {format(flight.journeyDetails.arrival.time, 'd MMM')}
                            </Typography>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot />
                          </TimelineSeparator>
                          <TimelineContent>
                            <Typography
                              variant='body1'
                            >
                              {flight.journeyDetails.arrival.airport.city} ({flight.journeyDetails.arrival.airport.code})
                            </Typography>
                            <Typography
                              variant='body2'
                              sx={{
                                wordWrap: 'break-word'
                              }}
                            >
                              {flight.journeyDetails.arrival.airport.name}
                            </Typography>
                          </TimelineContent>
                        </TimelineItem>
                      </Timeline>
                    </Container>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
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
              </Stack>
            ) : (
              <Typography variant='body'>
                Please choose a flight first
              </Typography>
            )}
          </Stack>
        </Box>
      </Stack>
      <Button
        variant='contained'
        onClick={onSubmit}
        disabled={!shipmentIsFilled && !flight}
      >
        Confirm New Shipment
      </Button>
    </Stack>
  )
}