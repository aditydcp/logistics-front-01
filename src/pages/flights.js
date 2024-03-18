import { useEffect, useState } from 'react';
import Head from 'next/head';
import format from 'date-fns/format';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { FlightsSearch } from 'src/sections/flights/flights-search';

const Page = () => {
  const [searchCommenced, setSearchCommenced] = useState(false);
  const [departureAirport, setDepartureAirport] = useState(null);
  const [arrivalAirport, setArrivalAirport] = useState(null);
  const [date, setDate] = useState(null);
  
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
            />
            <Stack 
              direction='row'
              spacing={2}
            >
              <div>Filter</div>
              <Box>
                {searchCommenced ? "Search Commenced" : "Please hit search"}
                {date ? format(date, 'EE dd MM yyyy') : ""}
                {departureAirport ? departureAirport.name : ""}
                {arrivalAirport ? arrivalAirport.name : ""}
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
