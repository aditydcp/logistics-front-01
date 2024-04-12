import Head from 'next/head'
import { 
  Button,
  Box,
  Container,
  Divider,
  Skeleton,
  Stack,
  Step,
  StepLabel,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useTheme } from'@mui/material/styles'
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { fontSize } from '@mui/system';

const Page = () => {
  const theme = useTheme()

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
              direction='row'
              spacing={2}
              useFlexGap
              alignItems='flex-start'
            >
              <Stack
                sx={{
                  width: '-webkit-fill-available'
                }}
                spacing={3}
              >
                <Step index={0} active>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        fontSize: '2rem',
                        mr: 1
                      }
                    }}
                  >
                    <Typography variant='h5'>
                      Shipment Details
                    </Typography>
                  </StepLabel>
                </Step>
                <Skeleton variant="rectangular" width='100%' height={500} />
              </Stack>
              <Divider 
                orientation='vertical'
                flexItem
                sx={{
                  borderColor: theme.palette.neutral[300]
                }}
              />
              <Stack
                sx={{
                  width: '-webkit-fill-available'
                }}
                spacing={3}
              >
                <Step index={1} active>
                  <StepLabel
                    StepIconProps={{
                      sx: {
                        fontSize: '2rem',
                        mr: 1
                      }
                    }}
                  >
                    <Typography variant='h5'>
                      Book a Flight
                    </Typography>
                  </StepLabel>
                </Step>
                <Skeleton variant="rectangular" width='100%' height={500} />
              </Stack>
            </Stack>
            <Button
              // component={NextLink}
              // href="/shipments/add"
              // startIcon={(
              //   <SvgIcon fontSize="small">
              //     <PlusIcon />
              //   </SvgIcon>
              // )}
              variant="contained"
            >
              Create
            </Button>
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

export default Page;