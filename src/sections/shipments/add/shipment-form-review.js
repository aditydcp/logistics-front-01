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
import { formatCurrency } from 'src/utils/helpers/format-currency';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import SwitchCameraRoundedIcon from '@mui/icons-material/SwitchCameraRounded';
import { FlightTimelineExtended } from 'src/components/flights/flights-timeline-extended';
import { ShipmentReview } from './review-shipment';
import { PricingReview } from './review-pricing';
import { FlightAvatar } from 'src/components/flights/flights-avatar';
import { FlightTicketDetails } from 'src/components/flights/flights-ticket-details';
import { FlightRates } from 'src/components/flights/flights-rates';

export const ShipmentFormReview = (props) => {
  const {
    shipment,
    flight,
    handleComplete,
  } = props;

  const theme = useTheme()
  const router = useRouter()

  const shipmentIsFilled = Object.values(shipment).every(item => item !== null);

  let pricingErrorTopic = ''

  if (!shipmentIsFilled) {
    pricingErrorTopic += 'fill out shipment details'
  }
  if (!flight) {
    pricingErrorTopic += (!shipmentIsFilled ? ' and ' : '')
    pricingErrorTopic += 'pick a flight'
  }

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
            spacing={4}
            useFlexGap
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
                <Typography
                  variant='h6'
                  component='span'
                  sx={{
                    mb: .5
                  }}
                >
                  Shipment Details
                </Typography>
              </Stack>
              {shipmentIsFilled ? (
                <ShipmentReview shipment={shipment} />
              ) : (
                <Typography variant='body1'>
                  Please fill out shipment details first
                </Typography>
              )}
            </Stack>
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
                  <SellRoundedIcon />
                </SvgIcon>
                <Typography
                  variant='h6'
                  component='span'
                  sx={{
                    mb: .5
                  }}
                >
                  Pricing Details
                </Typography>
              </Stack>
              {shipmentIsFilled && flight ? (
                <PricingReview
                  shipment={shipment}
                  flight={flight}
                />
              ) : (
                <Typography
                  variant='body1'
                >
                  Please {pricingErrorTopic} first
                </Typography>
              )}
            </Stack>
          </Stack>
        </Box>
        <Divider
          orientation='vertical'
          flexItem
          sx={{
            borderColor: theme.palette.neutral[400]
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
              <Typography
                variant='h6'
                component='span'
                sx={{
                  mb: .5
                }}
              >
                Flight Details
              </Typography>
            </Stack>
            {flight ? (
              <Stack
                spacing={2}
                useFlexGap
              >
                <FlightAvatar
                  airline={flight.airlines[0]}
                  sx={{
                    ml: 1
                  }}
                />
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
                      spacing={3}
                      alignItems="flex-center"
                    >
                      <FlightTicketDetails
                        flight={flight}
                      />
                      <FlightRates
                        flight={flight}
                        shipment={shipment}
                      />
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
                      <FlightTimelineExtended
                        flights={flight.legs}
                        airlines={flight.airlines}
                      />
                    </Container>
                  </Grid>
                </Grid>
              </Stack>
            ) : (
              <Typography variant='body1'>
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