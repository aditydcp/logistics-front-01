import { Grid } from "@mui/material"
import { CompaniesForm } from "./companies-form"

export const CompaniesFormContainer = (props) => {
  const {
    company,
    updateCompany,
    isComplete,
    handleSubmit,
    verified,
  } = props

  return (
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
          verified={verified}
        />
      </Grid>
    </Grid>
  )
}