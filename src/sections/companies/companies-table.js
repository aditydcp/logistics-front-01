import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Button,
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
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { useRouter } from 'next/router';
import apiClient from '../../utils/helpers/api-client';

export const CompaniesTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    type
  } = props;

  const router = useRouter()

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  const companyActionMapper = {
    'edit': (company) => { router.push(`/companies/${type}/${company.id}/edit`) },
    'verify': (company) => {
      apiClient.put(`/${type}/${company.id}/verify`).then(() => {
        router.reload()
      })
    },
  };

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
                  Name
                </TableCell>
                <TableCell>
                  Email
                </TableCell>
                <TableCell>
                  Address
                </TableCell>
                <TableCell>
                  Phone Number
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell align="center">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((company) => {
                const isSelected = selected.includes(company.id);

                return (
                  <TableRow
                    hover
                    key={company.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(company.id);
                          } else {
                            onDeselectOne?.(company.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {company.name ?? '-'}
                    </TableCell>
                    <TableCell>
                      {company.email ?? '-'}
                    </TableCell>
                    <TableCell>
                      {company.phone ?? '-'}
                    </TableCell>
                    <TableCell>
                      {company.address ?? '-'}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={company.status.color}>
                        {company.status.label}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="center">
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        spacing={1}
                      >
                        {company.actions ? company.actions.map((action) => (
                          <Button
                            key={action.code}
                            color={action.color}
                            variant='outlined'
                            onClick={() => companyActionMapper[action.code](company)}
                          >
                            {action.label}
                          </Button>
                        )) : '-'}
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

CompaniesTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
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