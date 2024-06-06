import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card, 
  Divider,
  Grid,
  Link,
  Stack, 
  SvgIcon,
  TablePagination,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import SwitchCameraRoundedIcon from '@mui/icons-material/SwitchCameraRounded';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import ConnectingAirportsRoundedIcon from '@mui/icons-material/ConnectingAirportsRounded';
import { FlightFeature } from 'src/components/flights/flights-feature';
import { formatCurrency } from 'src/utils/format-currency';
import { FlightSummary } from 'src/components/flights/flights-summary';
import { FlightDetail } from './flights-detail';
import { useFlightData } from 'src/hooks/use-flight-data';

export const FlightsList = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const router = useRouter();
  const flightData = useFlightData();

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const theme = useTheme()

  const handlePickFlight = useCallback(
    (flight) => {
      flightData.setFlightData(flight)

      const queryString = `?start=flight`;
      // router.push(`/shipments/add${queryString}`);
      router.push({
        pathname: '/shipments/add',
        query: { 
          start: 'flight',
          // flight: flight
        },
      })
    },
    [flightData, router]
  );

  return (
    <Stack spacing={2} useFlexGap>
      {count > 0 ? <>
        {items.map((flight) => {
          return (
            <Accordion
              key={flight.id}
              disableGutters
              elevation={2}
              sx={{
                borderRadius: '20px',
                "&.MuiAccordion-root:before": {
                  height: 0
                },
                '&:first-of-type': {
                  '&.MuiAccordion-root': {
                    borderRadius: '20px'
                  },
                },
              }}
            >
              <AccordionSummary
                aria-controls={"${flight.id}-content"}
                id={flight.id}
                sx={{
                  m: 0,
                  p: 0,
                  '& .MuiAccordionSummary-content': {
                    margin: 0,
                  },
                }}
              >
                <Card
                  sx={{
                    px: 3,
                    py: 2.5,
                    width: '100%'
                  }}
                >
                  <Grid
                    container
                  >
                    <Grid
                      item
                      // spacing={1}
                      xs={8}
                      md={4}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                      >
                        <img
                          src={flight.airlineLogo}
                          alt={flight.airline}
                          loading="lazy"
                          style={{ width: "2.5rem" }}
                        />
                        <Typography 
                          variant='h6'
                          component='span'
                          sx = {{
                            fontSize: '1rem',
                            lineHeight: 'unset',
                          }}
                        >
                          {flight.airline}
                        </Typography>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{ 
                          mx: 0.5,
                          px: 1.5,
                          border: '1px solid',
                          borderRadius: '32px',
                          width: 'fit-content'
                        }}
                      >
                        <FlightFeature
                          text={flight.weightLimit}
                          icon={<WorkOutlineRoundedIcon />}
                        />
                        <FlightFeature
                          text={flight.sizeLimit}
                          icon={<SwitchCameraRoundedIcon />}
                        />
                      </Stack>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      md={4}
                      container
                      direction='column'
                    >
                      <Stack
                        direction='column'
                        alignItems='center'
                        justifyContent='flex-start'
                      >
                        <FlightSummary
                          departureTime={flight.departure.time}
                          departureAirport={flight.departure.airport}
                          arrivalTime={flight.arrival.time}
                          arrivalAirport={flight.arrival.airport}
                        />
                        {flight.transitDetails && 
                          <FlightFeature
                            text={flight.transitDetails.length - 1}
                            icon={<ConnectingAirportsRoundedIcon />}
                            iconSize='1.5rem'
                            fontSize='1rem'
                            reverse
                          />
                        }
                      </Stack>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={4}
                    >
                      <Stack
                        justifyContent="flex-end"
                        useFlexGap
                        spacing={2}
                        width='-webkit-fill-available'
                      >
                        <Stack 
                          direction='row'
                          spacing={0.5}
                          alignItems='center'
                          justifyContent='flex-end'
                        >
                          <Typography
                            variant='h6'
                            component='span'
                            align='right'
                            sx={{ 
                              lineHeight: 'unset',
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
                            }}
                          >
                            /kg
                          </Typography>
                        </Stack>
                        <div 
                          style={{ 
                            width: 'fit-content',
                            marginLeft: 'auto'
                          }}
                        >
                          <Button
                            startIcon={(
                              <SvgIcon fontSize="small">
                                <AirplaneTicketRoundedIcon />
                              </SvgIcon>
                            )}
                            variant="contained"
                            sx={{ 
                              width: 'fit-content',
                            }}
                            onClick={() => handlePickFlight(flight)}
                          >
                            Pick flight
                          </Button>
                        </div>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </AccordionSummary>
              <AccordionDetails>
                {flight.transitDetails ? <Stack>
                  {flight.transitDetails.map((transit, index, arr) => (
                    <Stack key={index}>
                      <FlightDetail
                        departure={transit.departure}
                        arrival={transit.arrival}
                        airline={transit.airline}
                        airlineLogo={transit.airlineLogo}
                        planeModel={transit.planeModel}
                        weightLimit={transit.weightLimit}
                        sizeLimit={transit.sizeLimit}
                        categories={transit.categories}
                        packagings={transit.packagings}
                      />
                      {index !== arr.length - 1 && (
                        <Divider
                          variant="middle"
                          sx={{
                            my: 2,
                            '.MuiDivider-root:before, .MuiDivider-root:after': {
                              borderColor: theme.palette.neutral[300]
                            }
                          }}
                        >
                          <Typography
                            variant='body2'
                          >
                            {`Wait for ${formatDistance(
                              transit.arrival.time,
                              arr[index + 1].departure.time,
                            )}`}
                          </Typography>
                        </Divider>
                      )}
                    </Stack>
                  ))}
                  </Stack> : 
                  <FlightDetail
                    departure={flight.departure}
                    arrival={flight.arrival}
                    airline={flight.airline}
                    airlineLogo={flight.airlineLogo}
                    planeModel={flight.planeModel}
                    weightLimit={flight.weightLimit}
                    sizeLimit={flight.sizeLimit}
                    categories={flight.categories}
                    packagings={flight.packagings}
                  />
                }
              </AccordionDetails>
            </Accordion>
          )
        })}
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </> : <>
        <Stack 
          spacing={1}
          useFlexGap
          justifyContent="center"
          alignItems="center"
          sx={{
            my: 4
          }}
        >
          <img 
            src="/assets/searching-illustration.svg" 
            width="30%"
            alt=""
            loading="lazy"
          />
          <Typography
            variant='h6'
            component='span'
            align='center'
            sx={{ 
              textAlign: 'center',
              marginTop: 3
            }}
          >
            No flights available
          </Typography>
          <Typography
            variant='body2'
            component='span'
            align='center'
            sx={{ 
              textAlign: 'center',
              // p: 4
            }}
          >
            Please adjust the filters or change your search
          </Typography>
        </Stack>
      </>}
    </Stack>
  )
}