import { useEffect, useState, useCallback, useMemo } from 'react';
import Head from 'next/head';
import format from 'date-fns/format';
import { 
  Box, 
  Card,
  Container, 
  Stack, 
  Typography, 
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FlightsSearch } from 'src/sections/flights/flights-search';
import { FlightsList } from 'src/sections/flights/flights-list';
import { FlightsFormList } from 'src/sections/shipments/add/flights-form-list';
import { applyPagination } from 'src/utils/apply-pagination';
import { FlightsFilter } from 'src/sections/flights/flights-filter';

const useFlights = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useFlightIds = (flights) => {
  return useMemo(
    () => {
      return flights.map((flight) => flight.id);
    },
    [flights]
  );
};

const FlightsFormSearch = (props) => {
  const {
    selectedFlight,
    setSelectedFlight,
  } = props

  const [searchCommenced, setSearchCommenced] = useState(false);
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const [date, setDate] = useState(null);
  const [weight, setWeight] = useState(null);
  const [size, setSize] = useState(null);
  const [categories, setCategories] = useState([])
  const [packaging, setPackaging] = useState([])
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const validFlights = useFlights(filteredFlights, page, rowsPerPage);
  const validFlightsIds = useFlightIds(validFlights);
  const validFlightsSelection = useSelection(validFlightsIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
  
  useEffect(
    () => {
      setFilteredFlights(flights)
    }, [flights]
  )
  
  return (
    <Stack spacing={3} useFlexGap>
      <FlightsSearch 
        departureAirport={departureAirport}
        setDepartureAirport={setDepartureAirport}
        arrivalAirport={arrivalAirport}
        setArrivalAirport={setArrivalAirport}
        date={date}
        weight={weight}
        size={size}
        categories={categories}
        packaging={packaging}
        setSearchCommenced={setSearchCommenced}
        setFlights={setFlights}
        setDate={setDate}
        setWeight={setWeight}
        setSize={setSize}
        setCategories={setCategories}
        setPackaging={setPackaging}
      />
      {searchCommenced ?
        <Stack 
          direction='row'
          spacing={2}
        >
          <Card sx={{ p: 3, width: '30%', height: 'fit-content' }}>
            <FlightsFilter
              flights={flights}
              setFilteredFlights={setFilteredFlights}
            />
          </Card>
          <Box sx={{ width: '70%' }}>
              <FlightsFormList 
                count={validFlights.length}
                items={validFlights}
                selectedFlight={selectedFlight}
                setSelectedFlight={setSelectedFlight}
                onDeselectAll={validFlightsSelection.handleDeselectAll}
                onDeselectOne={validFlightsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={validFlightsSelection.handleSelectAll}
                onSelectOne={validFlightsSelection.handleSelectOne}
                page={page}
                rowsPerPage={rowsPerPage}
                selected={validFlightsSelection.selected}
              />
          </Box>
        </Stack>
      :
        <Stack 
          spacing={2}
          alignItems="center"
          sx={{
            my: 4
          }}
        >
          <img 
            src="/assets/aircraft-illustration.svg" 
            width="50%"
            alt=""
            loading="lazy"
          />
          <Typography
            variant='h6'
            component='span'
            align='center'
            sx={{ 
              textAlign: 'center',
              p: 4
            }}
          >
            Click search to find available flights
          </Typography>
        </Stack>
      }
    </Stack>
  )
}

export default FlightsFormSearch;