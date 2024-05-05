import { useState } from 'react'
import {
  Button,
  Card,
  Stack,
  Typography
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

export const FlightsFormSelected = (props) => {
  const {
    selectedFlight,
    setSelectedFlight,
  } = props

  const theme = useTheme()

  const onDeselect = () => {
    setSelectedFlight(null)
  }

  return (
    <>
      <Card
        elevation={0}
        sx={{
          p: 3,
          // borderColor: theme.palette.primary.main
          border: `1px solid ${theme.palette.primary.main}`
        }}
      >
        <Stack
          spacing={1}
          useFlexGap
        >
          <Typography variant='h6' component='span'>
            Flight has been selected
          </Typography>
          <Button
            variant='outlined'
            sx={{
              width: 'fit-content',
            }}
            onClick={onDeselect}
          >
            Cancel selection
          </Button>
        </Stack>
      </Card>
    </>
  )
}