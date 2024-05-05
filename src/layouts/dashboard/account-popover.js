import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const router = useRouter();
  const auth = useAuth();

  const handleSignOut = useCallback(
    () => {
      onClose?.();
      auth.signOut();
      router.push('/auth/login');
    },
    [onClose, auth, router]
  );

  // const handleSwitchRole = useCallback(
  //   () => {      
  //     auth.switchRole(auth.user.role);
  //   },
  //   [auth]
  // )

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'right',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 'fit-content' } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Account
        </Typography>
        <Typography
          color="inherit"
          variant="subtitle1"
        >
          {auth.user.name}
        </Typography>
        <Typography
          color="neutral.400"
          variant="body2"
        >
          {auth.user.role}
        </Typography>
        {/* <Typography
          color="text.secondary"
          variant="body2"
        >
          John
        </Typography> */}
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1
          }
        }}
      >
        {/* <MenuItem onClick={handleSwitchRole}>
          Switch to {auth.user.role === 'Customer Service' ? 'Manager' : 'Customer Service'}
        </MenuItem> */}
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
