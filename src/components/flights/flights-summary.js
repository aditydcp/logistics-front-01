import { format } from 'date-fns';
import { 
  Stack, 
  Typography
} from '@mui/material';
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded';
import PropTypes from 'prop-types';

export const FlightSummary = (props) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      justifyItems="center"
    >
      <Stack
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant='body1'>
          {format(props.departureTime, 'HH:mm')}
        </Typography>
        <Typography variant='button'>
          {props.departureAirport.code}
        </Typography>
      </Stack>
      <TrendingFlatRoundedIcon />
      <Stack
        spacing={0}
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant='body1'>
          {format(props.arrivalTime, 'HH:mm')}
        </Typography>
        <Typography variant='button'>
          {props.arrivalAirport.code}
        </Typography>
      </Stack>
    </Stack>
  )
}

FlightSummary.propTypes = {
  departureTime: PropTypes.any,
  departureAirport: PropTypes.any,
  arrivalTime: PropTypes.any,
  arrivalAirport: PropTypes.any,
};