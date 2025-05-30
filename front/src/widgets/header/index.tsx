import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Button, Divider, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { changeUserData } from "../../entities/user/api";
import { clearUser, setAppUser, useUser } from "../../entities/user/model";
import { AVATARS } from "../../shared/ui/avatar";
import logo from "./ui/images/Logo.png";

export const Header = () => {
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const user = useUser();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#CA610E" }}>
        <Container maxWidth={false}>
          <Toolbar disableGutters style={{ padding: "6px 0" }}>
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <img src={logo} alt="beer chat logo" />
              <Typography
                variant="h4"
                noWrap
                sx={{
                  mr: 2,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Beer Chat
              </Typography>
              <Divider
                style={{ borderColor: "white" }}
                orientation="vertical"
                flexItem
              />
            </div>
            <Divider
              style={{ borderColor: "white", marginRight: "15px" }}
              orientation="vertical"
              flexItem
            />
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.login} src={AVATARS[user.avatar]} />
                </IconButton>
              </Tooltip>
              <Typography style={{ fontWeight: "bold" }}>
                {user.username}
              </Typography>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={() => setIsProfileModalOpen(true)}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(clearUser())}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ProfileModal
        onClose={() => setIsProfileModalOpen(false)}
        isOpen={isProfileModalOpen}
      />
    </>
  );
};

type ProfileModalProps = {
  onClose: () => void;
  isOpen: boolean;
};

const ProfileModal = (props: ProfileModalProps) => {
  const dispatch = useDispatch();
  const user = useUser();
  const [newUsername, setNewUsername] = useState(user.username);

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    changeUserData({ username: newUsername })
      .then(() =>
        setAppUser({
          user: { ...user, username: newUsername.trim() },
          dispatch,
        }),
      )
      .catch(console.error);

    props.onClose();
  };

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={props.isOpen}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            maxHeight: 600,
          }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography
              color="#CA610E"
              variant="h4"
              align="center"
              fontSize={30}
              fontWeight={"bold"}
            >
              EDIT PROFILE
            </Typography>
          </Box>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              gap: "16px",
            }}
            onSubmit={onSubmitHandler}
          >
            <TextField
              value={user.login}
              autoComplete="off"
              color="warning"
              label="User login"
              variant="standard"
              type="text"
              contentEditable={false}
            />
            <TextField
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              autoComplete="off"
              color="warning"
              label="New username"
              variant="standard"
              type="text"
            />
            <TextField
              value={""}
              autoComplete="off"
              color="warning"
              label="New password"
              variant="standard"
              type="text"
            />
            <Button type="submit" variant="contained" color="warning">
              OK
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};
