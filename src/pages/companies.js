import { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Divider,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/helpers/apply-pagination';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { CompaniesTable } from 'src/sections/companies/companies-table';
import apiClient from '../utils/helpers/api-client';
import useImporters from '../hooks/use-importers';
import useExporters from '../hooks/use-exporters';

const now = new Date();

const activePages = [
  "exporters",
  "importers"
]

const Page = () => {
  const [active, setActive] = useState(activePages[0])

  const [exportersPage, setExportersPage] = useState(0);
  const [exportersRowsPerPage, setExportersRowsPerPage] = useState(5);
  const { exporters: exporterData } = useExporters()

  const [importersPage, setImporterPage] = useState(0);
  const [importersRowsPerPage, setRowsPerPage2] = useState(5);
  const { importers: importerData } = useImporters()

  const exporters = useCompanies(exporterData, exportersPage, exportersRowsPerPage);
  const exportersIds = useCompanyIds(exporters);
  const exportersSelection = useSelection(exportersIds);

  const handleExporterPageChange = useCallback(
    (event, value) => {
      setExportersPage(value);
    },
    []
  );

  const handleExporterRowsPerPageChange = useCallback(
    (event) => {
      setExportersRowsPerPage(event.target.value);
    },
    []
  );

  const customers2 = useCompanies(importerData, importersPage, importersRowsPerPage);
  const customersIds2 = useCompanyIds(customers2);
  const customersSelection2 = useSelection(customersIds2);

  const handlePageChange2 = useCallback(
    (event, value) => {
      setImporterPage(value);
    },
    []
  );

  const handleRowsPerPageChange2 = useCallback(
    (event) => {
      setRowsPerPage2(event.target.value);
    },
    []
  );

  return (
    <>
      <Head>
        <title>
          Exporters & Importers | Dashboard Kit
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
            <ToggleButtonGroup
              color='primary'
              size='large'
              exclusive
              value={active}
              onChange={(event, value) => {setActive(value)}}
            >
              <ToggleButton value={activePages[0]}>Exporters</ToggleButton>
              <ToggleButton value={activePages[1]}>Importers</ToggleButton>
            </ToggleButtonGroup>
            <Divider />
            {active === activePages[0] ? <>
              <Stack spacing={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      Exporters
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
                      href="/companies/exporters/add"
                      startIcon={(
                        <SvgIcon fontSize="small">
                          <PlusIcon />
                        </SvgIcon>
                      )}
                      variant="contained"
                    >
                      Add Exporter
                    </Button>
                  </div>
                </Stack>
                <CompaniesSearch title="Exporter" />
                <CompaniesTable
                  count={exporterData.length}
                  items={exporters}
                  onDeselectAll={exportersSelection.handleDeselectAll}
                  onDeselectOne={exportersSelection.handleDeselectOne}
                  onPageChange={handleExporterPageChange}
                  onRowsPerPageChange={handleExporterRowsPerPageChange}
                  onSelectAll={exportersSelection.handleSelectAll}
                  onSelectOne={exportersSelection.handleSelectOne}
                  page={exportersPage}
                  rowsPerPage={exportersRowsPerPage}
                  selected={exportersSelection.selected}
                />
              </Stack>
            </> : <>
              <Stack spacing={3}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <Stack spacing={1}>
                    <Typography variant="h4">
                      Importers
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
                      Add Importer
                    </Button>
                  </div>
                </Stack>
                <CompaniesSearch title="Importer" />
                <CompaniesTable
                  count={importerData.length}
                  items={customers2}
                  onDeselectAll={customersSelection2.handleDeselectAll}
                  onDeselectOne={customersSelection2.handleDeselectOne}
                  onPageChange={handlePageChange2}
                  onRowsPerPageChange={handleRowsPerPageChange2}
                  onSelectAll={customersSelection2.handleSelectAll}
                  onSelectOne={customersSelection2.handleSelectOne}
                  page={importersPage}
                  rowsPerPage={importersRowsPerPage}
                  selected={customersSelection2.selected}
                />
              </Stack>
            </>}
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
);

const useCompanies = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useCompanyIds = (companies) => {
  return useMemo(
    () => {
      return companies.map((company) => company.id);
    },
    [companies]
  );
};

export default Page;
