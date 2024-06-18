import { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import PropTypes from 'prop-types';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';
import { Box, TextField } from "@mui/material"

const TextFieldWrapper = (props) => {
  return (
    <TextField 
      {...props}
      value={props.value === "EEEE, DD MMMM YYYY" ? "" : props.value}
      placeholder=""
      variant="standard"
    />
  )
}

export const MyDatePicker = (props) => {
  const [open, setOpen] = useState(false);

  const handleDateChange = (date) => {
    if (props.setSelectedDate) {
      props.setSelectedDate(date);
    }
    if (props.customChangeHandler) {
      props.customChangeHandler(date);
    }
    setOpen(false);
  };

  return (
    <Box 
      sx={{
        ...props.sx,
        display: 'flex',
        alignItems: 'flex-end',
      }}
    >
      {props.icon && props.icon}
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
        <DatePicker 
          label={props.label}
          format={props.format}
          disablePast
          defaultValue={null}
          value={props.selectedDate} 
          onChange={handleDateChange}
          open={open}
          onOpen={() => setOpen(true)} // Open calendar on focus
          onClose={() => setOpen(false)} // Close calendar on blur
          sx={{
            width: "100%"
          }}
          slots={{
            textField: TextFieldWrapper,
          }}
          slotProps={{
            textField: {
              onClick: () => setOpen(true),
            },
            openPickerButton: {
              disabled: true,
              sx: { display: "none" }
            }
          }}
        />
      </LocalizationProvider>
    </Box>
  );
};

MyDatePicker.PropTypes = {
  label: PropTypes.string,
  format: PropTypes.string,
  selectedDate: PropTypes.any,
  setSelectedDate: PropTypes.func,
  icon: PropTypes.any,
  customChangeHandler: PropTypes.func,
}