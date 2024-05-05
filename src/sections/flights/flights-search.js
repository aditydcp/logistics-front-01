import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types';
import { subDays, subHours } from 'date-fns';
import FlightTakeoffRoundedIcon from '@mui/icons-material/FlightTakeoffRounded';
import FlightLandRoundedIcon from '@mui/icons-material/FlightLandRounded';
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import EventIcon from '@mui/icons-material/Event';
import {
  Card,
  Chip,
  InputAdornment,
  OutlinedInput,
  SvgIcon,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Autocomplete,
  FormHelperText,
  IconButton,
  Button,
  Typography,
  Box, 
  Stack,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Input,
  InputLabel
} from '@mui/material';
import { AirportSearch } from 'src/components/flights/flights-airport-search';
import { MyDatePicker } from 'src/components/date-picker';

const now = new Date();

const categoriesData = [
  "General Cargo",
  "Special Cargo",
  "Live Animals",
  "Dangerous or Hazardous Cargo",
  "High-Value or Fragile Cargo",
  "Perishable Cargo",
  "Temperature-Controlled Cargo",
  "Mail Cargo",
  "Human Remains, Tissue and Organ Cargo",
]

const packagingData = [
  "Keranjang",
  "Karton",
  "Palet",
  "Wooden Palet",
  "Wooden Box",
  "Koli",
]

const airportsData = [
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
      airport: airportsData[0],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airportsData[1],
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
      airport: airportsData[1],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airportsData[5],
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
      airport: airportsData[2],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airportsData[5],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 500000,
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
      airport: airportsData[0],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airportsData[5],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 1200000,
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
      airport: airportsData[0],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airportsData[2],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 1200000,
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
      airport: airportsData[2],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airportsData[5],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 1200000,
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
      airport: airportsData[0],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    arrival: {
      airport: airportsData[2],
      time: subDays(subHours(now, 7), 1).getTime(),
    },
    price: 500000,
    categories: ['General Cargo', 'Mail Cargo'],
    packagings: ['Keranjang', 'Karton', 'Wooden Box'],
  },
]

