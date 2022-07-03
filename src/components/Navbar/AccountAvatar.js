import * as React from "react";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export default function AccountAvatar() {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(!anchorEl);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(false);
  };
  const Dispatch = useDispatch();
  const handleMenuClose = () => {
    setAnchorEl(false);
    handleMobileMenuClose();
  };
  const signOutHandler = () => {
    Dispatch({ type: "sign_out" });
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("admin");
  };
  const profileHandler = () => {};
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
          <Link
            to={"/profile"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem
              style={{ fontFamily: "iranyekan" }}
              onClick={() => {
                handleMenuClose();
              }}
            >
              پروفایل
            </MenuItem>
          </Link>
          <Link
            to={"/Manager"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <MenuItem
              style={{ fontFamily: "iranyekan" }}
              onClick={() => {
                handleMenuClose();
              }}
            >
              پنل مدیریت
            </MenuItem>
          </Link>
          <MenuItem
            style={{ fontFamily: "iranyekan" }}
            onClick={() => {
              signOutHandler();
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
