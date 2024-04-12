import PropTypes from 'prop-types';
import { format } from 'date-fns';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Card, 
  Link,
  Stack, 
  SvgIcon,
  TablePagination,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles'
// import { makeStyles } from '@mui/styles';
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import OpenInFullRoundedIcon from '@mui/icons-material/OpenInFullRounded';
import SwitchCameraRoundedIcon from '@mui/icons-material/SwitchCameraRounded';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import { FlightFeature } from 'src/components/flights/flights-feature';
import { formatCurrency } from 'src/utils/format-currency';
import { FlightSummary } from 'src/components/flights/flights-summary';
import { FlightDetail } from './flights-detail';

// const useStyles = makeStyles({
//   noMargin: {
//      '& .MuiAccordionSummary-content': {
//        margin: 0, // Set the margin to 0
//      },
//   },
//  });

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

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const theme = useTheme()

  const handlePickFlight = (flightId) => {
    console.log(`${flightId} picked for flight`)
  };

  return (
    <Stack spacing={2} useFlexGap>
      {count > 0 ? <>
        {items.map((flight) => {
          const isSelected = selected.includes(flight.id)

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
                  <Stack
                    spacing={2}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      alignItems="flex-start"
                    >
                      <Stack
                        width='50%'
                        spacing={1}
                        useFlexGap={true}
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
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        width='50%'
                      >
                        <FlightSummary
                          departureTime={flight.departure.time}
                          departureAirport={flight.departure.airport}
                          arrivalTime={flight.arrival.time}
                          arrivalAirport={flight.arrival.airport}
                        />
                        <Stack
                          justifyContent="flex-end"
                          spacing={2}
                        >
                          <Stack 
                            direction='row'
                            spacing={0.5}
                            alignItems='flex-end'
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
                              /m<sub>3</sub>
                            </Typography>
                          </Stack>
                          <Button
                            component={NextLink}
                            href="/shipments/add"
                            startIcon={(
                              <SvgIcon fontSize="small">
                                <AirplaneTicketRoundedIcon />
                              </SvgIcon>
                            )}
                            variant="contained"
                            sx={{ minWidth: '25%', height: 'fit-content' }}
                            onClick={handlePickFlight}
                          >
                            Pick flight
                          </Button>
                        </Stack>
                      </Stack>
                    </Stack>
                  </Stack>
                </Card>
              </AccordionSummary>
              <AccordionDetails>
                <FlightDetail
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