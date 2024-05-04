import { useCallback, useRef, useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/solid/ArrowTopRightOnSquareIcon';
import ChevronUpDownIcon from '@heroicons/react/24/solid/ChevronUpDownIcon';
import {
  Alert,
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery
} from '@mui/material';
import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { items } from './config';
import { SideNavItem } from './side-nav-item';
import { useAuth } from 'src/hooks/use-auth';
import { AccountSwitcherPopover } from './account-switch-popover';
import { usePopover } from 'src/hooks/use-popover';

export const SideNav = (props) => {
  const { open, onClose, compact, setCompact } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const { user } = useAuth();
  // const accountSwitchPopover = usePopover();
  // const accountSwitchBoxRef = useRef(null);

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%'
          },
          '& .simplebar-scrollbar:before': {
            background: 'neutral.400'
          }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Box sx={{ p: 3 }}>
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: 'inline-flex',
                height: 32,
                width: 32
              }}
            >
              <Logo />
            </Box>
            {/* <Box>
              <Button
                onClick={() => setCompact(!compact)}
              >
                Compact
              </Button>
            </Box> */}
            <Box
              // onClick={accountSwitchPopover.handleOpen}
              // ref={accountSwitchBoxRef} // Assign the ref to the Box component
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                borderRadius: 1,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                mt: 2,
                p: '12px'
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  {user.name}
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  {user.role}
                </Typography>
              </div>
              {/* <SvgIcon
                fontSize="small"
                sx={{ color: 'neutral.500' }}
              >
                <ChevronUpDownIcon />
              </SvgIcon> */}
            </Box>
          </Box>
          <Divider sx={{ borderColor: 'neutral.700' }} />
          <Box
            component="nav"
            sx={{
              flexGrow: 1,
              px: 2,
              py: 3
            }}
          >
            <Stack
              component="ul"
              spacing={0.5}
              sx={{
                listStyle: 'none',
                p: 0,
                m: 0
              }}
            >
              {items.map((item) => {
                const active = item.path ? (pathname === item.path) : false;
                if (item.role) {
                  if (!item.role.includes(user.role.toLowerCase())) {
                    return (<></>);
                  }
                }
                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              })}
            </Stack>
          </Box>
          <Alert
            color="primary"
            severity="info"
            sx={{ 
              mx: 3,
              my: 3,
            }}
          >
            <div>
              Some functions may not be available in this demo.
            </div>
          </Alert>
        </Box>
      </Scrollbar>
      {/* <AccountSwitcherPopover 
        anchorEl={accountSwitchBoxRef.current} // Pass the current value of the ref
        open={accountSwitchPopover.open}
        onClose={accountSwitchPopover.handleClose}
      /> */}
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.800',
            color: 'common.white',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
