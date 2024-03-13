import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
// import { Box, Container, Stack, Unstable_Grid2 as Grid } from '@mui/material';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { ShipmentsTable } from 'src/sections/overview/shipments-table';
import { useSelection } from 'src/hooks/use-selection';
import { applyPagination } from 'src/utils/apply-pagination';

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    ref: 'DEV1049',
    customer: {
      name: 'Ekaterina Tankova',
      email: 'ekaterina.tankova@devias.io',
      phone: '304-428-3097'
    },
    flight: {
      airline: 'Citilink',
      departureDate: subDays(subHours(now, 7), 1).getTime(),
      departureAirport: 'Changi Intl',
      arrivalDate: subDays(subHours(now, 8), 1).getTime(),
      arrivalAirport: 'Yogyakarta International Airport',
    },
    exporter: {
      name: 'Exporter A',
      email: 'exporter.a@exportera.io',
      phone: '800-308-2000'
    },
    importer: {
      name: 'Importer A',
      email: 'importer.a@importera.io',
      phone: '807-307-2007'
    },
    category: 'General Cargo',
    quantity: '5',
    packaging: 'Wooden Box',
    dimension: '30',
    weight: '1000',
    note: '-',
    status: 'confirmed',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    updatedAt: subDays(subHours(now, 7), 1).getTime(),
    actions: ['Check Details', 'Cancel Shipment']
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    ref: 'DEV1050',
    customer: {
      email: 'fran.perez@devias.io',
      name: 'Fran Perez',
      phone: '712-351-5711'
    },
    flight: {
      airline: 'Citilink',
      departureDate: subDays(subHours(now, 7), 1).getTime(),
      departureAirport: 'Changi Intl',
      arrivalDate: subDays(subHours(now, 8), 1).getTime(),
      arrivalAirport: 'Yogyakarta International Airport',
    },
    exporter: {
      name: 'Exporter A',
      email: 'exporter.a@exportera.io',
      phone: '800-308-2000'
    },
    importer: {
      name: 'Importer B',
      email: 'importer.b@importerb.io',
      phone: '807-357-2017'
    },
    category: 'General Cargo',
    quantity: '5',
    packaging: 'Wooden Pallet',
    dimension: '30',
    weight: '1000',
    note: '-',
    status: 'draft',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    actions: ['Check Details', 'Confirm Shipment', 'Cancel Shipment']
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    ref: 'DEV1051',
    customer: {
      email: 'fran.perez@devias.io',
      name: 'Fran Perez',
      phone: '712-351-5711'
    },
    flight: {
      airline: 'Citilink',
      departureDate: subDays(subHours(now, 7), 1).getTime(),
      departureAirport: 'Changi Intl',
      arrivalDate: subDays(subHours(now, 8), 1).getTime(),
      arrivalAirport: 'Yogyakarta International Airport',
    },
    exporter: {
      name: 'Exporter A',
      email: 'exporter.a@exportera.io',
      phone: '800-308-2000'
    },
    importer: {
      name: 'Importer B',
      email: 'importer.b@importerb.io',
      phone: '807-357-2017'
    },
    category: 'General Cargo',
    quantity: '5',
    packaging: 'Wooden Pallet',
    dimension: '30',
    weight: '1000',
    note: '-',
    status: 'draft',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    actions: ['Check Details', 'Confirm Shipment', 'Cancel Shipment']
  },
  {
    id: '5e86809283e28b96d2d38537',
    ref: 'DEV1050',
    customer: {
      email: 'fran.perez@devias.io',
      name: 'Fran Perez',
      phone: '712-351-5711'
    },
    flight: {
      airline: 'Citilink',
      departureDate: subDays(subHours(now, 7), 1).getTime(),
      departureAirport: 'Changi Intl',
      arrivalDate: subDays(subHours(now, 8), 1).getTime(),
      arrivalAirport: 'Yogyakarta International Airport',
    },
    exporter: {
      name: 'Exporter A',
      email: 'exporter.a@exportera.io',
      phone: '800-308-2000'
    },
    importer: {
      name: 'Importer B',
      email: 'importer.b@importerb.io',
      phone: '807-357-2017'
    },
    category: 'General Cargo',
    quantity: '5',
    packaging: 'Wooden Pallet',
    dimension: '30',
    weight: '1000',
    note: '-',
    status: 'draft',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    actions: ['Check Details', 'Confirm Shipment', 'Cancel Shipment']
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    ref: 'DEV1052',
    customer: {
      email: 'fran.perez@devias.io',
      name: 'Fran Perez',
      phone: '712-351-5711'
    },
    flight: {
      airline: 'Citilink',
      departureDate: subDays(subHours(now, 7), 1).getTime(),
      departureAirport: 'Changi Intl',
      arrivalDate: subDays(subHours(now, 8), 1).getTime(),
      arrivalAirport: 'Yogyakarta International Airport',
    },
    exporter: {
      name: 'Exporter A',
      email: 'exporter.a@exportera.io',
      phone: '800-308-2000'
    },
    importer: {
      name: 'Importer B',
      email: 'importer.b@importerb.io',
      phone: '807-357-2017'
    },
    category: 'General Cargo',
    quantity: '5',
    packaging: 'Wooden Pallet',
    dimension: '30',
    weight: '1000',
    note: '-',
    status: 'draft',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    actions: ['Check Details', 'Confirm Shipment', 'Cancel Shipment']
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    ref: 'DEV1053',
    customer: {
      email: 'fran.perez@devias.io',
      name: 'Fran Perez',
      phone: '712-351-5711'
    },
    flight: {
      airline: 'Citilink',
      departureDate: subDays(subHours(now, 7), 1).getTime(),
      departureAirport: 'Changi Intl',
      arrivalDate: subDays(subHours(now, 8), 1).getTime(),
      arrivalAirport: 'Yogyakarta International Airport',
    },
    exporter: {
      name: 'Exporter A',
      email: 'exporter.a@exportera.io',
      phone: '800-308-2000'
    },
    importer: {
      name: 'Importer B',
      email: 'importer.b@importerb.io',
      phone: '807-357-2017'
    },
    category: 'General Cargo',
    quantity: '5',
    packaging: 'Wooden Pallet',
    dimension: '30',
    weight: '1000',
    note: '-',
    status: 'draft',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    actions: ['Check Details', 'Confirm Shipment', 'Cancel Shipment']
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    ref: 'DEV1054',
    customer: {
      email: 'fran.perez@devias.io',
      name: 'Fran Perez',
      phone: '712-351-5711'
    },
    flight: {
      airline: 'Citilink',
      departureDate: subDays(subHours(now, 7), 1).getTime(),
      departureAirport: 'Changi Intl',
      arrivalDate: subDays(subHours(now, 8), 1).getTime(),
      arrivalAirport: 'Yogyakarta International Airport',
    },
    exporter: {
      name: 'Exporter A',
      email: 'exporter.a@exportera.io',
      phone: '800-308-2000'
    },
    importer: {
      name: 'Importer B',
      email: 'importer.b@importerb.io',
      phone: '807-357-2017'
    },
    category: 'General Cargo',
    quantity: '5',
    packaging: 'Wooden Pallet',
    dimension: '30',
    weight: '1000',
    note: '-',
    status: 'draft',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    actions: ['Check Details', 'Confirm Shipment', 'Cancel Shipment']
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    ref: 'DEV1055',
    customer: {
      email: 'fran.perez@devias.io',
      name: 'Fran Perez',
      phone: '712-351-5711'
    },
    flight: {
      airline: 'Citilink',
      departureDate: subDays(subHours(now, 7), 1).getTime(),
      departureAirport: 'Changi Intl',
      arrivalDate: subDays(subHours(now, 8), 1).getTime(),
      arrivalAirport: 'Yogyakarta International Airport',
    },
    exporter: {
      name: 'Exporter A',
      email: 'exporter.a@exportera.io',
      phone: '800-308-2000'
    },
    importer: {
      name: 'Importer B',
      email: 'importer.b@importerb.io',
      phone: '807-357-2017'
    },
    category: 'General Cargo',
    quantity: '5',
    packaging: 'Wooden Pallet',
    dimension: '30',
    weight: '1000',
    note: '-',
    status: 'draft',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    actions: ['Check Details', 'Confirm Shipment', 'Cancel Shipment']
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    ref: 'DEV1056',
    customer: {
      email: 'fran.perez@devias.io',
      name: 'Fran Perez',
      phone: '712-351-5711'
    },
    flight: {
      airline: 'Citilink',
      departureDate: subDays(subHours(now, 7), 1).getTime(),
      departureAirport: 'Changi Intl',
      arrivalDate: subDays(subHours(now, 8), 1).getTime(),
      arrivalAirport: 'Yogyakarta International Airport',
    },
    exporter: {
      name: 'Exporter A',
      email: 'exporter.a@exportera.io',
      phone: '800-308-2000'
    },
    importer: {
      name: 'Importer B',
      email: 'importer.b@importerb.io',
      phone: '807-357-2017'
    },
    category: 'General Cargo',
    quantity: '5',
    packaging: 'Wooden Pallet',
    dimension: '30',
    weight: '1000',
    note: '-',
    status: 'draft',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    actions: ['Check Details', 'Confirm Shipment', 'Cancel Shipment']
  },
  {
    id: '5e8877da9a65442b11551975',
    ref: 'DEV1057',
    customer: {
      email: 'fran.perez@devias.io',
      name: 'Fran Perez',
      phone: '712-351-5711'
    },
    flight: {
      airline: 'Citilink',
      departureDate: subDays(subHours(now, 7), 1).getTime(),
      departureAirport: 'Changi Intl',
      arrivalDate: subDays(subHours(now, 8), 1).getTime(),
      arrivalAirport: 'Yogyakarta International Airport',
    },
    exporter: {
      name: 'Exporter A',
      email: 'exporter.a@exportera.io',
      phone: '800-308-2000'
    },
    importer: {
      name: 'Importer B',
      email: 'importer.b@importerb.io',
      phone: '807-357-2017'
    },
    category: 'General Cargo',
    quantity: '5',
    packaging: 'Wooden Pallet',
    dimension: '30',
    weight: '1000',
    note: '-',
    status: 'draft',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    updatedAt: subDays(subHours(now, 1), 2).getTime(),
    actions: ['Check Details', 'Confirm Shipment', 'Cancel Shipment']
  },
];

