import { useState } from "react";
import { 
  Card,
  Input,
  InputLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CompanySearch } from "src/components/shipments/shipments-company-search";

const exporters = [
  { name: 'Exporter A' },
  { name: 'Exporter B' },
  { name: 'Exporter C' },
  { name: 'Exporter D' },
]

const importers = [
  { name: 'Importer A' },
  { name: 'Importer B' },
  { name: 'Importer C' },
  { name: 'Importer D' },
]

export const DetailsForm = (props) => {
  const {
    shipment,
    setShipment
  } = props

  const [exporter, setExporter] = useState(null)
  const [inputExporter, setInputExporter] = useState("")

  const [importer, setImporter] = useState(null)
  const [inputImporter, setInputImporter] = useState("")

  return (
    <Card sx={{ p: 6 }}>
      <Stack
        spacing={2}
        useFlexGap
        // sx={{
        //   px: 2
        // }}
      >
        <Typography variant='h6'>
          Fill out this form
        </Typography>
        <CompanySearch
          id='shipment-exporter'
          options={exporters}
          value={exporter}
          setValue={setExporter}
          inputValue={inputExporter}
          setInputValue={setInputExporter}
          label='Exporter'
        />
        <CompanySearch
          id='shipment-importer'
          options={importers}
          value={importer}
          setValue={setImporter}
          inputValue={inputImporter}
          setInputValue={setInputImporter}
          label='Importer'
        />
      </Stack>
    </Card>
  )
}