export const FlightsSearch = (props) => {
  const theme = useTheme()
  const {
    departureAirport,
    setDepartureAirport,
    arrivalAirport,
    setArrivalAirport,
    date,
    weight,
    size,
    categories,
    packaging,
    setSearchCommenced,
    setFlights,
    setDate,
    setWeight,
    setSize,
    setCategories,
    setPackaging,
  } = props

  const [localDepartureAirport, setLocalDepartureAirport] = useState(departureAirport);
  const [inputDepartureAirport, setInputDepartureAirport] = useState("");
  const [departureAirportOptions, setDepartureAirportOptions] = useState(airportsData);

  const [localArrivalAirport, setLocalArrivalAirport] = useState(arrivalAirport);
  const [inputArrivalAirport, setInputArrivalAirport] = useState("");
  const [arrivalAirportOptions, setArrivalAirportOptions] = useState(airportsData);

  const [localDate, setLocalDate] = useState(date);

  const [advanceSearch, setAdvanceSearch] = useState(false)

  const [localWeight, setLocalWeight] = useState(null);
  const [localSize, setLocalSize] = useState(null);
  const [localCategories, setLocalCategories] = useState([])
  const [localPackaging, setLocalPackaging] = useState([])

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  useEffect(
    () => {
      // console.log(localDepartureAirport)
      // console.log(localArrivalAirport)
      // console.log(localWeight)
      // console.log(localSize)
      // console.log(advanceSearch)
    }, [
      // localWeight,
      // localSize,
      // departureAirport,
      // arrivalAirport,
      // localDepartureAirport,
      // localArrivalAirport
      // advanceSearch
    ]
  )

  const handleSwapAirport = () => {
    let temp = localArrivalAirport
    setLocalArrivalAirport(localDepartureAirport)
    setLocalDepartureAirport(temp)
  }

  const filterFlights = (
    flights,
    departureAirport,
    arrivalAirport,
    date,
    weight,
    size,
    categories,
    packaging
  ) => {
    return flights.filter(flight => {
      const departureMatches = flight.departure.airport.name === departureAirport.name;
      // Filter by departure airport
      if (flight.departure.airport.name !== departureAirport.name) {
        return false
      }

      // Filter by arrival airport
      if (flight.arrival.airport.name !== arrivalAirport.name) {
        return false
      }

      // // Filter by date
      // if (new Date(flight.departure.time).toDateString() !== new Date(date).toDateString()) {
      //   return false
      // }
      
      if (advanceSearch) {
        // Filter by weight
        if (weight && flight.weightLimit < weight) {
          return false; // Exclude if flight's weight limit is less than the required weight
        }

        // Filter by size
        if (size && flight.sizeLimit < size) {
          return false; // Exclude if flight's size limit is less than the required size
        }

        // Filter by categories
        if (categories && categories.length > 0) {
          const hasMatchingCategory = categories.some(category => flight.categories.includes(category));
          if (!hasMatchingCategory) {
            return false; // Exclude if no matching category is found
          }
        }

        // Filter by packaging
        if (packaging && packaging.length > 0) {
          const hasMatchingPackaging = packaging.some(packaging => flight.packaging.includes(packaging));
          if (!hasMatchingPackaging) {
            return false; // Exclude if no matching packaging is found
          }
        }
      }

      // If all conditions pass, include the flight
      return true;
    });
  };

  const handleSearchClick = () => {
    setDepartureAirport(localDepartureAirport)
    setArrivalAirport(localArrivalAirport)
    setDate(localDate)
    setWeight(localWeight)
    setSize(localSize)
    setCategories(localCategories)
    setPackaging(localPackaging)
    setFlights(
      filterFlights(
        flightsData,
        localDepartureAirport,
        localArrivalAirport,
        localDate,
        localWeight,
        localSize,
        localCategories,
        localPackaging
      )
    )
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
            alignItems="flex-end"
            justifyContent="space-between"
            spacing={2}
            useFlexGap
          >
            <Accordion 
              disableGutters={true}
              elevation={0}
              expanded={advanceSearch}
              onChange={(event, value) => setAdvanceSearch(value)}
              sx={{
                width: '-webkit-fill-available',
                border: `1px solid ${theme.palette.neutral[100]}`
              }}
            >
              <AccordionSummary
                expandIcon={<KeyboardArrowDownRoundedIcon />}
                aria-controls="flights-advanced-options-content"
                id="flights-advanced-options-header"
                sx={{
                  m: 0,
                  '& .MuiAccordionSummary-content': {
                    margin: 0, // Override the margin to 0
                  },
                }}
              >
                <Typography variant='body1'>Advanced search options</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Stack
                  spacing={2}
                  sx={{ ml: 1}}
                >
                  <Stack
                    direction='row'
                    spacing={3}
                    useFlexGap
                  >
                    <FormControl 
                      variant="standard"
                      sx={{ 
                        width: '-webkit-fill-available'
                      }}
                    >
                      <InputLabel id="baggage-weight-label">
                        Cargo Weight
                      </InputLabel>
                      <Input
                        labelId="baggage-weight-label"
                        value={localWeight}
                        onChange={(event) => {
                          setLocalWeight(event.target.value === '' ? 0 : Number(event.target.value));
                        }}
                        inputProps={{
                          step: 500,
                          min: 500,
                          max: 5000,
                          type: 'number',
                          'aria-labelledby': 'weight-slider',
                        }}
                        endAdornment={
                          <InputAdornment position='end'>
                            <Typography variant='body2'>
                              kg
                            </Typography>
                          </InputAdornment>
                        }
                      />
                      {/* <FormHelperText>Flights with a maximum baggage weight equal to or greater than this value will be included in the search results.</FormHelperText> */}
                    </FormControl>
                    <FormControl 
                      variant="standard"
                      sx={{ 
                        width: '-webkit-fill-available'
                      }}
                    >
                      <InputLabel id="baggage-size-label">
                        Cargo Size
                      </InputLabel>
                      <Input
                        labelId="baggage-size-label"
                        value={localSize}
                        onChange={(event) => {
                          setLocalSize(event.target.value === '' ? 0 : Number(event.target.value));
                        }}
                        inputProps={{
                          step: 500,
                          min: 500,
                          max: 5000,
                          type: 'number',
                          'aria-labelledby': 'weight-slider',
                        }}
                        endAdornment={
                          <InputAdornment position='end'>
                            <Typography variant='body2'>
                              m<sup>3</sup>
                            </Typography>
                          </InputAdornment>
                        }
                      />
                      {/* <FormHelperText>Flights with a maximum baggage size equal to or greater than this value will be included in the search results.</FormHelperText> */}
                    </FormControl>
                  </Stack>
                  <Stack
                    direction='row'
                    spacing={3}
                    useFlexGap
                  >
                    <Stack
                      direction='row'
                      spacing={1}
                      alignItems='flex-end'
                      sx={{ 
                        width: '-webkit-fill-available'
                      }}
                    >
                      <FormControl 
                        variant="standard"
                        sx={{ 
                          width: '-webkit-fill-available'
                        }}
                      >
                        <InputLabel id="categories-select-label">
                          Cargo Category
                        </InputLabel>
                        <Select
                          labelId="categories-select-label"
                          id="categories-select"
                          multiple
                          value={localCategories}
                          onChange={(event) => {
                            const {
                              target: { value },
                            } = event;
                            setLocalCategories(
                              // On autofill we get a stringified value.
                              typeof value === 'string' ? value.split(',') : value,
                          )}}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} size='small'/>
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {categoriesData.map((category) => (
                            <MenuItem
                              key={category}
                              value={category}
                            >
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {localCategories.length > 0 && 
                        <IconButton
                          size="small"
                          sx={{ 
                            height: "fit-content"
                          }}
                          aria-label='clear categories'
                          onClick={() => setLocalCategories([])}
                        >
                          <CancelIcon fontSize='inherit' />
                        </IconButton>
                      }
                    </Stack>
                    <Stack
                      direction='row'
                      spacing={1}
                      alignItems='flex-end'
                      sx={{ 
                        width: '-webkit-fill-available'
                      }}
                    >
                      <FormControl 
                        variant="standard"
                        sx={{ 
                          width: '-webkit-fill-available'
                        }}
                      >
                        <InputLabel id="packaging-select-label">
                          Packaging
                        </InputLabel>
                        <Select
                          labelId="packaging-select-label"
                          id="packaging-select"
                          multiple
                          value={localPackaging}
                          onChange={(event) => {
                            const {
                              target: { value },
                            } = event;
                            setLocalPackaging(
                              // On autofill we get a stringified value.
                              typeof value === 'string' ? value.split(',') : value,
                          )}}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => (
                                <Chip key={value} label={value} size='small'/>
                              ))}
                            </Box>
                          )}
                          MenuProps={MenuProps}
                        >
                          {packagingData.map((packaging) => (
                            <MenuItem
                              key={packaging}
                              value={packaging}
                            >
                              {packaging}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {localPackaging.length > 0 && 
                        <IconButton
                          size="small"
                          sx={{ 
                            height: "fit-content"
                          }}
                          aria-label='clear packaging'
                          onClick={() => setLocalPackaging([])}
                        >
                          <CancelIcon fontSize='inherit' />
                        </IconButton>
                      }
                    </Stack>
                  </Stack>
                </Stack>
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
              sx={{ 
                minWidth: '25%',
                height: 'fit-content',
                lineHeight: '2',
                // mb: 1
              }}
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