const useShipments = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useShipmentIds = (shipments) => {
  return useMemo(
    () => {
      return shipments.map((shipment) => shipment.id);
    },
    [shipments]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const shipments = useShipments(page, rowsPerPage);
  const shipmentsIds = useShipmentIds(shipments);
  const shipmentsSelection = useSelection(shipmentsIds);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );
  
  return (
    <>
      <Head>
        <title>
          Shipments | Devias Kit
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
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Shipments
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Add
                </Button>
              </div>
            </Stack>
            <ShipmentsTable
              count={data.length}
              shipments={shipments}
              onDeselectAll={shipmentsSelection.handleDeselectAll}
              onDeselectOne={shipmentsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={shipmentsSelection.handleSelectAll}
              onSelectOne={shipmentsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={shipmentsSelection.selected}
            />
          </Stack>
          {/* <Grid
            container
            spacing={3}
          >
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: '100%' }}
                value="$24k"
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value="1.6k"
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTasksProgress
                sx={{ height: '100%' }}
                value={75.5}
              />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                value="$15k"
              />
            </Grid>
            <Grid
              xs={12}
              lg={8}
            >
              <OverviewSales
                chartSeries={[
                  {
                    name: 'This year',
                    data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20]
                  },
                  {
                    name: 'Last year',
                    data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13]
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewTraffic
                chartSeries={[63, 15, 22]}
                labels={['Desktop', 'Tablet', 'Phone']}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={4}
            >
              <OverviewLatestProducts
                products={[
                  {
                    id: '5ece2c077e39da27658aa8a9',
                    image: '/assets/products/product-1.png',
                    name: 'Healthcare Erbology',
                    updatedAt: subHours(now, 6).getTime()
                  },
                  {
                    id: '5ece2c0d16f70bff2cf86cd8',
                    image: '/assets/products/product-2.png',
                    name: 'Makeup Lancome Rouge',
                    updatedAt: subDays(subHours(now, 8), 2).getTime()
                  },
                  {
                    id: 'b393ce1b09c1254c3a92c827',
                    image: '/assets/products/product-5.png',
                    name: 'Skincare Soja CO',
                    updatedAt: subDays(subHours(now, 1), 1).getTime()
                  },
                  {
                    id: 'a6ede15670da63f49f752c89',
                    image: '/assets/products/product-6.png',
                    name: 'Makeup Lipstick',
                    updatedAt: subDays(subHours(now, 3), 3).getTime()
                  },
                  {
                    id: 'bcad5524fe3a2f8f8620ceda',
                    image: '/assets/products/product-7.png',
                    name: 'Healthcare Ritual',
                    updatedAt: subDays(subHours(now, 5), 6).getTime()
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
            >
              <OverviewLatestOrders
                orders={[
                  {
                    id: 'f69f88012978187a6c12897f',
                    ref: 'DEV1049',
                    amount: 30.5,
                    customer: {
                      name: 'Ekaterina Tankova'
                    },
                    createdAt: 1555016400000,
                    status: 'pending'
                  },
                  {
                    id: '9eaa1c7dd4433f413c308ce2',
                    ref: 'DEV1048',
                    amount: 25.1,
                    customer: {
                      name: 'Cao Yu'
                    },
                    createdAt: 1555016400000,
                    status: 'delivered'
                  },
                  {
                    id: '01a5230c811bd04996ce7c13',
                    ref: 'DEV1047',
                    amount: 10.99,
                    customer: {
                      name: 'Alexa Richardson'
                    },
                    createdAt: 1554930000000,
                    status: 'refunded'
                  },
                  {
                    id: '1f4e1bd0a87cea23cdb83d18',
                    ref: 'DEV1046',
                    amount: 96.43,
                    customer: {
                      name: 'Anje Keizer'
                    },
                    createdAt: 1554757200000,
                    status: 'pending'
                  },
                  {
                    id: '9f974f239d29ede969367103',
                    ref: 'DEV1045',
                    amount: 32.54,
                    customer: {
                      name: 'Clarke Gillebert'
                    },
                    createdAt: 1554670800000,
                    status: 'delivered'
                  },
                  {
                    id: 'ffc83c1560ec2f66a1c05596',
                    ref: 'DEV1044',
                    amount: 16.76,
                    customer: {
                      name: 'Adam Denisov'
                    },
                    createdAt: 1554670800000,
                    status: 'delivered'
                  }
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid> */}
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
