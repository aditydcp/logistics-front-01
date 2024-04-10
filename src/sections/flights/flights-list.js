import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { 
  Button,
  Card, 
  Stack, 
  SvgIcon,
  TablePagination,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import AirplaneTicketRoundedIcon from '@mui/icons-material/AirplaneTicketRounded';
import { FlightFeature } from 'src/components/flights/flights-feature';
import { formatCurrency } from 'src/utils/format-currency';
import { FlightSummary } from 'src/components/flights/flights-summary';

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

  // Function to handle card click
  const handleCardClick = (flightId) => {
    if (selected.includes(flightId)) {
      // If already selected, deselect it
      onDeselectOne(flightId);
    } else {
      // If not selected, select it
      onSelectOne(flightId);
    }
  };

  return (
    <Stack spacing={2}>
      {items.map((flight) => {
        const isSelected = selected.includes(flight.id)

        return (
          <Card
            key={flight.id}
            sx={{
              px: 3,
              py: 2.5,
              // cursor: "pointer"
            }}
            // onClick={() => handleCardClick(flight.id)}
          >
            <Stack
              spacing={2}
            >
              {isSelected && <Typography variant="body2">Selected</Typography>} {/* Display selection status */}
              <Stack
                direction="row"
                spacing={2}
                // justifyContent="space-between"
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
                    spacing={1}
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
                      text={flight.baggageSize}
                      icon={<WorkOutlineRoundedIcon />}
                    />
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  width='50%'
                >
                  <FlightSummary
                    departureTime={flight.departure.time}
                    departureAirport={flight.departure.airport}
                    arrivalTime={flight.arrival.time}
                    arrivalAirport={flight.arrival.airport}
                  />
                  <Typography
                    variant='h6'
                    component='span'
                    sx={{ 
                      lineHeight: 'unset',
                      color: theme.palette.primary.main
                    }}
                  >
                    {formatCurrency(flight.price)}
                  </Typography>
                </Stack>
              </Stack>
              <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Button
                  size='small'
                  variant="text"
                  sx={{ 
                    height: 'fit-content'
                  }}
                  color='inherit'
                  // onClick={handleSearchClick}
                >
                  Flight Details
                </Button>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <AirplaneTicketRoundedIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  sx={{ minWidth: '25%', height: 'fit-content' }}
                  // onClick={handleSearchClick}
                >
                  Pick flight
                </Button>
              </Stack>
            </Stack> 
          </Card>
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
    </Stack>
  )
}