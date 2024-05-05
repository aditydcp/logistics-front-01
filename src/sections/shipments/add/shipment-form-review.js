import {
  Box,
  Divider,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import FlightRoundedIcon from '@mui/icons-material/FlightRounded';

export const ShipmentFormReview = (props) => {
  const {
    shipment,
    flight,
  } = props;

  const theme = useTheme()

  return (
    <Stack
      spacing={2}
      useFlexGap
      direction='row'
    >
      <Box
        sx={{
          width: '-webkit-fill-available'
        }}
      >
        <Stack
          spacing={1}
          useFlexGap
        >
          <Stack
            spacing={1}
            useFlexGap
            direction='row'
          >
            <SvgIcon>
              <AssignmentRoundedIcon />
            </SvgIcon>
            <Typography variant='h6' component='span'>
              Shipment Details
            </Typography>
          </Stack>
          {shipment ? (
            <Typography variant='body'>
              Shipment details
            </Typography>
          ) : (
            <Typography variant='body'>
              Please fill out shipment details first
            </Typography>
          )}
        </Stack>
      </Box>
      <Divider 
        orientation='vertical'
        flexItem
        sx={{
          borderColor: theme.palette.neutral[300]
        }}
      />
      <Box
        sx={{
          width: '-webkit-fill-available'
        }}
      >
        <Stack
          spacing={1}
          useFlexGap
        >
          <Stack
            spacing={1}
            useFlexGap
            direction='row'
          >
            <SvgIcon>
              <FlightRoundedIcon />
            </SvgIcon>
            <Typography variant='h6' component='span'>
              Flight Details
            </Typography>
          </Stack>
          {flight ? (
            <Typography variant='body'>
              Selected flight info
            </Typography>
          ) : (
            <Typography variant='body'>
              Please choose a flight first
            </Typography>
          )}
          
        </Stack>
      </Box>
    </Stack>
  )
}