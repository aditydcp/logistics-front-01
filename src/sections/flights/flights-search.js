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
import { AirportSearch } from './flights-airport-search';
import { MyDatePicker } from 'src/components/date-picker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';
// import 'dayjs/locale/en-gb';
// import { DatePicker } from '@mui/x-date-pickers';

const now = new Date();

const airports = [
  { name: "Changi Intl" },
  { name: "Kuala Lumpur International Airport" },
  { name: "Soekarno Hatta International Airport" },
  { name: "Yogyakarta International Airport" },
  { name: "Adi Sutjipto" },
  { name: "Juanda" },
];

const flightsData = [
  {
    id: '1',
    airline: 'Malaysia Airlines',
    planeModel: 'MH-360',
    baggageSize: 1000,
    departure: {
      airport: airports[0].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[1].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    }
  },
  {
    id: '2',
    airline: 'Malaysia Airlines',
    planeModel: 'MH-871',
    baggageSize: 1000,
    departure: {
      airport: airports[1].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[5].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    }
  },
  {
    id: '3',
    airline: 'Citilink',
    planeModel: 'QG-252',
    baggageSize: 350,
    departure: {
      airport: airports[2].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[5].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    }
  },
  {
    id: '4',
    airline: 'Garuda Indonesia',
    planeModel: 'GA-855',
    baggageSize: 1500,
    departure: {
      airport: airports[0].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[5].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    }
  },
  {
    id: '5',
    airline: 'Garuda Indonesia',
    planeModel: 'GA-837',
    baggageSize: 1500,
    departure: {
      airport: airports[0].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[2].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    }
  },
  {
    id: '6',
    airline: 'Garuda Indonesia',
    planeModel: 'GA-304',
    baggageSize: 1500,
    departure: {
      airport: airports[2].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[5].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    }
  },
  {
    id: '7',
    airline: 'Citilink',
    planeModel: 'QG-527',
    baggageSize: 350,
    departure: {
      airport: airports[0].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airports[2].name,
      time: subDays(subHours(now, 7), 1).getTime(),
    }
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

  const handleSearchClick = () => {
    setDepartureAirport(localDepartureAirport)
    setArrivalAirport(localArrivalAirport)
    setDate(localDate)
    setFlights(flightsData)
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
                <Typography variant='body2'>Advanced search options</Typography>
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
