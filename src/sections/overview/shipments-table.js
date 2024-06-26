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
import { getInitials } from 'src/utils/get-initials';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  draft: 'warning',
  confirmed: 'success',
  canceled: 'error'
};

const buttonMap = {
  'Details': {
    color: 'primary',
    onClick: () => {},
  },
  'Edit': {
    color: 'primary',
    onClick: () => {},
  },
  'Confirm': {
    color: 'success',
    onClick: () => {},
  },
  'View Report': {
    color: 'primary',
    onClick: () => window.open('/assets/report-template.pdf', '_blank'),
  },
  'Cancel': {
    color: 'error',
    onClick: () => {},
  },
}

export const ShipmentsTable = (props) => {
  const {
    count = 0,
    shipments = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < shipments.length);
  const selectedAll = (shipments.length > 0) && (selected.length === shipments.length);
  
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
                    Note
                  </TableCell>
                  <TableCell>
                    Status
                  </TableCell>
                  <TableCell>
                    Actions
                  </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
              {shipments.map((shipment) => {
                const isSelected = selected.includes(shipment.id);
                const createdAt = format(shipment.createdAt, 'dd/MM/yyyy');
                const updatedAt = format(shipment.updatedAt, 'dd/MM/yyyy');
                const departureDate = format(shipment.flight.departureDate, 'dd/MM/yyyy');

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
                      {shipment.ref}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      {shipment.flight.airline}<br />
                      {departureDate}<br />
                      {shipment.flight.departureAirport}<br />
                    </TableCell>
                    <TableCell>
                      {shipment.exporter.name}
                    </TableCell>
                    <TableCell>
                      {shipment.importer.name}
                    </TableCell>
                    <TableCell>
                      {shipment.category}
                    </TableCell>
                    <TableCell>
                      {shipment.note}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[shipment.status]}>
                        <Tooltip 
                          arrow
                          describeChild
                          placement='top'
                          sx={{
                            width: 'fit-content'
                          }}
                          title={`Last updated: ${updatedAt}`}
                        >
                          {shipment.status}
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
                        {shipment.actions.map((action) => {
                          return (
                            <Button
                              color={buttonMap[action].color}
                              variant='outlined'
                              key={action}
                              onClick={() => buttonMap[action].onClick(shipment)}
                            >
                              {action}
                            </Button>
                          )
                        })}
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