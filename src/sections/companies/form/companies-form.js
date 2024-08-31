import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Tooltip
} from "@mui/material"
import { useState } from "react";

export const CompaniesForm = (props) => {
  const {
    company,
    updateCompany,
    isComplete,
    handleSubmit,
  } = props

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {};
    if (!company.name.trim()) {
      newErrors.name = 'Company name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const isVerify = e.nativeEvent.submitter.id === 'save-and-verify';
      if (isVerify) {
        handleSubmit({ ...company, verify: true });
      } else {
        handleSubmit(company);
      }
    }
  };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={onSubmit}
    >
    <Card
      sx={{
        px: 1,
      }}
    >
      <CardHeader
        title="Company Details"
      />
      <CardContent sx={{ pt: 0 }}>
        <Box>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Company Name"
                name="name"
                value={company.name}
                onChange={(e) => updateCompany('name', e.target.value)}
                required
                variant="standard"
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={company.address}
                onChange={(e) => updateCompany('address', e.target.value)}
                variant="standard"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                value={company.email}
                onChange={(e) => updateCompany('email', e.target.value)}
                variant="standard"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={company.phone}
                onChange={(e) => updateCompany('phone', e.target.value)}
                variant="standard"
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
      <Divider />
      <CardActions
        sx={{
          justifyContent: 'end',
          flexDirection: 'row-reverse',
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          type="submit"
          id="save"
        >
          Save
        </Button>
        <Tooltip title={!isComplete ? "Please complete the form to verify" : ""}>
          <span>
            <Button
              variant="contained"
              disabled={!isComplete}
              type="submit"
              id="save-and-verify"
            >
              Save and Verify
            </Button>
          </span>
        </Tooltip>
      </CardActions>
    </Card>
    </form>

  )
}