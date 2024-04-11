import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { subDays, subHours } from 'date-fns';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import FlightLandRoundedIcon from '@mui/icons-material/FlightLandRounded';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EventIcon from '@mui/icons-material/Event';
import {
  Card,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Autocomplete,
  IconButton,
  Button,
  Typography,
  Box, 
  Stack
} from '@mui/material';
import { AirportSearch } from 'src/components/flights/flights-airport-search';
import { MyDatePicker } from 'src/components/date-picker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import 'dayjs/locale/en-gb';
// import { DatePicker } from '@mui/x-date-pickers';

const now = new Date();

const airports = [
  {
    name: "Changi Intl",
    code: "SIN",
    city: "Singapore",
    country: "Singapura"
  },
  { 
    name: "Kuala Lumpur International Airport",
    code: "KUL",
    city: "Kuala Lumpur",
    country: "Malaysia"
  },
  { 
    name: "Soekarno Hatta International Airport",
    code: "CGK",
    city: "Jakarta",
    country: "Indonesia"
  },
  { 
    name: "Yogyakarta International Airport",
    code: "YIA",
    city: "Yogyakarta",
    country: "Indonesia"
  },
  { 
    name: "Adi Sutjipto",
    code: "YOG",
    city: "Yogyakarta",
    country: "Indonesia" 
  },
  { 
    name: "Juanda",
    code: "SUB",
    city: "Surabaya",
    country: "Indonesia"
  },
];

