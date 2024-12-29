
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Home as HomeIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const NavigationDrawer = ({  }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { year } = useParams();

  // const years = useMemo(() => Array.from(articlesByYear.keys()), [articlesByYear]);
  // const activeYear = year ? parseInt(year, 10) : undefined;

  const logout = async () => {
    try {
      alert('Logged out successfully.');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Drawer
      variant="temporary"
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="User Name" secondary="Přihlášen" />
        </ListItem>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Domů" />
        </ListItem>
        {/* {years.map((y) => (
          <ListItem
            button
            key={y}
            selected={activeYear === y}
            component={Link}
            to={`/rocnik/${y}`}
          >
            <ListItemIcon>
              <Typography variant="body2">{y}</Typography>
            </ListItemIcon>
            <ListItemText primary={`${y}. Ročník`} />
          </ListItem>
        ))} */}
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Odhlásit se" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default NavigationDrawer;