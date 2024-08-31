import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { ShipmentsTable } from 'src/sections/overview/shipments-table';
import { useSelection } from 'src/hooks/use-selection';
import apiClient from '../utils/helpers/api-client';

const useShipmentIds = (shipments) => {
  return useMemo(
    () => {
      return shipments.map((shipment) => shipment.id);
    },
    [shipments]
  );
};

const Page = () => {
  const [totalData, setTotalData] = useState(0);
  const [data, setData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await apiClient.get('bookings/fetch', {
        params: {
          userId: 1,
          page: page,
          rowsPerPage: rowsPerPage,
          sortColumn: 'status',
          sortDirection: 'asc'
        }
      });
      setTotalData(response.data.meta.total)
      setData(response.data.data)
      } catch (error) {
        console.error('Error fetching exporters:', error)
      }
    };

    fetchData();
  }, [page, rowsPerPage])

  const shipmentsIds = useShipmentIds(data);
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
              count={totalData}
              shipments={data}
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
