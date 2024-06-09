import { format } from 'date-fns';
import {
  Stack,
  Typography
} from '@mui/material';
import TrendingFlatRoundedIcon from '@mui/icons-material/TrendingFlatRounded';
import PropTypes from 'prop-types';

export const FlightSummary = (props) => {
  const arrivalDate = new Date(props.arrivalTime);
  const departureDate = new Date(props.departureTime);
  const dateDifference = arrivalDate.getDate() !== departureDate.getDate() ? Math.ceil(Math.abs(arrivalDate - departureDate) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <Stack
      direction="row"
      spacing={0.5}
      alignItems="center"
      justifyContent="center"
      sx={{
        my: 0.5
      }}
    >
      {dateDifference > 0 &&
        <Typography variant='caption' sx={{ visibility: 'collapse' }}>
          {`+ ${dateDifference} day${dateDifference === 1 ? '' : 's'}`}
        </Typography>
      }
      <Stack
        spacing={0}
        alignItems="center"
      >
        <Typography
          variant='body1'
          component='span'
          sx={{
            lineHeight: '1.5',
          }}
        >
          {format(props.departureTime, 'HH:mm')}
        </Typography>
        <Typography
          variant='button'
          component='span'
          sx={{
            lineHeight: 'normal',
          }}
        >
          {props.departureAirport.code}
        </Typography>
      </Stack>
      <TrendingFlatRoundedIcon />
      <Stack
        spacing={0}
        alignItems="center"
      >
        <Typography
          variant='body1'
          component='span'
          sx={{
            lineHeight: '1.5',
          }}
        >
          {format(props.arrivalTime, 'HH:mm')}
        </Typography>
        <Typography
          variant='button'
          component='span'
          sx={{
            lineHeight: 'normal',
          }}
        >
          {props.arrivalAirport.code}
        </Typography>
      </Stack>
      {dateDifference > 0 &&
        <Typography variant='caption'>
          {`+ ${dateDifference} day${dateDifference === 1 ? '' : 's'}`}
        </Typography>
      }
    </Stack>
  )
}

FlightSummary.propTypes = {
  departureTime: PropTypes.any,
  departureAirport: PropTypes.any,
  arrivalTime: PropTypes.any,
  arrivalAirport: PropTypes.any,
};