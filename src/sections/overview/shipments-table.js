import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  Button
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/helpers/get-initials';
import { SeverityPill } from 'src/components/severity-pill';
import { useRouter } from 'next/router';
import apiClient from '../../utils/helpers/api-client';
import { generatePDFReport } from '../../utils/helpers/generate-report';

export const ShipmentsTable = (props) => {
  const {
    count = 0,
    shipments = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const router = useRouter();

  const selectedSome = (selected.length > 0) && (selected.length < shipments.length);
  const selectedAll = (shipments.length > 0) && (selected.length === shipments.length);

  const bookingActionMapper = {
    'edit': (shipment) => { router.push(`/shipments/${shipment.id}/edit`) },
    'confirm': (shipment) => {
      let nextStatus = 1;
      apiClient.put(`/bookings/${shipment.id}/update`, {
        status: nextStatus
      }).then(() => {
        router.reload()
      })
    },
    'cancel': (shipment) => {
      let nextStatus = 2;
      apiClient.put(`/bookings/${shipment.id}/update`, {
        status: nextStatus
      }).then(() => {
        router.reload()
      })
    },
    'view-report': (shipment) => {
      generatePDFReport(shipment)
    },
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Shipment ID
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Flight Info
                </TableCell>
                <TableCell>
                  Exporter
                </TableCell>
                <TableCell>
                  Importer
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>
                  Packaging
                </TableCell>
                {/* <TableCell>
                  Note
                </TableCell> */}
                <TableCell>
                  Status
                </TableCell>
                <TableCell align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shipments.map((shipment) => {
                const isSelected = selected.includes(shipment.id);
                const createdAt = format(new Date(shipment.created_at), 'dd/MM/yyyy');
                const updatedAt = format(new Date(shipment.updated_at), 'dd/MM/yyyy');
                const departureDate = shipment.flight_ticket ? format(new Date(shipment.flight_ticket.departure.datetime), 'dd/MM/yyyy') : '-';

                return (
                  <TableRow
                    hover
                    key={shipment.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(shipment.id);
                          } else {
                            onDeselectOne?.(shipment.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {shipment.id ?? '-'}
                    </TableCell>
                    <TableCell>
                      {createdAt ?? '-'}
                    </TableCell>
                    <TableCell>
                      {shipment.flight_ticket ? <>
                        {shipment.flight_ticket.airlines.map(airline => airline.name).join(' + ')}<br />
                        {departureDate}<br />
                        {shipment.flight_ticket.departure.airport.name}
                      </> : '-'}
                    </TableCell>
                    <TableCell>
                      {shipment.exporter ? shipment.exporter.name ?? 'Unnamed Exporter' : '-'}
                    </TableCell>
                    <TableCell>
                    {shipment.importer ? shipment.importer.name ?? 'Unnamed Importer' : '-'}
                    </TableCell>
                    <TableCell>
                      {shipment.category ? shipment.category.name : '-'}
                    </TableCell>
                    <TableCell>
                      {shipment.packaging ? shipment.packaging.name : '-'}
                    </TableCell>
                    {/* <TableCell>
                      {shipment.note ?? '-'}
                    </TableCell> */}
                    <TableCell>
                      <SeverityPill color={shipment.status.color}>
                        <Tooltip
                          arrow
                          describeChild
                          placement='top'
                          sx={{
                            width: 'fit-content'
                          }}
                          title={`Last updated: ${updatedAt}`}
                        >
                          {shipment.status.label}
                        </Tooltip>
                      </SeverityPill>
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={1}
                      >
                        {shipment.actions ? shipment.actions.map((action) => {
                          return (
                            <Button
                              color={action.color}
                              variant='outlined'
                              key={action.code}
                              onClick={() => bookingActionMapper[action.code](shipment)}
                            >
                              {action.label}
                            </Button>
                          )
                        }) : '-'}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ShipmentsTable.propTypes = {
  count: PropTypes.number,
  shipments: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};