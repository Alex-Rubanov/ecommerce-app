import {
  Box,
  List,
  ListItem,
  ListItemText,
  TextField,
  IconButton,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { setIsSearchOpen, setItems } from '../../state';
import useHttp from '../../hooks/useHttp';

const SearchMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearchOpen = useSelector((state) => state.cart.isSearchOpen);
  const items = useSelector((state) => state.cart.items);
  const isMobile = useMediaQuery('(max-width: 450px)');

  const [value, setValue] = useState('');
  const [foundItems, setFoundItems] = useState([]);
  const { Http } = useHttp();

  useEffect(() => {
    if (items.length === 0) {
      Http.getItems()
        .then((data) => dispatch(setItems(data)))
        .then(() => setFoundItems(items));
    }

    setFoundItems(items);
    setValue('');
  }, [isSearchOpen]);

  const searchByQuery = (query) => {
    if (query === '') return setFoundItems(items);

    const searchResults = foundItems?.filter((item) =>
      item?.attributes?.name?.toLowerCase().includes(query),
    );

    setFoundItems(searchResults);
  };

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();

    setValue(value);
    searchByQuery(value);
  };

  const openSearchMenu = (e) => {
    if (e.currentTarget !== e.target) return;

    dispatch(setIsSearchOpen({}));
  };

  const redirectOnItemPage = (item) => {
    dispatch(setIsSearchOpen({}));
    navigate(`item/${item.id}`);
  };

  return (
    <Box
      onClick={openSearchMenu}
      display={isSearchOpen ? 'flex' : 'none'}
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '200px',
        position: 'fixed',
        zIndex: '10',
        width: '100%',
        height: '100vh',
        inset: '0',
        overflowX: 'hidden',
      }}>
      <Box
        backgroundColor="white"
        width={isMobile ? '300px' : '350px'}
        mb="5px"
        borderRadius="7px"
        p="5px 15px"
        position="relative">
        <TextField
          value={value}
          onChange={handleChange}
          label="Search"
          variant="standard"
          inputProps={{ style: { fontSize: '16px', width: isMobile ? '255px' : '320px' } }}
        />
        <IconButton
          onClick={() => dispatch(setIsSearchOpen({}))}
          sx={{
            position: 'absolute',
            fontSize: '20px',
            color: 'white',
            top: '-40px',
            right: isMobile ? '-20px' : '-40px',
            zIndex: 2,
          }}>
          <CloseIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </Box>

      <List
        sx={{
          width: isMobile ? '300px' : '350px',
          bgcolor: 'background.paper',
          borderRadius: '7px',
          maxHeight: '350px',
          overflowX: 'auto',
        }}>
        {foundItems?.length ? (
          foundItems.map((item) => (
            <ListItem
              key={item.id}
              sx={{ gap: '5px', alignItems: 'start', cursor: 'pointer' }}
              onClick={() => redirectOnItemPage(item)}>
              <img
                src={item?.attributes?.image?.data?.attributes?.formats?.small?.url}
                alt={item?.name}
                width="50px"
                height="70px"
                style={{ objectFit: 'cover', borderRadius: '5px', alignSelf: 'start' }}
              />
              <ListItemText primary={item.attributes.name} />
            </ListItem>
          ))
        ) : (
          <Typography
            fontWeight="bold"
            sx={{ marginTop: '50px', textAlign: 'center', fontSize: '18px' }}>
            NO RESULTS
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default SearchMenu;
