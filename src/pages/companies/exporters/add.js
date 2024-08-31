import { Box, Container, Grid, Stack, Typography } from "@mui/material"
import Head from "next/head"
import { useEffect, useState } from "react"
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompaniesForm } from "../../../sections/companies/form/companies-form"
import apiClient from "../../../utils/helpers/api-client";

const type = 'exporters'
const typeText = 'Exporter'

const Page = () => {
  const [isComplete, setIsComplete] = useState(false)
  const [company, setCompany] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    // country: '',
    // city: '',
    // zipCode: '',
    logo: '',
  })

  const checkCompletion = (company) => {
    let allPropertiesAreNotNull = Object.entries(company)
      .filter(([key]) => key !== 'logo')
      .every(([_, value]) => value && value !== null);
    setIsComplete(allPropertiesAreNotNull)
  }

  const updateCompany = (key, value) => {
    setCompany((prevState) => ({
      ...prevState,
      [key]: value
    }))
    if (!value) setIsComplete(false)
  }

  useEffect(() => {
    checkCompletion(company)
  }, [company])

  const handleSubmit = async (data) => {
    let { verify = false, ...companyData } = data;
    let company = { ...companyData }
    const response = await apiClient.post(`${type}?verify=${verify}`, company)
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>
          Add New {typeText} | Dashboard Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <div>
              <Typography variant="h4">
                New {typeText}
              </Typography>
            </div>
            <div>
              <Grid
                container
                spacing={3}
              >
                {/* <Grid
                  xs={12}
                  md={6}
                  lg={4}
                >
                  <AccountProfile />
                </Grid> */}
                <Grid
                  xs={12}
                  md={12}
                  lg={12}
                >
                  <CompaniesForm
                    company={company}
                    updateCompany={updateCompany}
                    isComplete={isComplete}
                    handleSubmit={(data) => { handleSubmit(data) }}
                  />
                </Grid>
              </Grid>
            </div>
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

export default Page;