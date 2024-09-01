import { Box, Container, Stack, Typography } from "@mui/material"
import Head from "next/head"
import { useEffect, useState } from "react"
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import apiClient from "../../../utils/helpers/api-client";
import { CompaniesFormContainer } from "../../../sections/companies/form/companies-form-container";
import { useRouter } from "next/router";

const type = 'exporters'
const typeText = 'Exporter'
const topic = 'New'
const headTopic = 'Add New'

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

  const router = useRouter()

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
    router.push(`/companies?type=${type}`)
  }

  return (
    <>
      <Head>
        <title>
          {headTopic} {typeText} | Dashboard Kit
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
                {topic} {typeText}
              </Typography>
            </div>
            <div>
              <CompaniesFormContainer
                company={company}
                updateCompany={updateCompany}
                isComplete={isComplete}
                handleSubmit={(data) => { handleSubmit(data) }}
                verified={null}
              />
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