import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import {
  Button,
  Box,
  Container,
  Divider,
  Skeleton,
  Stack,
  Stepper,
  Step,
  StepButton,
  StepLabel,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { fontSize } from '@mui/system';
import FlightsFormSearch from 'src/sections/shipments/add/flights-form-search';
import { FlightsFormSelected } from 'src/sections/shipments/add/flights-form-selected';
import { ShipmentFormReview } from 'src/sections/shipments/add/shipment-form-review';
import { DetailsForm } from 'src/sections/shipments/add/details-form';
import { decryptId } from '../../utils/helpers/crypt-client';
import apiClient from '../../utils/helpers/api-client';
import { transformFlightData } from '../../utils/helpers/flight-data-transformator';
import useAirports from '../../hooks/use-airports';
import useCategories from '../../hooks/use-categories';
import usePackagings from '../../hooks/use-packagings';
import useExporters from '../../hooks/use-exporters';
import useImporters from '../../hooks/use-importers';

const steps = [
  'Shipment details',
  'Pick a flight',
  'Review'
];

const Page = () => {
  const theme = useTheme()
  const router = useRouter()

  const [activeStep, setActiveStep] = useState(router.query.flight ? 1 : 0);
  const [completed, setCompleted] = useState(router.query.flight ? { 1: true } : {});
  const { airports: airportOptions } = useAirports();
  const { categories: categoryOptions } = useCategories();
  const { packagings: packagingOptions } = usePackagings();
  const { exporters } = useExporters();
  const { importers } = useImporters();

  const [shipment, setShipment] = useState({
    exporter: null,
    importer: null,
    departureDate: null,
    quantity: null,
    category: [],
    packaging: [],
    weightIndividual: null,
    weightTotal: 0,
    sizeIndividual: null,
    sizeTotal: 0,
  });
  const [flightSearchParams, setFlightSearchParams] = useState({
    departureAirport: null,
    arrivalAirport: null,
    departureDate: null,
    weight: null,
    size: null,
    categories: [],
    packaging: [],
  })
  const [flight, setFlight] = useState(null);

  useEffect(() => {
    if (router.query.flight) {
      let flightId = decryptId(router.query.flight)
      apiClient.get(`flight-tickets/${flightId}`).then((response) => {
        const flightData = transformFlightData(response.data.data)
        setFlight(flightData[0])
      }).catch((error) => {
        console.error('Error fetching flight:', error)
      })
    }
  }, [])

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const stepCompleted = (step = null) => {
    return completed[step || activeStep] ?? false;
  }

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
    console.log('shipment', shipment)
    console.log('flight', flight)
  };

  const handleComplete = (step = null) => {
    const newCompleted = completed;
    step = step ?? activeStep;
    newCompleted[step] = true;
    setCompleted(newCompleted);
  };

  const handleCompleteAndProceed = () => {
    handleComplete();
    handleNext();
  };

  const handleIncomplete = (step = null) => {
    const newCompleted = completed;
    step = step ?? activeStep;
    if (newCompleted[step]) {
      delete newCompleted[step];
    }
    setCompleted(newCompleted);
  }

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const updateShipment = (field, value) => {
    setShipment((prevShipment) => ({
      ...prevShipment,
      [field]: value,
    }));
    if (!value) handleIncomplete()
  };

  const updateFlightSearchParams = (field, value) => {
    setFlightSearchParams((prevFlightSearchParams) => ({
      ...prevFlightSearchParams,
      [field]: value,
    }));
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

  const saveBooking = async (flight, shipment) => {
    try {
      const booking = {
        user_id: 1,
        exporter_id: shipment.exporter?.id,
        importer_id: shipment.importer?.id,
        flight_id: flight ? parseInt(flight.id) : null,
        category_id: shipment.category?.id,
        packaging_id: shipment.packaging?.id,
        quantity: shipment.quantity,
        weight: shipment.weightTotal,
        dimension: shipment.sizeTotal,
        status: 0
      }
      if (shipment.exporter && shipment.exporter.id === 0) {
        booking.exporter_name = shipment.exporter.nameValue
      }
      if (shipment.importer && shipment.importer.id === 0) {
        booking.importer_name = shipment.importer.nameValue
      }
      console.log('Booking:', booking)
      const response = await apiClient.post('/bookings', booking)
      console.log('Booking saved successfully:', response.data);
    } catch (error) {
      console.error('Error saving booking:', error);
    }
  }

  return (
    <>
      <Head>
        <title>
          Add New Shipment | Dashboard Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Typography variant="h4">
              New Shipment
            </Typography>

            <Stack
              spacing={4}
              sx={{
                px: 5
              }}
            >
              <Stepper
                nonLinear
                activeStep={activeStep}
              >
                {steps.map((label, index) => (
                  <Step
                    key={label}
                    completed={completed[index]}
                  >
                    <StepLabel
                      onClick={handleStep(index)}
                      sx={{
                        cursor: 'pointer',
                        mx: 1
                      }}
                      StepIconProps={{
                        sx: {
                          fontSize: '2rem',
                          mr: 0.5
                        }
                      }}
                    >
                      <Typography variant='h5'>
                        {label}
                      </Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              <div>
                {allStepsCompleted() ? (
                  <Box>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </Box>
                ) : (
                  <Box>
                    {activeStep === 0 && // SHIPMENT FORM
                      <DetailsForm
                        shipment={shipment}
                        updateShipment={updateShipment}
                        updateFlightSearchParams={updateFlightSearchParams}
                        updateTotalSize={updateTotalSize}
                        updateTotalWeight={updateTotalWeight}
                        categoryOptions={categoryOptions}
                        packagingOptions={packagingOptions}
                        exporters={exporters}
                        importers={importers}
                        handleNext={handleNext}
                        handleComplete={handleComplete}
                      />
                    }
                    {activeStep === 1 && // FLIGHTS SEARCH
                      <Stack
                        spacing={2}
                        useFlexGap
                      >
                        {flight &&
                          <FlightsFormSelected
                            flight={flight}
                            setFlight={setFlight}
                            handleNext={handleNext}
                            handleComplete={handleComplete}
                            handleIncomplete={handleIncomplete}
                          />
                        }
                        <FlightsFormSearch
                          flight={flight}
                          setFlight={setFlight}
                          airportOptions={airportOptions}
                          categoryOptions={categoryOptions}
                          packagingOptions={packagingOptions}
                          handleComplete={handleComplete}
                          flightSearchParams={flightSearchParams}
                        />
                      </Stack>
                    }
                    {activeStep === totalSteps() - 1 && // REVIEW
                      <ShipmentFormReview
                        shipment={shipment}
                        flight={flight}
                        handleComplete={handleComplete}
                        submitText="Confirm New Shipment"
                        onSubmit={() => saveBooking(flight, shipment)}
                      />
                    }
                  </Box>
                )}
              </div>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

Page.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { flight } = query;

  return { flight };
}

export default Page;