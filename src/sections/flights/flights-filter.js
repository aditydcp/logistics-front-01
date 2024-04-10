import { useState, useEffect } from 'react';
import { 
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  Stack, 
  Typography 
} from '@mui/material';
import PropTypes from 'prop-types';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export const FlightsFilter = (props) => {
  const { 
    flights,
    setFilteredFlights
  } = props

  const airlines = flights.reduce((acc, current) => { // get unique airlines value
    const x = acc.find(item => item.airline === current.airline);
    if (!x) {
       return acc.concat([current]);
    } else {
       return acc;
    }
  }, []).map(flight => ({ // get only the airline and logo
    name: flight.airline,
    logo: flight.airlineLogo
  })).sort((a, b) => a.name.localeCompare(b.name)) // sort alphabetically

  const [selectedAirlines, setSelectedAirlines] = useState([...new Set(airlines.map(airline => airline.name))])

  const onFilterChange = (airline) => {
    setSelectedAirlines(prev => {
      if (prev.includes(airline)) {
        return prev.filter(a => a !== airline);
      } else {
        return [...prev, airline];
      }
    });
  };

  useEffect(() => {
    const filteredFlights = flights.filter(flight => selectedAirlines.includes(flight.airline));
    setFilteredFlights(filteredFlights);
  }, [selectedAirlines, flights, setFilteredFlights]);

  return (
    <Stack 
      spacing={1}
    >
      <Typography variant='h6'>
        Filters
      </Typography>
      <Accordion 
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRoundedIcon />}
          // aria-controls="panel2-content"
          // id="panel2-header"
        >
          <Typography variant='body1'>Airlines</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
              {airlines.map((airline, index) => {
                return (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        defaultChecked
                        checked={selectedAirlines.includes(airline.name)}
                        onChange={() => onFilterChange(airline.name)}
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
      >
        <AccordionSummary
          expandIcon={<KeyboardArrowDownRoundedIcon />}
          // aria-controls="panel2-content"
          // id="panel2-header"
        >
          <Typography variant='body1'>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}