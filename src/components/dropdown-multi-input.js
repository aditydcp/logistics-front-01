import {
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  IconButton
} from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel';

const DropdownMultiInput = (props) => {
  const {
    labelId,
    selectId,
    label,
    data,
    value,
    setValue,
  } = props

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <Stack
      direction='row'
      spacing={1}
      alignItems='flex-end'
      sx={{
        width: '-webkit-fill-available'
      }}
    >
      <FormControl
        variant="standard"
        sx={{
          width: '-webkit-fill-available'
        }}
      >
        <InputLabel id={labelId}>
          {label}
        </InputLabel>
        <Select
          labelId={labelId}
          id={selectId}
          multiple
          value={value}
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setValue(
              // On autofill we get a stringified value.
              typeof value === 'string' ? value.split(',') : value,
            )
          }}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  size='small'
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map((item) => (
            <MenuItem
              key={item.name}
              value={item.name}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {value.length > 0 &&
        <IconButton
          size="small"
          sx={{
            height: "fit-content"
          }}
          aria-label='clear'
          onClick={() => setValue([])}
        >
          <CancelIcon fontSize='inherit' />
        </IconButton>
      }
    </Stack>
  )
}

export default DropdownMultiInput