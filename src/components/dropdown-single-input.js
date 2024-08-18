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

const DropdownSingleInput = (props) => {
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
          value={value}
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setValue(value)
          }}
          MenuProps={MenuProps}
        >
          {data.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
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

export default DropdownSingleInput