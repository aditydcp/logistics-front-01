import {
  Chip,
  Stack,
  SvgIcon,
  Typography
} from '@mui/material'
import WorkOutlineRoundedIcon from '@mui/icons-material/WorkOutlineRounded';
import SwitchCameraRoundedIcon from '@mui/icons-material/SwitchCameraRounded';

export const FlightTicketDetails = (props) => {
  const {
    flight,
    type = 'column',
    topLevelSpacing = 1,
    topLevelAlignItems = 'flex-center',
    weightSizeSpacing = 0.5,
    weightSizeAlignItems = 'flex-center',
    categoriesPackagingSpacing = 1,
  } = props

  return (
    <Stack
      direction={type}
      spacing={topLevelSpacing}
      alignItems={topLevelAlignItems}
    >
      <Stack // weight and size
        spacing={weightSizeSpacing}
        alignItems={weightSizeAlignItems}
        sx={{
          width: '-webkit-fill-available'
        }}
      >
        <Stack // weight
          direction='row'
          spacing={1}
          alignItems='center'
        >
          <SvgIcon sx={{ fontSize: '1rem' }}>
            <WorkOutlineRoundedIcon />
          </SvgIcon>
          <Typography variant='body2'>
            Available {flight.weightLimit} kg
          </Typography>
        </Stack>
        <Stack // size
          direction='row'
          spacing={1}
          alignItems='center'
        >
          <SvgIcon sx={{ fontSize: '1rem' }}>
            <SwitchCameraRoundedIcon />
          </SvgIcon>
          <Typography variant='body2'>
            Size Available {flight.sizeLimit} m<sup>3</sup>
          </Typography>
        </Stack>
      </Stack>
      <Stack
        spacing={categoriesPackagingSpacing}
        sx={{
          width: '-webkit-fill-available'
        }}
      >
        <Stack // categories
          spacing={0.5}
        >
          <Typography variant='body2'>
            Categories
          </Typography>
          <Stack
            direction='row'
            flexWrap='wrap'
            spacing={1}
            useFlexGap
          >
            {flight.categoriesData.map((category) => (
              <Chip
                key={category.id}
                label={category.name}
                size='small'
              />
            ))}
          </Stack>
        </Stack>
        <Stack // packaging
          spacing={0.5}
        >
          <Typography variant='body2'>
            Packaging
          </Typography>
          <Stack
            direction='row'
            flexWrap='wrap'
            spacing={1}
            useFlexGap
          >
            {flight.packagingData.map((packaging) => (
              <Chip
                key={packaging.id}
                label={packaging.name}
                size='small'
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}