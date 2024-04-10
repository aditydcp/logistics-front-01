import { 
  Stack, 
  SvgIcon,
  Typography 
} from '@mui/material';
import PropTypes from 'prop-types';

export const FlightFeature = (props) => {
  return (
    <Stack
      direction="row"
      spacing={0.75}
      alignItems="center"
    >
      <SvgIcon sx={{ fontSize: '1rem' }}>
        {props.icon}
      </SvgIcon>
      {props.text && 
        <Typography
          variant='overline'
          sx={{ 
            fontSize: '0.8rem',
            lineHeight: '2' 
          }}
        >
          {props.text}
        </Typography>
      }
    </Stack>
  )
}

FlightFeature.propTypes = {
  text: PropTypes.any,
  icon: PropTypes.any
};