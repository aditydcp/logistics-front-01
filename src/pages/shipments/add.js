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
import { useTheme } from'@mui/material/styles'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { fontSize } from '@mui/system';
import FlightsFormSearch from 'src/sections/shipments/add/flights-form-search';
import { FlightsFormSelected } from 'src/sections/shipments/add/flights-form-selected';
import { ShipmentFormReview } from 'src/sections/shipments/add/shipment-form-review';
import { DetailsForm } from 'src/sections/shipments/add/details-form';

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
  const [shipment, setShipment] = useState(null);
  const [flight, setFlight] = useState(router.query.flight ? JSON.parse(router.query.flight) : null);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

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
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
  };

  const handleCompleteAndProceed = () => {
    handleComplete();
    handleNext();
  };

  const handleIncomplete = () => {
    const newCompleted = completed;
    delete newCompleted[activeStep];
    setCompleted(newCompleted);
  }

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

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
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
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
                        setShipment={setShipment}
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
                            handleIncomplete={handleIncomplete}
                          />
                        }
                        <FlightsFormSearch
                          flight={flight}
                          setFlight={setFlight}
                          handleComplete={handleComplete}
                        />
                      </Stack>
                    }
                    {activeStep === totalSteps() - 1 && // REVIEW
                      <ShipmentFormReview
                        shipment={shipment}
                        flight={flight}
                      />
                    }
                    
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Next
                      </Button>
                      {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                          <Typography variant="caption" sx={{ display: 'inline-block' }}>
                            Step {activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button onClick={handleComplete}>
                            {completedSteps() === totalSteps() - 1
                              ? 'Finish'
                              : 'Complete Step'}
                          </Button>
                        ))}
                    </Box>
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