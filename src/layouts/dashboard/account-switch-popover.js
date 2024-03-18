import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import { Box, Divider, Stack, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';

export const AccountSwitcherPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  // const router = useRouter();
  const auth = useAuth();

  // const handleSignOut = useCallback(
  //   () => {
  //     onClose?.();
  //     auth.signOut();
  //     router.push('/auth/login');
  //   },
  //   [onClose, auth, router]
  // );

  const handleSwitchRole = useCallback(
    () => {
      onClose?.();
      auth.switchRole(auth.user.role);
    },
    [onClose, auth]
  )

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom'
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2
        }}
      >
        <Typography variant="overline">
          Switch to
        </Typography>
        <MenuList
          disablePadding
          dense
          sx={{
            // p: 0.5,
            '& > *': {
              borderRadius: 1
            }
          }}
        >
          <MenuItem 
            onClick={handleSwitchRole}
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              borderRadius: 1,
              px: 1.5
            }}
          >
            <Typography
              color="inherit"
              variant="subtitle2"
            >
              John
            </Typography>
            <Typography
              color="neutral.400"
              variant="caption"
            >
              {auth.user.role === 'Customer Service' ? 'Manager' : 'Customer Service'}
            </Typography>
          </MenuItem>
        </MenuList>
        {/* <Typography
          color="inherit"
          variant="subtitle1"
        >
          John
        </Typography>
        <Typography
          color="neutral.400"
          variant="body2"
        >
          {auth.user.role === 'Customer Service' ? 'Manager' : 'Customer Service'}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          John
        </Typography>
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
        <MenuItem onClick={handleSwitchRole}>
          Switch to {auth.user.role === 'Customer Service' ? 'Manager' : 'Customer Service'}
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          Sign out
        </MenuItem>
      </MenuList> */}
      </Box>
    </Popover>
  );
};

AccountSwitcherPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};
