import { useState } from 'react'
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { FlightDetailSection } from './flights-detail'
import { FlightRatesSection } from './flights-rates'

const tabs = [
  'Flight Details',
  'Rates',
]

export const FlightInfo = (props) => {
  const {
    flight
  } = props

  const theme = useTheme()

  const [display, setDisplay] = useState(tabs[0])

  const handleChange = (event, newDisplay) => {
    if (newDisplay !== null) {
      setDisplay(newDisplay);
    }
    console.log(display)
  }

  return (
    <Stack
      spacing={1}
      useFlexGap
    >
      <ToggleButtonGroup
        color="primary"
        value={display}
        exclusive
        onChange={handleChange}
        aria-label="Flight Details"
        sx={{
          mx: 1,
          gap: 1,
        }}
      >
        {tabs.map((tab) => (
          <ToggleButton
            key={tab}
            value={tab}
            sx={{
              textTransform: 'capitalize',
              border: 'unset',
              px: 3,
              py: 1,
              borderRadius: 0,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                backgroundColor: 'unset',
                borderBottom: `2px solid ${theme.palette.primary.main}`,
              }
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 500,
              }}
            >
              {tab}
            </Typography>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {display === tabs[0] ?
        <FlightDetailSection
          flight={flight}
        />
        :
        <FlightRatesSection
          flight={flight}
        />}
    </Stack>
  )
}