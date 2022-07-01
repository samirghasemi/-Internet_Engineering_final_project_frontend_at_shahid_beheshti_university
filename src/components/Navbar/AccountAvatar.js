import * as React from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
export default function AccountAvatar() {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const auth = useSelector((state) => state.auth);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(!anchorEl);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(false);
  };

  const handleMenuClose = () => {
    setAnchorEl(false);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleProfileMenuOpen}
      >
        <AccountCircle />
      </IconButton>
      {anchorEl && (
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          id={menuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem
            style={{ fontFamily: "iranyekan" }}
            onClick={() => {
              console.log("hello");
              handleMenuClose();
            }}
          >
            پروفایل
          </MenuItem>
          <MenuItem
            style={{ fontFamily: "iranyekan" }}
            onClick={() => {
              console.log("hello");
              handleMenuClose();
            }}
          >
            خروج
          </MenuItem>
        </Menu>
      )}
    </div>
  );
}
