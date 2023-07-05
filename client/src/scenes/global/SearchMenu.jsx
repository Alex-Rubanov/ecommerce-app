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
import { setIsSearchOpen } from '../../state';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../../hooks/useHttp';

const SearchMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearchOpen = useSelector((state) => state.cart.isSearchOpen);
  const items = useSelector((state) => state.cart.items);
  const isMobile = useMediaQuery('(max-width: 450px)');

  console.log(items);

  const [value, setValue] = useState('');
  const [foundItems, setFoundItems] = useState([]);
  const { Http } = useHttp();

  const inputRef = useRef(null);

  useEffect(() => {
    Http.getItems().then((data) => setFoundItems(data));
    inputRef.current.focus();
    setValue('');
  }, [isSearchOpen]);

  const searchByQuery = (query) => {
    const foundItems = items?.filter((item) =>
      item?.attributes?.name?.toLowerCase().includes(query),
    );
    setFoundItems(foundItems);
  };

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();

    setValue(value);
    searchByQuery(value);
  };

  return (
    <Box
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;

        dispatch(setIsSearchOpen({}));
      }}
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
          ref={inputRef}
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
              onClick={() => {
                dispatch(setIsSearchOpen({}));
                navigate(`item/${item.id}`);
              }}>
              <img
                src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
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
