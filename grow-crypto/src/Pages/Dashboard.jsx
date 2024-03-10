import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Pagination, Stack, Button } from '@mui/material';
import Navbar from './Navbar';

const CoinTable = ({ coins, onSelectCoin }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Coin Image</TableCell>
            <TableCell>Coin Name</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell>Price Change 24h</TableCell>
            <TableCell>Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.id} onClick={() => onSelectCoin(coin)}>
              <TableCell>
                <img src={coin.image} alt={coin.name} style={{ maxWidth: '50px', maxHeight: '50px' }} />
              </TableCell>
              <TableCell>{coin.name}</TableCell>
              <TableCell>{coin.symbol}</TableCell>
              <TableCell>{coin.currentPrice ? coin.currentPrice.toLocaleString() : 'N/A'} {coin.currency}</TableCell>
              <TableCell>{coin.priceChange24h ? coin.priceChange24h.toFixed(2) + '%' : 'N/A'}</TableCell>
              <TableCell>{coin.marketCap ? coin.marketCap.toLocaleString() : 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

const CoinModal = ({ coin, onClose }) => {
  if (!coin) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>{coin.name}</h2>
        <p>Symbol: {coin.symbol}</p>
        <p>Current Price: {coin.currentPrice ? coin.currentPrice.toLocaleString() : 'N/A'} {coin.currency}</p>
        <p>Price Change 24h: {coin.priceChange24h ? coin.priceChange24h.toFixed(2) + '%' : 'N/A'}</p>
        <p>Total Volume: {coin.totalVolume ? coin.totalVolume.toLocaleString() : 'N/A'}</p>
        <p>Low 24h: {coin.low24h ? coin.low24h.toLocaleString() : 'N/A'}</p>
        <p>High 24h: {coin.high24h ? coin.high24h.toLocaleString() : 'N/A'}</p>
        <p>Total Supply: {coin.totalSupply ? coin.totalSupply.toLocaleString() : 'N/A'}</p>
        <p>Max Supply: {coin.maxSupply ? coin.maxSupply.toLocaleString() : 'N/A'}</p>
        <p>Circulating Supply: {coin.circulatingSupply ? coin.circulatingSupply.toLocaleString() : 'N/A'}</p>
        <p>All Time High (ath): {coin.ath ? coin.ath.toLocaleString() : 'N/A'}</p>
        <p>Last Updated: {coin.lastUpdated ? new Date(coin.lastUpdated).toLocaleString() : 'N/A'}</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currency, setCurrency] = useState('INR');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`
      );
      let data = response.data.map((coin) => ({
        id: coin.id,
        image: coin.image,
        name: coin.name,
        symbol: coin.symbol,
        currentPrice: coin.current_price,
        priceChange24h: coin.price_change_percentage_24h,
        marketCap: coin.market_cap,
        totalVolume: coin.total_volume,
        low24h: coin.low_24h,
        high24h: coin.high_24h,
        totalSupply: coin.total_supply,
        maxSupply: coin.max_supply,
        circulatingSupply: coin.circulating_supply,
        ath: coin.ath,
        lastUpdated: coin.last_updated,
        currency: currency.toUpperCase() // Adding currency symbol
      }));

      // Sort the data based on sortOrder
      if (sortOrder === 'desc') {
        data.sort((a, b) => b.currentPrice - a.currentPrice);
      } else {
        data.sort((a, b) => a.currentPrice - b.currentPrice);
      }

      setCoins(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [currency, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectCoin = (coin) => {
    setSelectedCoin(coin);
  };

  const handleCloseModal = () => {
    setSelectedCoin(null);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCoins.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ padding: '20px' }}>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        handleSort={handleSort}
        currency={currency}
        setCurrency={setCurrency}
      />
      <CoinTable coins={currentItems} onSelectCoin={handleSelectCoin} />
      <CoinModal coin={selectedCoin} onClose={handleCloseModal} />
      <Pagination
        count={Math.ceil(filteredCoins.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}
      />
      <Stack direction="row" spacing={2} sx={{ justifyContent: 'center', marginTop: '8px' }}>
        <Button
          variant="contained"
          disabled={currentPage === 1}
          onClick={handlePrevPage}
        >
          Prev Page
        </Button>
        <Button
          variant="contained"
          disabled={indexOfLastItem >= filteredCoins.length}
          onClick={handleNextPage}
        >
          Next Page
        </Button>
      </Stack>
    </div>
  );
};

export default Dashboard;
