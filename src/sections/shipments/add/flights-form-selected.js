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
import { FlightAvatar } from 'src/components/flights/flights-avatar';
import { formatCurrency } from 'src/utils/helpers/format-currency';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import SwitchCameraRoundedIcon from '@mui/icons-material/SwitchCameraRounded';
import { FlightTimelineExtended } from 'src/components/flights/flights-timeline-extended';
import { FlightTicketDetails } from 'src/components/flights/flights-ticket-details';
import { FlightRates } from 'src/components/flights/flights-rates';

export const FlightsFormSelected = (props) => {
  const {
    flight,
    setFlight,
    handleNext,
    handleIncomplete,
  } = props

  const theme = useTheme()

  const onContinue = () => {
    handleNext()
  }

  const onDeselect = () => {
    setFlight(null)
    handleIncomplete()
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
          <Typography
            variant='h6'
            component='span'
          >
            Flight has been selected
          </Typography>
          {/* TODO : Handle if there are multiple airlines */}
          <FlightAvatar
            airline={flight.airlines[0]}
            sx={{
              ml: 1
            }}
          />
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
              <FlightTicketDetails
                flight={flight}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
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
            <Grid
              item
              xs={12}
              md={4}
            >
              <FlightRates
                flight={flight}
              />
            </Grid>
          </Grid>
          <Stack
            direction='row'
            justifyContent='space-between'
            sx={{
              mt: 1
            }}
          >
            <Button
              variant='outlined'
              sx={{
                width: 'fit-content',
              }}
              onClick={onDeselect}
            >
              Cancel selection
            </Button>
            <Button
              variant='contained'
              sx={{
                width: 'fit-content',
              }}
              onClick={onContinue}
            >
              Next step
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
  )
}