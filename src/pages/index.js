import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
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
import { applyPagination } from 'src/utils/helpers/apply-pagination';
import apiClient from '../utils/helpers/api-client';

const now = new Date();

// const data = [
//   {
//     id: '5e887ac47eed253091be10cb',
//     ref: 'DEV1049',
//     customer: {
//       name: 'Ekaterina Tankova',
//       email: 'ekaterina.tankova@dbkit.io',
//       phone: '304-428-3097'
//     },
//     flight: {
//       airline: 'Citilink',
//       departureDate: subDays(subHours(now, 7), 1).getTime(),
//       departureAirport: 'Changi Intl',
//       arrivalDate: subDays(subHours(now, 8), 1).getTime(),
//       arrivalAirport: 'Yogyakarta International Airport',
//     },
//     exporter: {
//       name: 'Exporter A',
//       email: 'exporter.a@exportera.io',
//       phone: '800-308-2000'
//     },
//     importer: {
//       name: 'Importer A',
//       email: 'importer.a@importera.io',
//       phone: '807-307-2007'
//     },
//     category: 'General Cargo',
//     quantity: '5',
//     packaging: 'Wooden Box',
//     dimension: '30',
//     weight: '1000',
//     note: '-',
//     status: 'confirmed',
//     createdAt: subDays(subHours(now, 7), 1).getTime(),
//     updatedAt: subDays(subHours(now, 7), 1).getTime(),
//     actions: ['View Report']
//   },
//   {
//     id: '5e887b209c28ac3dd97f6db5',
//     ref: 'DEV1050',
//     customer: {
//       email: 'fran.perez@dbkit.io',
//       name: 'Fran Perez',
//       phone: '712-351-5711'
//     },
//     flight: {
//       airline: 'Citilink',
//       departureDate: subDays(subHours(now, 7), 1).getTime(),
//       departureAirport: 'Changi Intl',
//       arrivalDate: subDays(subHours(now, 8), 1).getTime(),
//       arrivalAirport: 'Yogyakarta International Airport',
//     },
//     exporter: {
//       name: 'Exporter A',
//       email: 'exporter.a@exportera.io',
//       phone: '800-308-2000'
//     },
//     importer: {
//       name: 'Importer B',
//       email: 'importer.b@importerb.io',
//       phone: '807-357-2017'
//     },
//     category: 'General Cargo',
//     quantity: '5',
//     packaging: 'Wooden Pallet',
//     dimension: '30',
//     weight: '1000',
//     note: '-',
//     status: 'draft',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     updatedAt: subDays(subHours(now, 1), 2).getTime(),
//     actions: ['Edit', 'Confirm', 'Cancel']
//   },
//   {
//     id: '5e887b7602bdbc4dbb234b27',
//     ref: 'DEV1051',
//     customer: {
//       email: 'fran.perez@dbkit.io',
//       name: 'Fran Perez',
//       phone: '712-351-5711'
//     },
//     flight: {
//       airline: 'Citilink',
//       departureDate: subDays(subHours(now, 7), 1).getTime(),
//       departureAirport: 'Changi Intl',
//       arrivalDate: subDays(subHours(now, 8), 1).getTime(),
//       arrivalAirport: 'Yogyakarta International Airport',
//     },
//     exporter: {
//       name: 'Exporter A',
//       email: 'exporter.a@exportera.io',
//       phone: '800-308-2000'
//     },
//     importer: {
//       name: 'Importer B',
//       email: 'importer.b@importerb.io',
//       phone: '807-357-2017'
//     },
//     category: 'General Cargo',
//     quantity: '5',
//     packaging: 'Wooden Pallet',
//     dimension: '30',
//     weight: '1000',
//     note: '-',
//     status: 'draft',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     updatedAt: subDays(subHours(now, 1), 2).getTime(),
//     actions: ['Edit', 'Confirm', 'Cancel']
//   },
//   {
//     id: '5e86809283e28b96d2d38537',
//     ref: 'DEV1050',
//     customer: {
//       email: 'fran.perez@dbkit.io',
//       name: 'Fran Perez',
//       phone: '712-351-5711'
//     },
//     flight: {
//       airline: 'Citilink',
//       departureDate: subDays(subHours(now, 7), 1).getTime(),
//       departureAirport: 'Changi Intl',
//       arrivalDate: subDays(subHours(now, 8), 1).getTime(),
//       arrivalAirport: 'Yogyakarta International Airport',
//     },
//     exporter: {
//       name: 'Exporter A',
//       email: 'exporter.a@exportera.io',
//       phone: '800-308-2000'
//     },
//     importer: {
//       name: 'Importer B',
//       email: 'importer.b@importerb.io',
//       phone: '807-357-2017'
//     },
//     category: 'General Cargo',
//     quantity: '5',
//     packaging: 'Wooden Pallet',
//     dimension: '30',
//     weight: '1000',
//     note: '-',
//     status: 'confirmed',
//     createdAt: subDays(subHours(now, 7), 1).getTime(),
//     updatedAt: subDays(subHours(now, 7), 1).getTime(),
//     actions: ['View Report']
//   },
//   {
//     id: '5e8680e60cba5019c5ca6fda',
//     ref: 'DEV1052',
//     customer: {
//       email: 'fran.perez@dbkit.io',
//       name: 'Fran Perez',
//       phone: '712-351-5711'
//     },
//     flight: {
//       airline: 'Citilink',
//       departureDate: subDays(subHours(now, 7), 1).getTime(),
//       departureAirport: 'Changi Intl',
//       arrivalDate: subDays(subHours(now, 8), 1).getTime(),
//       arrivalAirport: 'Yogyakarta International Airport',
//     },
//     exporter: {
//       name: 'Exporter A',
//       email: 'exporter.a@exportera.io',
//       phone: '800-308-2000'
//     },
//     importer: {
//       name: 'Importer B',
//       email: 'importer.b@importerb.io',
//       phone: '807-357-2017'
//     },
//     category: 'General Cargo',
//     quantity: '5',
//     packaging: 'Wooden Pallet',
//     dimension: '30',
//     weight: '1000',
//     note: '-',
//     status: 'draft',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     updatedAt: subDays(subHours(now, 1), 2).getTime(),
//     actions: ['Edit', 'Confirm', 'Cancel']
//   },
//   {
//     id: '5e86805e2bafd54f66cc95c3',
//     ref: 'DEV1053',
//     customer: {
//       email: 'fran.perez@dbkit.io',
//       name: 'Fran Perez',
//       phone: '712-351-5711'
//     },
//     flight: {
//       airline: 'Citilink',
//       departureDate: subDays(subHours(now, 7), 1).getTime(),
//       departureAirport: 'Changi Intl',
//       arrivalDate: subDays(subHours(now, 8), 1).getTime(),
//       arrivalAirport: 'Yogyakarta International Airport',
//     },
//     exporter: {
//       name: 'Exporter A',
//       email: 'exporter.a@exportera.io',
//       phone: '800-308-2000'
//     },
//     importer: {
//       name: 'Importer B',
//       email: 'importer.b@importerb.io',
//       phone: '807-357-2017'
//     },
//     category: 'General Cargo',
//     quantity: '5',
//     packaging: 'Wooden Pallet',
//     dimension: '30',
//     weight: '1000',
//     note: '-',
//     status: 'draft',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     updatedAt: subDays(subHours(now, 1), 2).getTime(),
//     actions: ['Edit', 'Confirm', 'Cancel']
//   },
//   {
//     id: '5e887a1fbefd7938eea9c981',
//     ref: 'DEV1054',
//     customer: {
//       email: 'fran.perez@dbkit.io',
//       name: 'Fran Perez',
//       phone: '712-351-5711'
//     },
//     flight: {
//       airline: 'Citilink',
//       departureDate: subDays(subHours(now, 7), 1).getTime(),
//       departureAirport: 'Changi Intl',
//       arrivalDate: subDays(subHours(now, 8), 1).getTime(),
//       arrivalAirport: 'Yogyakarta International Airport',
//     },
//     exporter: {
//       name: 'Exporter A',
//       email: 'exporter.a@exportera.io',
//       phone: '800-308-2000'
//     },
//     importer: {
//       name: 'Importer B',
//       email: 'importer.b@importerb.io',
//       phone: '807-357-2017'
//     },
//     category: 'General Cargo',
//     quantity: '5',
//     packaging: 'Wooden Pallet',
//     dimension: '30',
//     weight: '1000',
//     note: '-',
//     status: 'draft',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     updatedAt: subDays(subHours(now, 1), 2).getTime(),
//     actions: ['Edit', 'Confirm', 'Cancel']
//   },
//   {
//     id: '5e887d0b3d090c1b8f162003',
//     ref: 'DEV1055',
//     customer: {
//       email: 'fran.perez@dbkit.io',
//       name: 'Fran Perez',
//       phone: '712-351-5711'
//     },
//     flight: {
//       airline: 'Citilink',
//       departureDate: subDays(subHours(now, 7), 1).getTime(),
//       departureAirport: 'Changi Intl',
//       arrivalDate: subDays(subHours(now, 8), 1).getTime(),
//       arrivalAirport: 'Yogyakarta International Airport',
//     },
//     exporter: {
//       name: 'Exporter A',
//       email: 'exporter.a@exportera.io',
//       phone: '800-308-2000'
//     },
//     importer: {
//       name: 'Importer B',
//       email: 'importer.b@importerb.io',
//       phone: '807-357-2017'
//     },
//     category: 'General Cargo',
//     quantity: '5',
//     packaging: 'Wooden Pallet',
//     dimension: '30',
//     weight: '1000',
//     note: '-',
//     status: 'draft',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     updatedAt: subDays(subHours(now, 1), 2).getTime(),
//     actions: ['Edit', 'Confirm', 'Cancel']
//   },
//   {
//     id: '5e88792be2d4cfb4bf0971d9',
//     ref: 'DEV1056',
//     customer: {
//       email: 'fran.perez@dbkit.io',
//       name: 'Fran Perez',
//       phone: '712-351-5711'
//     },
//     flight: {
//       airline: 'Citilink',
//       departureDate: subDays(subHours(now, 7), 1).getTime(),
//       departureAirport: 'Changi Intl',
//       arrivalDate: subDays(subHours(now, 8), 1).getTime(),
//       arrivalAirport: 'Yogyakarta International Airport',
//     },
//     exporter: {
//       name: 'Exporter A',
//       email: 'exporter.a@exportera.io',
//       phone: '800-308-2000'
//     },
//     importer: {
//       name: 'Importer B',
//       email: 'importer.b@importerb.io',
//       phone: '807-357-2017'
//     },
//     category: 'General Cargo',
//     quantity: '5',
//     packaging: 'Wooden Pallet',
//     dimension: '30',
//     weight: '1000',
//     note: '-',
//     status: 'draft',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     updatedAt: subDays(subHours(now, 1), 2).getTime(),
//     actions: ['Edit', 'Confirm', 'Cancel']
//   },
//   {
//     id: '5e8877da9a65442b11551975',
//     ref: 'DEV1057',
//     customer: {
//       email: 'fran.perez@dbkit.io',
//       name: 'Fran Perez',
//       phone: '712-351-5711'
//     },
//     flight: {
//       airline: 'Citilink',
//       departureDate: subDays(subHours(now, 7), 1).getTime(),
//       departureAirport: 'Changi Intl',
//       arrivalDate: subDays(subHours(now, 8), 1).getTime(),
//       arrivalAirport: 'Yogyakarta International Airport',
//     },
//     exporter: {
//       name: 'Exporter A',
//       email: 'exporter.a@exportera.io',
//       phone: '800-308-2000'
//     },
//     importer: {
//       name: 'Importer B',
//       email: 'importer.b@importerb.io',
//       phone: '807-357-2017'
//     },
//     category: 'General Cargo',
//     quantity: '5',
//     packaging: 'Wooden Pallet',
//     dimension: '30',
//     weight: '1000',
//     note: '-',
//     status: 'draft',
//     createdAt: subDays(subHours(now, 1), 2).getTime(),
//     updatedAt: subDays(subHours(now, 1), 2).getTime(),
//     actions: ['Edit', 'Confirm', 'Cancel']
//   },
// ];

const useShipments = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
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
  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await apiClient.get('bookings');
      setData(response.data.data)
      } catch (error) {
        console.error('Error fetching exporters:', error)
      }
    };

    fetchData();
  }, [])

  const shipments = useShipments(data, page, rowsPerPage);
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
          Shipments | Dashboard Kit
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
                  component={NextLink}
                  href="/shipments/add"
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
