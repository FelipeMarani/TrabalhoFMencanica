import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderIcon from '@mui/icons-material/Folder';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function Home({ userName, userCargo, userFuncao, onLogout, onSelectPage, cadastrosItens = [], listasItens = [] }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cadOpen, setCadOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="navHome">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div" noWrap>
            {userName ? userName : "Usuário"}{userFuncao ? ` — ${userFuncao}` : ""}
          </Typography>
          <Box sx={{ ml: 'auto' }}>
            <Button color="inherit" onClick={onLogout}>Sair</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 260 }} role="presentation">
          <Box sx={{ display: "flex", alignItems: "center", px: 2, py: 1 }}>
            <IconButton onClick={toggleDrawer(false)} size="small">
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="subtitle1" sx={{ ml: 1 }}>Minha área</Typography>
          </Box>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => setCadOpen((prev) => !prev)}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary="Cadastros" />
                {cadOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={cadOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {cadastrosItens.map((item) => (
                  <ListItem key={item} disablePadding sx={{ pl: 4 }}>
                    <ListItemButton onClick={() => onSelectPage(item)}>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>

            <ListItem disablePadding>
              <ListItemButton onClick={() => setListOpen((prev) => !prev)}>
                <ListItemIcon>
                  <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Listas" />
                {listOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={listOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {listasItens.map((item) => (
                  <ListItem key={item} disablePadding sx={{ pl: 4 }}>
                    <ListItemButton onClick={() => onSelectPage(item)}>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>

      <Stack sx={{ p: 2 }} spacing={2}>
        <Typography color="text.secondary">Selecione uma opção no menu para navegar.</Typography>
      </Stack>
    </Box>
  );
}
