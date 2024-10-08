import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Slider,
  Stack,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { formatCurrency } from 'src/utils/helpers/format-currency';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

const minDistance = 5
const maxStep = 20
const defaultRange = [3, 10]

const calculateValue = (value) => 10000 * value

const transitOptions = [
  { index: 0, title: 'No Transit' },
  { index: 1, title: '1 Transit' },
  { index: 2, title: '2 Transit' },
  { index: 3, title: '3 or more Transit' },
]

export const FlightsFilter = (props) => {
  const {
    flights,
    setFilteredFlights
  } = props

  const [airlines, setAirlines] = useState([])

  const [selectedAirlines, setSelectedAirlines] = useState([...new Set(airlines.map(airline => airline.id))])
  const [priceRange, setPriceRange] = useState(defaultRange)
  const [selectedTransitOptions, setSelectedTransitOptions] = useState([...new Set(transitOptions.map(option => option.index))])

  const handleAirlinesChange = (airline) => {
    setSelectedAirlines(prev => {
      if (prev.includes(airline)) {
        return prev.filter(a => a !== airline);
      } else {
        return [...prev, airline];
      }
    });
  };

  const handlePriceChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], maxStep - minDistance);
        setPriceRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPriceRange([clamped - minDistance, clamped]);
      }
    } else {
      setPriceRange(newValue);
    }
  };

  const handleTransitOptionChange = (transitOptionIndex) => {
    setSelectedTransitOptions(prev => {
      if (prev.includes(transitOptionIndex)) {
        return prev.filter(a => a !== transitOptionIndex);
      } else {
        return [...prev, transitOptionIndex];
      }
    });
  }

  const getUniqueAirlines = (flights) => {
    return flights.reduce((acc, current) => { // get unique airlines value
      current.airlines.forEach(airline => {
        const x = acc.find(item => item.id === airline.id);
        if (!x) {
          acc.push(airline);
        }
      });
      return acc;
    }, []).sort((a, b) => a.name.localeCompare(b.name)) // sort alphabetically
  }

  useEffect(() => {
    setAirlines(getUniqueAirlines(flights))
    setSelectedAirlines([...new Set(getUniqueAirlines(flights).map(airline => airline.id))])
  }, [flights])

  useEffect(() => {
    const filteredFlights = flights.filter(flight =>
      flight.airlines.some(airline => selectedAirlines.includes(airline.id)) &&
      flight.price >= calculateValue(priceRange[0]) &&
      flight.price <= calculateValue(priceRange[1])
      &&
      selectedTransitOptions.includes(flight.legs.length ? flight.legs.length - 1 : 0)
    );
    console.log(selectedAirlines)
    console.log(filteredFlights)
    setFilteredFlights(filteredFlights);
  }, [selectedAirlines, priceRange,
    // flights, 
    selectedTransitOptions
  ]);

  return (
    <Stack
      spacing={1}
    >
      <Typography variant='h6'>
        Filters
      </Typography>
      <Accordion
        elevation={0}
        sx={{
          "&.MuiAccordion-root:before": {
            height: '1px', // Set a specific height for the line
            backgroundColor: 'rgba(0, 0, 0, 0.12)', // Set the color of the line
          }
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRoundedIcon />}
          aria-controls="filter-airlines-content"
          id="filter-airlines-header"
        >
          <Typography variant='body1'>Airlines</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {airlines.map((airline, index) => {
              return (
                <FormControlLabel
                  key={airline.id}
                  control={
                    <Checkbox
                      defaultChecked
                      checked={selectedAirlines.includes(airline.id)}
                      onChange={() => handleAirlinesChange(airline.id)}
                    />
                  }
                  label={
                    <Stack
                      direction="row"
                      spacing={1.25}
                      alignItems="center"
                    >
                      <img
                        src={airline.logo}
                        alt={airline.name}
                        loading="lazy"
                        style={{ width: "2rem" }}
                      />
                      <Typography variant='body2'>
                        {airline.name}
                      </Typography>
                    </Stack>
                  }
                />
              )
            })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion
        disableGutters={true}
        elevation={0}
        sx={{
          "&.Mui-expanded:before": {
            opacity: 1
          }
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRoundedIcon />}
          aria-controls="filter-price-content"
          id="filter-price-header"
        >
          <Typography variant='body1'>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack
            direction='row'
            justifyContent='space-between'
          >
            <Typography variant='body1'>
              {formatCurrency(calculateValue(priceRange[0]))}
            </Typography>
            <Typography variant='body1'>
              -
            </Typography>
            <Typography variant='body1'>
              {formatCurrency(calculateValue(priceRange[1]))}
            </Typography>
          </Stack>
          <Slider
            getAriaLabel={() => 'Price Range'}
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="off"
            getAriaValueText={(value) => (formatCurrency(value))}
            disableSwap
            step={1}
            min={1}
            max={maxStep}
            scale={calculateValue}
          />
        </AccordionDetails>
      </Accordion>
      <Accordion 
        disableGutters={true}
        elevation={0}
        sx={{
          "&.Mui-expanded:before": {
            opacity: 1
          }
        }}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRoundedIcon />}
          aria-controls="filter-price-content"
          id="filter-price-header"
        >
          <Typography variant='body1'>Transit</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
              {transitOptions.map((option) => {
                return (
                  <FormControlLabel
                    key={option.index}
                    control={
                      <Checkbox
                        defaultChecked
                        checked={selectedTransitOptions.includes(option.index)}
                        onChange={() => handleTransitOptionChange(option.index)}
                      />
                    }
                    label={            
                      <Typography variant='body2'>
                        {option.title}
                      </Typography>
                    }
                  />
                )
              })}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}