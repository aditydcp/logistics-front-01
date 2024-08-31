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
import { formatCurrency } from 'src/utils/helpers/format-currency';
import { FlightSummary } from 'src/components/flights/flights-summary';
import { FlightAvatar } from 'src/components/flights/flights-avatar';
import { FlightInfo } from 'src/sections/flights/flights-info';

export const FlightsFormList = (props) => {
  const {
    count = 0,
    items = [],
    selectedFlight,
    setSelectedFlight,
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    handleComplete,
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const theme = useTheme()

  const handlePickFlight = (flight) => {
    console.log(`${flight.id} picked for flight`)
    setSelectedFlight(flight)
    handleComplete()
  };

  return (
    <Stack 
    spacing={2}
     useFlexGap
     >
      {count > 0 ? <>
        {items.map((flight) => {
          const isSelected = selectedFlight?.id === flight.id

          return (
            <Accordion
              key={flight.id}
              disableGutters
              elevation={isSelected ? 8 : 2}
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
                '&': {
                  backgroundColor: theme.palette.neutral[50]
                },
                boxShadow: isSelected ? `0px 3px 14px ${theme.palette.primary.main}` : 'none',
                transition: 'box-shadow 0.3s ease', // Add transition for smooth effect
              }}
            >
              <AccordionSummary
                aria-controls={"${flight.id}-content"}
                id={flight.id}
                sx={{
                  m: 0,
                  p: 0,
                  '& .MuiAccordionSummary-content': {
                    margin: 0, // Override the margin to 0
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
                    spacing={2}
                  >
                    <Grid
                      item
                      xs={8}
                      md={4}
                    >
                      {/* TODO : Handle if there are multiple airlines */}
                      <FlightAvatar
                        airline={flight.airlines[0]}
                        size="medium"
                        stackSpacing={2}
                        typeSx={{
                          fontSize: '1rem',
                          lineHeight: 'unset',
                        }}
                      />
                      <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{
                          mt: 1,
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
                          departureTime={flight.journeyDetails.departure.time}
                          departureAirport={flight.journeyDetails.departure.airport}
                          arrivalTime={flight.journeyDetails.arrival.time}
                          arrivalAirport={flight.journeyDetails.arrival.airport}
                        />
                        {flight.legs.length > 1 &&
                          <FlightFeature
                            text={flight.legs.length - 1}
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
                        <div
                          style={{
                            width: 'fit-content',
                            marginLeft: 'auto'
                          }}
                        >
                          {isSelected ? (
                            <Button
                              variant="outlined"
                              sx={{
                                width: 'fit-content',
                                cursor: 'default'
                              }}
                            >
                              Selected
                            </Button>
                          ) : (
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
                          )}
                        </div>
                      </Stack>
                    </Grid>
                  </Grid>
                </Card>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  px: 1,
                }}
              >
                <FlightInfo
                  flight={flight}
                />
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