import { cloneElement, Children } from "react";
import { Autocomplete, TextField, Box, InputAdornment, SvgIcon } from "@mui/material";
import PropTypes from 'prop-types';

export const AirportSearch = (props) => {
  return (
    <Box sx={{ width: "100%", display: 'flex', alignItems: 'flex-end' }}>
      {/* {props.children} */}
      {props.icon}
      <Autocomplete
        id={props.id}
        sx={props.sx ? props.sx : { width: "100%" }}
        disableClearable
        autoHighlight
        forcePopupIcon={props.forcePopupIcon ? props.forcePopupIcon : false}
        options={props.options}
        noOptionsText={props.noOptionsText ? props.noOptionsText : "No result found"}
        getOptionLabel={(option) => option.name}
        value={props.value}
        onChange={(e, newValue) => {
          props.setValue(newValue);
        }}
        inputValue={props.inputValue}
        onInputChange={(e, newValue) => {
          props.setInputValue(newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={props.label}
            variant="standard"
            // InputProps={{
            //   startAdornment: (
            //     <InputAdornment position="start">
            //       <SvgIcon
            //         color="action"
            //         fontSize="small"
            //       >
            //         {props.children}
            //       </SvgIcon>
            //     </InputAdornment>
            //   ),
            // }}
            // onKeyDown={(e) => {
            //   if (
            //     e.key === "Enter" &&
            //     options.findIndex((o) => o.name === inputValue) === -1
            //   ) {
            //     setOptions((o) => o.concat({ name: inputValue }));
            //   }
            // }}
          />
        )}
      />
    </Box>
  )
}

AirportSearch.propTypes = {
  id: PropTypes.string,
  sx: PropTypes.any,
  forcePopupIcon: PropTypes.bool,
  options: PropTypes.array,
  noOptionsText: PropTypes.string,
  value: PropTypes.any,
  setValue: PropTypes.func,
  inputValue: PropTypes.any,
  setInputValue: PropTypes.func,
  label: PropTypes.string,
  icon: PropTypes.any
};