import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { 
  Card, 
  Stack, 
  TablePagination 
} from '@mui/material';

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

  return (
    <Stack spacing={2}>
      {items.map((flight) => {
        const isSelected = selected.includes(flight.id)
        // const departureTime = format(flight.departure.time, 'dd/MM')

        return (
          <Card
            sx={{
              px: 3,
              py: 2.5
            }}
            
          >
            {flight.airline} <br />
            {flight.planeModel} <br />
            {flight.baggageSize} <br />
            {flight.departure.airport} <br />
            {flight.departure.time} <br />
            {flight.arrival.airport} <br />
            {flight.arrival.time}
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