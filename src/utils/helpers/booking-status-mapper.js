const editAction = {
  code: 'edit',
  label: 'Edit',
  color: 'primary'
}

const confirmAction = {
  code: 'confirm',
  label: 'Confirm',
  color: 'success',
}

const cancelAction = {
  code: 'cancel',
  label: 'Cancel',
  color: 'error',
}

const viewReportAction = {
  code: 'view-report',
  label: 'View Report',
  color: 'primary',
}

export const bookingStatusMapper = [
  {
    label: 'Draft',
    color: 'warning',
    actions: [editAction, confirmAction, cancelAction]
  },
  {
    label: 'Confirmed',
    color: 'success',
    actions: [viewReportAction]
  },
  {
    label: 'Canceled',
    color: 'error',
    actions: []
  }
]