const flightsData = [
  {
    id: '1',
    airline: 'Malaysia Airlines',
    airlineLogo: '/assets/logos/airlines/logo-malaysiaairlines-square.png',
    planeModel: 'MH-360',
    weightLimit: 1000,
    sizeLimit: 100,
    departure: {
      airport: airports[0],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[1],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 1000000,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
  },
  {
    id: '2',
    airline: 'Malaysia Airlines',
    airlineLogo: '/assets/logos/airlines/logo-malaysiaairlines-square.png',
    planeModel: 'MH-871',
    weightLimit: 1000,
    sizeLimit: 100,
    departure: {
      airport: airports[1],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[5],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 1000000,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
  },
  {
    id: '3',
    airline: 'Citilink',
    airlineLogo: '/assets/logos/airlines/logo-citilink-square.png',
    planeModel: 'QG-252',
    weightLimit: 350,
    sizeLimit: 100,
    departure: {
      airport: airports[2],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[5],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 1000000,
    categories: ['General Cargo', 'Mail Cargo'],
    packagings: ['Keranjang', 'Karton', 'Wooden Box'],
  },
  {
    id: '4',
    airline: 'Garuda Indonesia',
    airlineLogo: '/assets/logos/airlines/logo-garudaindonesia-square.png',
    planeModel: 'GA-855',
    weightLimit: 1500,
    sizeLimit: 100,
    departure: {
      airport: airports[0],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[5],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 1000000,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
  },
  {
    id: '5',
    airline: 'Garuda Indonesia',
    airlineLogo: '/assets/logos/airlines/logo-garudaindonesia-square.png',
    planeModel: 'GA-837',
    weightLimit: 1500,
    sizeLimit: 100,
    departure: {
      airport: airports[0],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[2],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 1000000,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
  },
  {
    id: '6',
    airline: 'Garuda Indonesia',
    airlineLogo: '/assets/logos/airlines/logo-garudaindonesia-square.png',
    planeModel: 'GA-304',
    weightLimit: 1500,
    sizeLimit: 100,
    departure: {
      airport: airports[2],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[5],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 1000000,
    categories: ['General Cargo', 'Special Cargo'],
    packagings: ['Palet', 'Wooden Box', 'Wooden Palet'],
  },
  {
    id: '7',
    airline: 'Citilink',
    airlineLogo: '/assets/logos/airlines/logo-citilink-square.png',
    planeModel: 'QG-527',
    weightLimit: 350,
    sizeLimit: 100,
    departure: {
      airport: airports[0],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[2],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 1000000,
    categories: ['General Cargo', 'Mail Cargo'],
    packagings: ['Keranjang', 'Karton', 'Wooden Box'],
  },
]

export const FlightsSearch = (props) => {
  const {
    departureAirport,
    setDepartureAirport,
    arrivalAirport,
    setArrivalAirport,
    date,
    setDate,
    setSearchCommenced,
    setFlights
  } = props

  const [localDepartureAirport, setLocalDepartureAirport] = useState(departureAirport);
  const [inputDepartureAirport, setInputDepartureAirport] = useState("");
  const [departureAirportOptions, setDepartureAirportOptions] = useState(airports);

  const [localArrivalAirport, setLocalArrivalAirport] = useState(arrivalAirport);
  const [inputArrivalAirport, setInputArrivalAirport] = useState("");
  const [arrivalAirportOptions, setArrivalAirportOptions] = useState(airports);

  const [localDate, setLocalDate] = useState(date);

  useEffect(
    () => {
      console.log(localDepartureAirport)
      console.log(localArrivalAirport)
    }, [departureAirport, arrivalAirport, localDepartureAirport, localArrivalAirport]
  )

  const handleSwapAirport = () => {
    let temp = localArrivalAirport
    setLocalArrivalAirport(localDepartureAirport)
    setLocalDepartureAirport(temp)
  }

  const filterFlights = (flights, departureAirport, arrivalAirport, date) => {
    return flights.filter(flight => {
       const departureMatches = flight.departure.airport.name === departureAirport.name;
       const arrivalMatches = flight.arrival.airport.name === arrivalAirport.name;
      //  const dateMatches = new Date(flight.departure.time).toDateString() === new Date(date).toDateString();
       return departureMatches && arrivalMatches
        // && dateMatches;
    });
   };

  const handleSearchClick = () => {
    setDepartureAirport(localDepartureAirport)
    setArrivalAirport(localArrivalAirport)
    setDate(localDate)
    setFlights(filterFlights(flightsData, localDepartureAirport, localArrivalAirport, localDate))
    setSearchCommenced(true)
  }

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Typography variant='h6'>
            Search for a flight
          </Typography>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={1}
            useFlexGap={true}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={2}
              sx={{ width: "70%" }}
            >
              <AirportSearch
                id='departure-airport'
                options={departureAirportOptions}
                value={localDepartureAirport}
                setValue={setLocalDepartureAirport}
                inputValue={inputDepartureAirport}
                setInputValue={setInputDepartureAirport}
                label='From'
                icon={<FlightTakeoffRoundedIcon sx={{ mx: 1, mr: 1.5, my: 0.5 }} />}
              />
              <Box>
                <IconButton 
                  aria-label="airport-swap" 
                  size="small"
                  sx={{ height: "fit-content", mt: 2 }}
                  onClick={handleSwapAirport}
                >
                  <SwapHorizRoundedIcon
                    fontSize='inherit'
                  />
                </IconButton>
              </Box>
              <AirportSearch
                id='arrival-airport'
                options={arrivalAirportOptions}
                value={localArrivalAirport}
                setValue={setLocalArrivalAirport}
                inputValue={inputArrivalAirport}
                setInputValue={setInputArrivalAirport}
                label='To'
                icon={<FlightLandRoundedIcon sx={{ mr: 1.5, my: 0.5 }} />}
              />
            </Stack>
            <MyDatePicker 
              label="Departure Date"
              format="EEEE, dd MMMM yyyy"
              selectedDate={localDate}
              setSelectedDate={setLocalDate}
              icon={<EventIcon sx={{ mr: 1.5, my: 0.5 }} />}
            />
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            <Accordion 
              disableGutters={true}
              elevation={0}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
                // aria-controls="panel2-content"
                // id="panel2-header"
              >
                <Typography variant='body1'>Advanced search options</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Button
              size='large'
              startIcon={(
                <SvgIcon fontSize="small">
                  <SearchRoundedIcon />
                </SvgIcon>
              )}
              variant="contained"
              sx={{ minWidth: '25%', height: 'fit-content' }}
              onClick={handleSearchClick}
            >
              Search flights
            </Button>
          </Stack>
        </Stack>
      </Card>
    </>
  )
}

FlightsSearch.propTypes = {
  departureAirport: PropTypes.any,
  setDepartureAirport: PropTypes.func,
  arrivalAirport: PropTypes.any,
  setArrivalAirport: PropTypes.func,
  date: PropTypes.any,
  setDate: PropTypes.func,
  setSearchCommenced: PropTypes.func,
  setFlights: PropTypes.func
}
