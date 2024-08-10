import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
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

// const companies = [
//   {
//     id: '2569ce0d517a7f06d3ea1f24',
//     createdAt: '27/03/2019',
//     description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
//     logo: '/assets/logos/logo-dropbox.png',
//     title: 'Dropbox',
//     downloads: '594'
//   },
//   {
//     id: 'ed2b900870ceba72d203ec15',
//     createdAt: '31/03/2019',
//     description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
//     logo: '/assets/logos/logo-medium.png',
//     title: 'Medium Corporation',
//     downloads: '625'
//   },
//   {
//     id: 'a033e38768c82fca90df3db7',
//     createdAt: '03/04/2019',
//     description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
//     logo: '/assets/logos/logo-slack.png',
//     title: 'Slack',
//     downloads: '857'
//   },
//   {
//     id: '1efecb2bf6a51def9869ab0f',
//     createdAt: '04/04/2019',
//     description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
//     logo: '/assets/logos/logo-lyft.png',
//     title: 'Lyft',
//     downloads: '406'
//   },
//   {
//     id: '1ed68149f65fbc6089b5fd07',
//     createdAt: '04/04/2019',
//     description: 'GitHub is a web-based hosting service for version control of code using Git.',
//     logo: '/assets/logos/logo-github.png',
//     title: 'GitHub',
//     downloads: '835'
//   },
//   {
//     id: '5dab321376eff6177407e887',
//     createdAt: '04/04/2019',
//     description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
//     logo: '/assets/logos/logo-squarespace.png',
//     title: 'Squarespace',
//     downloads: '835'
//   }
// ];

const now = new Date();

const data = [
  {
    id: '5e887ac47eed253091be10cb',
    address: {
      city: 'Cleveland',
      country: 'USA',
      state: 'Ohio',
      street: '2849 Fulton Street'
    },
    avatar: '/assets/avatars/avatar-carson-darrin.png',
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: 'carson.darrin@dbkit.io',
    name: 'Carson Darrin',
    phone: '304-428-3097',
    status: 'unverified'
  },
  {
    id: '5e887b209c28ac3dd97f6db5',
    address: {
      city: 'Atlanta',
      country: 'USA',
      state: 'Georgia',
      street: '1865  Pleasant Hill Road'
    },
    avatar: '/assets/avatars/avatar-fran-perez.png',
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: 'fran.perez@dbkit.io',
    name: 'Fran Perez',
    phone: '712-351-5711',
    status: 'verified'
  },
  {
    id: '5e887b7602bdbc4dbb234b27',
    address: {
      city: 'North Canton',
      country: 'USA',
      state: 'Ohio',
      street: '4894  Lakeland Park Drive'
    },
    avatar: '/assets/avatars/avatar-jie-yan-song.png',
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: 'jie.yan.song@dbkit.io',
    name: 'Jie Yan Song',
    phone: '770-635-2682',
    status: 'verified'
  },
  {
    id: '5e86809283e28b96d2d38537',
    address: {
      city: 'Madrid',
      country: 'Spain',
      name: 'Anika Visser',
      street: '4158  Hedge Street'
    },
    avatar: '/assets/avatars/avatar-anika-visser.png',
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: 'anika.visser@dbkit.io',
    name: 'Anika Visser',
    phone: '908-691-3242',
    status: 'unverified'
  },
  {
    id: '5e86805e2bafd54f66cc95c3',
    address: {
      city: 'San Diego',
      country: 'USA',
      state: 'California',
      street: '75247'
    },
    avatar: '/assets/avatars/avatar-miron-vitold.png',
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: 'miron.vitold@dbkit.io',
    name: 'Miron Vitold',
    phone: '972-333-4106',
    status: 'unverified'
  },
  {
    id: '5e887a1fbefd7938eea9c981',
    address: {
      city: 'Berkeley',
      country: 'USA',
      state: 'California',
      street: '317 Angus Road'
    },
    avatar: '/assets/avatars/avatar-penjani-inyene.png',
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: 'penjani.inyene@dbkit.io',
    name: 'Penjani Inyene',
    phone: '858-602-3409',
    status: 'verified'
  },
  {
    id: '5e887d0b3d090c1b8f162003',
    address: {
      city: 'Carson City',
      country: 'USA',
      state: 'Nevada',
      street: '2188  Armbrester Drive'
    },
    avatar: '/assets/avatars/avatar-omar-darboe.png',
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: 'omar.darobe@dbkit.io',
    name: 'Omar Darobe',
    phone: '415-907-2647',
    status: 'verified'
  },
  {
    id: '5e88792be2d4cfb4bf0971d9',
    address: {
      city: 'Los Angeles',
      country: 'USA',
      state: 'California',
      street: '1798  Hickory Ridge Drive'
    },
    avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: 'siegbert.gottfried@dbkit.io',
    name: 'Siegbert Gottfried',
    phone: '702-661-1654',
    status: 'verified'
  },
  {
    id: '5e8877da9a65442b11551975',
    address: {
      city: 'Murray',
      country: 'USA',
      state: 'Utah',
      street: '3934  Wildrose Lane'
    },
    avatar: '/assets/avatars/avatar-iulia-albu.png',
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: 'iulia.albu@dbkit.io',
    name: 'Iulia Albu',
    phone: '313-812-8947',
    status: 'verified'
  },
  {
    id: '5e8680e60cba5019c5ca6fda',
    address: {
      city: 'Salt Lake City',
      country: 'USA',
      state: 'Utah',
      street: '368 Lamberts Branch Road'
    },
    avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: 'nasimiyu.danai@dbkit.io',
    name: 'Nasimiyu Danai',
    phone: '801-301-7894',
    status: 'unverified'
  }
];

const useCompanies = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
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

const activePages = [
  "exporters",
  "importers"
]

const Page = () => {
  const [active, setActive] = useState(activePages[0])

  const [exportersPage, setExportersPage] = useState(0);
  const [exportersRowsPerPage, setExportersRowsPerPage] = useState(5);
  const exporters = useCompanies(exportersPage, exportersRowsPerPage);
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

  const [importersPage, setImporterPage] = useState(0);
  const [importersRowsPerPage, setRowsPerPage2] = useState(5);
  const customers2 = useCompanies(importersPage, importersRowsPerPage);
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
                  count={data.length}
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
                  count={data.length}
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
        {/* <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Companies
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
            <CompaniesSearch />
            <Grid
              container
              spacing={3}
            >
              {companies.map((company) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={company.id}
                >
                  <CompanyCard company={company} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
          </Stack>
        </Container> */}
      </Box>
    </>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
