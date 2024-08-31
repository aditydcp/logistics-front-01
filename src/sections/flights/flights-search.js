import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles'
import PropTypes from 'prop-types';
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
import {
  categoriesData,
  packagingData,
  airportsData,
  flightsData
} from 'src/utils/helpers/placeholder-data';
import DropdownMultiInput from 'src/components/dropdown-multi-input';
import apiClient from '../../utils/helpers/api-client';
import { transformFlightData } from '../../utils/helpers/flight-data-transformator';

export const FlightsSearch = (props) => {
  const theme = useTheme()
  const {
    airportOptions,
    categoryOptions,
    packagingOptions,
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
  const [departureAirportOptions, setDepartureAirportOptions] = useState(airportOptions);

  const [localArrivalAirport, setLocalArrivalAirport] = useState(arrivalAirport);
  const [inputArrivalAirport, setInputArrivalAirport] = useState("");
  const [arrivalAirportOptions, setArrivalAirportOptions] = useState(airportOptions);

  const [localDate, setLocalDate] = useState(date);

  const [advanceSearch, setAdvanceSearch] = useState(
    (weight !== null || size !== null) || (categories && categories.length !== 0) || (packaging && packaging.length !== 0)
  )

  const [localWeight, setLocalWeight] = useState(weight || null);
  const [localSize, setLocalSize] = useState(size || null);
  const [localCategories, setLocalCategories] = useState(categories || [])
  const [localPackaging, setLocalPackaging] = useState(packaging || [])

  useEffect(() => {
    setDepartureAirportOptions(airportOptions)
    setArrivalAirportOptions(airportOptions)
  }, [airportOptions])

  const handleSwapAirport = () => {
    let temp = localArrivalAirport
    setLocalArrivalAirport(localDepartureAirport)
    setLocalDepartureAirport(temp)
  }

  const fetchFlights = async (
    departureAirport,
    arrivalAirport,
    date,
    advanceSearch,
    weight,
    size,
    categories,
    packaging
  ) => {
    if (!departureAirport || !arrivalAirport) {
      setFlights([])
      return
    }
    try {
      const response = await apiClient.get('flights/search', {
        params: {
          departure_airport_id: departureAirport.id,
          arrival_airport_id: arrivalAirport.id,
          departure_date: date,
          advance_search: advanceSearch,
          weight,
          size,
          category_ids: categories.map(category => category.id),
          packaging_ids: packaging.map(packaging => packaging.id),
        }
      });
      const flightData = transformFlightData(response.data.data)
      setFlights(flightData)
    } catch (error) {
      if (error.response.data.data.length === 0) {
        setFlights([])
        return
      }
      console.error('Error fetching flights:', error)
    }
  }

  const handleSearchClick = () => {
    setDepartureAirport(localDepartureAirport)
    setArrivalAirport(localArrivalAirport)
    setDate(localDate)
    setWeight(localWeight)
    setSize(localSize)
    setCategories(localCategories)
    setPackaging(localPackaging)
    fetchFlights(
      localDepartureAirport,
      localArrivalAirport,
      localDate,
      advanceSearch,
      localWeight,
      localSize,
      localCategories,
      localPackaging
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
            useFlexGap
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
              sx={{
                width: "30%",
                mx: 1.5
              }}
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
                  sx={{ ml: 1 }}
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
                    <DropdownMultiInput
                      labelId="categories-select-label"
                      selectId="categories-select"
                      label="Cargo Category"
                      data={categoryOptions}
                      value={localCategories}
                      setValue={setLocalCategories}
                    />
                    <DropdownMultiInput
                      labelId="packaging-select-label"
                      selectId="packaging-select"
                      label="Packaging"
                      data={packagingOptions}
                      value={localPackaging}
                      setValue={setLocalPackaging}
                    />
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
