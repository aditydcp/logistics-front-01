export const bookingStatusMapper = [
  {
    label: 'Draft',
    color: 'warning',
    actions: [
      {
        label: 'Edit',
        color: 'primary',
        // onClick: () => { },
      },
      {
        label: 'Confirm',
        color: 'success',
        // onClick: () => { },
      }, {
        label: 'Cancel',
        color: 'error',
        // onClick: () => { },
      }]
  },
  {
    label: 'Confirmed',
    color: 'success',
    actions: [
      {
        label: 'View Report',
        color: 'primary',
        onClick: () => window.open('/assets/report-template.pdf', '_blank'),
      }
    ]
  },
  {
    label: 'Canceled',
    color: 'error',
    actions: []
  }
]