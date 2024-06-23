import {
  Stack,
  Typography
} from '@mui/material';

export const FlightAvatar = (props) => {
  const {
    airline,
    flight,
    showPlaneModel = false,
    size = 'large',
    stackSpacing = 1.5,
    sx,
    typeSx,
  } = props;

  const sizes = {
    small: {
      imgWidth: '2.5rem',
      typeVariant: 'body1',
      typeComponent: 'p',
    },
    medium: {
      imgWidth: '2.5rem',
      typeVariant: 'h6',
      typeComponent: 'span',
    },
    large: {
      imgWidth: '3rem',
      typeVariant: 'h6',
      typeComponent: 'span',
    }
  }[size]

  return (
    <Stack
      direction='row'
      spacing={stackSpacing}
      alignItems='center'
      justifyContent='flex-start'
      sx={sx}
    >
      <img
        src={airline.logo}
        alt={airline.name}
        loading="lazy"
        style={{ width: sizes.imgWidth }}
      />
      <Stack>
        <Typography 
          variant={sizes.typeVariant} 
          component={sizes.typeComponent}
          sx={typeSx}
        >
          {airline.name}
        </Typography>
        {showPlaneModel &&
          <Typography variant='body2'>
            {flight ? flight.planeModel : '123 Alpha'}
          </Typography>
        }
      </Stack>
    </Stack>
  )
}