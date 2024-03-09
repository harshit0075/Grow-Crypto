import React from 'react';
import { AppBar, Toolbar, Typography, InputBase, FormControl, Select, MenuItem } from '@mui/material';

const Navbar = ({ searchTerm, setSearchTerm, sortOrder, handleSort, currency, setCurrency }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
          Grow-Crypto
        </Typography>
        <div className="search-container">
          <InputBase
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by coin name"
          />
        </div>
        <div className="dropdown-container">
          <FormControl>
            <Select id="sort" value={sortOrder} onChange={handleSort}>
              <MenuItem value="asc">Low to High</MenuItem>
              <MenuItem value="desc">High to Low</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="currency-container">
          <FormControl>
            <Select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="INR">INR</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="EUR">EUR</MenuItem>
            </Select>
          </FormControl>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
