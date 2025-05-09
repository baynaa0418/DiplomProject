"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Avatar,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip
} from "@mui/material";
import { 
  Logout, 
  Settings, 
  AccountCircle 
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    router.push("/authentication/login");
  };

  const handleProfile = () => {
    handleClose();
    router.push("/profile");
  };

  const handleSettings = () => {
    handleClose();
    router.push("/settings");
  };

  if (!user) return null;

  return (
    <>
      <Tooltip title="Профайл">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }}>
            {user.name?.charAt(0) || <AccountCircle />}
          </Avatar>
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfile}>
          <Avatar /> Профайл
        </MenuItem>
        <MenuItem onClick={handleSettings}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Тохиргоо
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Гарах
        </MenuItem>
      </Menu>
    </>
  );
}