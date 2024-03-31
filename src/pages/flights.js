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
import { applyPagination } from 'src/utils/apply-pagination';

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

const Page = () => {
  const [searchCommenced, setSearchCommenced] = useState(false);
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const [date, setDate] = useState(null);
  const [flights, setFlights] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const validFlights = useFlights(flights, page, rowsPerPage);
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
      console.log(date)
    }, [date]
  )

  return (
    <>
      <Head>
        <title>
          Flights | Dashboard Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">
              Flights
            </Typography>
            <FlightsSearch 
              departureAirport={departureAirport}
              setDepartureAirport={setDepartureAirport}
              arrivalAirport={arrivalAirport}
              setArrivalAirport={setArrivalAirport}
              date={date}
              setDate={setDate}
              setSearchCommenced={setSearchCommenced}
              setFlights={setFlights}
            />
            <Stack 
              direction='row'
              spacing={2}
            >
              <Card sx={{ p: 3, width: '30%', height: 'fit-content' }}>
                Filters
              </Card>
              <Box sx={{ width: '70%' }}>
                {/* {searchCommenced ? "Search Commenced" : "Please hit search"}
                {date ? format(date, 'EE dd MM yyyy') : ""}
                {departureAirport ? departureAirport.name : ""}
                {arrivalAirport ? arrivalAirport.name : ""}
                <br /> */}
                {searchCommenced ?
                  <FlightsList 
                    count={flights.length}
                    items={validFlights}
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
                  :
                  <Typography
                    variant='h6'
                    align='center'
                    sx={{ 
                      width: '100%',
                      height: '100%',
                      textAlign: 'center',
                      p: 4
                    }}
                  >
                    Click search to find available flights
                  </Typography>
                }
              </Box>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
