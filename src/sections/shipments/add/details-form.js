import { useEffect, useState } from "react";
import {
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  MenuProps,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CompanySearch } from "src/components/shipments/shipments-company-search";
import { MyDatePicker } from 'src/components/date-picker';
import { useAuth } from "src/hooks/use-auth";
import DropdownSingleInput from "src/components/dropdown-single-input";

export const DetailsForm = (props) => {
  const {
    shipment,
    setShipment,
    setFlightSearchParams,
    categoryOptions,
    packagingOptions,
    exporters,
    importers,
    handleNext,
    handleComplete,
    handleIncomplete,
  } = props

  const auth = useAuth();

  const [inputExporter, setInputExporter] = useState("")
  const [inputImporter, setInputImporter] = useState("")

  const onContinue = () => {
    let allPropertiesAreNotNull = Object.values(shipment).every(item => item !== null);
    allPropertiesAreNotNull ? handleComplete() : handleIncomplete()
    handleNext()
  }

  const updateFlightSearchParams = (field, value) => {
    setFlightSearchParams((prevFlightSearchParams) => ({
      ...prevFlightSearchParams,
      [field]: value,
    }));
  };

  const updateShipment = (field, value) => {
    setShipment((prevShipment) => ({
      ...prevShipment,
      [field]: value,
    }));
    if (!value) handleIncomplete()
  };

  const updateTotalWeight = ({ newWeight = null, newQuantity = null } = {}) => {
    const weight = newWeight !== null ? newWeight : shipment.weightIndividual;
    const quantity = newQuantity !== null ? newQuantity : shipment.quantity;
    let totalWeight = weight * quantity
    updateShipment("weightTotal", totalWeight);
  };

  const updateTotalSize = ({ newSize = null, newQuantity = null } = {}) => {
    const size = newSize !== null ? newSize : shipment.sizeIndividual;
    const quantity = newQuantity !== null ? newQuantity : shipment.quantity;
    let totalSize = size * quantity
    updateShipment("sizeTotal", totalSize);
  };

  return (
    <Card sx={{ p: 6 }}>
      <Stack
        spacing={2}
        useFlexGap
      >
        <Typography variant='h6'>
          Fill out this form
        </Typography>
        <Typography
          variant='subtitle1'
          sx={{
            mt: 1
          }}
        >
          General Information
        </Typography>
        <Grid
          container
          spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Stack spacing={2}>
              <TextField
                id="details-pic"
                label="PIC"
                defaultValue={auth.user.name}
                InputProps={{
                  readOnly: true,
                }}
                variant="standard"
              />
              <MyDatePicker
                label="Shipment Date"
                format="EEEE, dd MMMM yyyy"
                selectedDate={shipment.departureDate}
                setSelectedDate={(date) => {
                  updateShipment('departureDate', date)
                  updateFlightSearchParams('departureDate', date)
                }}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <Stack spacing={2}>
              <CompanySearch
                id='shipment-exporter'
                options={exporters}
                value={shipment.exporter}
                setValue={(value) => updateShipment('exporter', value)}
                inputValue={inputExporter}
                setInputValue={setInputExporter}
                label='Exporter'
              />
              <CompanySearch
                id='shipment-importer'
                options={importers}
                value={shipment.importer}
                setValue={(value) => updateShipment('importer', value)}
                inputValue={inputImporter}
                setInputValue={setInputImporter}
                label='Importer'
              />
            </Stack>
          </Grid>
        </Grid>
        <Typography
          variant='subtitle1'
          sx={{
            mt: 1
          }}
        >
          Cargo Information
        </Typography>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
            md={12}
          >
            <Stack
              direction='row'
              spacing={2}
            >
              <TextField
                id="quantity"
                label="Quantity"
                type="number"
                value={shipment.quantity}
                onChange={(event) => {
                  let value = event.target.value ? Number(event.target.value) : 0
                  updateShipment('quantity', value)
                  updateTotalWeight({ newQuantity: value })
                  updateTotalSize({ newQuantity: value })
                  updateFlightSearchParams('weight', value * shipment.weightIndividual)
                  updateFlightSearchParams('size', value * shipment.sizeIndividual)
                }}
                inputProps={{
                  step: 1,
                  min: 1,
                }}
                variant="standard"
                sx={{
                  width: '100%',
                }}
              />
              <TextField
                variant="standard"
                sx={{
                  width: '100%',
                  visibility: 'hidden'
                }}
              />
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <DropdownSingleInput
              labelId="categories-select-label"
              selectId="categories-select"
              label="Cargo Category"
              data={categoryOptions}
              value={shipment.category}
              setValue={(value) => {
                updateShipment('category', value ? [value] : [])
                updateFlightSearchParams('categories', value ? [value] : [])
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <DropdownSingleInput
              labelId="packaging-select-label"
              selectId="packaging-select"
              label="Packaging"
              data={packagingOptions}
              value={shipment.packaging}
              setValue={(value) => {
                updateShipment('packaging', value ? [value] : [])
                updateFlightSearchParams('packaging', value ? [value] : [])
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <Stack
              direction='row'
              spacing={2}
              alignItems='flex-end'
            >
              <FormControl
                variant="standard"
                sx={{
                  width: '100%'
                }}
              >
                <InputLabel id="baggage-weight-label">
                  Individual Cargo Weight
                </InputLabel>
                <Input
                  labelId="baggage-weight-label"
                  value={shipment.weightIndividual}
                  onChange={(event) => {
                    let value = event.target.value ? Number(event.target.value) : 0
                    updateShipment('weightIndividual', value)
                    updateTotalWeight({ newWeight: value })
                    updateFlightSearchParams('weight', value * shipment.quantity)
                  }}
                  inputProps={{
                    step: 500,
                    min: 500,
                    max: 5000,
                    type: 'number',
                    'aria-labelledby': 'weight-slider',
                  }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <Typography variant='body2'>
                        kg
                      </Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Grid
                container
                spacing={1}
                sx={{
                  width: '100%',
                  pb: 0.5,
                }}
              >
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end'
                  }}>
                  <Typography
                    variant="body2"
                  >
                    Total Cargo Weight:
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                  }}>
                  <Typography
                    variant="body2"
                  >
                    {shipment.weightTotal}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end'
                  }}>
                  <Typography
                    variant="body2"
                  >
                    kg
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
          >
            <Stack
              direction='row'
              spacing={2}
              alignItems='flex-end'
            >
              <FormControl
                variant="standard"
                sx={{
                  width: '100%'
                }}
              >
                <InputLabel id="baggage-size-label">
                  Individual Cargo Size
                </InputLabel>
                <Input
                  labelId="baggage-size-label"
                  value={shipment.sizeIndividual}
                  onChange={(event) => {
                    let value = event.target.value ? Number(event.target.value) : 0
                    updateShipment('sizeIndividual', value)
                    updateTotalSize({ newSize: value })
                    updateFlightSearchParams('size', value * shipment.quantity)
                  }}
                  inputProps={{
                    step: 1,
                    min: 10,
                    max: 5000,
                    type: 'number',
                    'aria-labelledby': 'weight-slider',
                  }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <Typography variant='body2'>
                        m<sup>3</sup>
                      </Typography>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Grid
                container
                spacing={1}
                sx={{
                  width: '100%',
                  pb: 0.5,
                }}
              >
                <Grid
                  item
                  xs={6}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end'
                  }}>
                  <Typography
                    variant="body2"
                  >
                    Total Cargo Size:
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end'
                  }}>
                  <Typography
                    variant="body2"
                  >
                    {shipment.sizeTotal}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={4}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-end'
                  }}>
                  <Typography
                    variant="body2"
                  >
                    m<sup>3</sup>
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
        <Stack
          alignItems={'flex-end'}
          sx={{
            mt: 2
          }}
        >
          <Button
            variant='contained'
            sx={{
              width: 'fit-content',
            }}
            onClick={onContinue}
          >
            Next step
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}