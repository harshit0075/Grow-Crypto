import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, FormControl, Select, MenuItem, Grid } from '@mui/material';

const Navbar = ({ searchTerm, setSearchTerm, sortOrder, handleSort, currency, setCurrency }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Grow-Crypto
        </Typography>
        <Grid container spacing={1} alignItems="center" justifyContent="flex-end">
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <Select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <FormControl fullWidth>
              <Select id="sort" value={sortOrder} onChange={handleSort}>
                <MenuItem value="asc">Low to High</MenuItem>
                <MenuItem value="desc">High to Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputBase
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by coin name"
              fullWidth
            />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
