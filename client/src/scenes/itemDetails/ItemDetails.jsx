import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, Button, Tabs, Tab } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { shades } from '../../theme';
import { addToCart, addToWishList, setIsWishListOpen } from '../../state';
import { useNavigate, useParams } from 'react-router-dom';
import { getRandomNumber, redirect } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import Item from '../../components/Item';
import useHttp from '../../hooks/useHttp';

const ItemDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishList = useSelector((state) => state.cart.wishList);
  const isWishListOpen = useSelector((state) => state.cart.isWishListOpen);
  const { itemId } = useParams();
  const { isLoading, isError, clearError, Http } = useHttp();

  const [value, setValue] = useState('description');
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(() => getRandomNumber(0, 16));

  const handleChange = (event, newValue) => setValue(newValue);

  const getItem = async (id) => Http.getItem(id).then(setItem);
  const getItems = async () => Http.getItems().then(setItems);

  if (isWishListOpen) {
    setIsWishListOpen({});
  }

  useEffect(() => {
    const newIndex = getRandomNumber(0, 16);

    setIndex(newIndex);
    getItem(itemId);
    getItems();
  }, [itemId]); //react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto" minHeight="100vh">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* {IMAGES} */}
        <Box flex="1 1 40%" mb="40px">
          {isLoading ? (
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}>
              Loading...
            </p>
          ) : (
            <img
              className="fadeIn"
              src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
              alt={item?.name}
              width="100%"
              height="100%"
              style={{
                objectFit: 'contain',
                borderRadius: '7px',
                borderColor: 'transparent',
                background: '#fff',
              }}
            />
          )}
        </Box>

        {/* {ACTIONS} */}

        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="start" gap="5px">
              <p onClick={() => navigate('/')} style={{ margin: '0', cursor: 'pointer' }}>
                Home / Item
              </p>
            </Box>
            <Box display="flex" alignItems="start" gap="5px">
              <p
                onClick={() => redirect(-1, itemId, navigate)}
                style={{ margin: '0', cursor: 'pointer' }}>
                Prev
              </p>
              /
              <p
                onClick={() => redirect(1, itemId, navigate)}
                style={{ margin: '0', cursor: 'pointer' }}>
                Next
              </p>
            </Box>
          </Box>

          <Box m="65px 0 25px">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography fontWeight="bold">€{item?.attributes?.price}</Typography>
            <Typography sx={{ mt: '20px' }}>
              {item?.attributes?.longDescription.slice(0, 350)}...
            </Typography>
          </Box>

          {/* {COUNT & BUTTON} */}
          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px">
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: '0 5px' }}>{count}</Typography>
              <IconButton onClick={() => setCount((count) => count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: '#222222',
                color: 'white',
                borderRadius: '0',
                minWidth: '150px',
                padding: '10px 40px',
                border: '1px solid transparent',
                '&:hover': {
                  backgroundColor: '#eee',
                  border: `1px solid ${shades.primary[400]}`,
                  color: shades.primary[700],
                  borderRadius: '5px',
                },
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}>
              ADD TO CART
            </Button>
          </Box>

          <Box>
            <Box m="20px 0 5px" display="flex" alignItems="center">
              <IconButton onClick={() => dispatch(addToWishList({ item: item }))}>
                {wishList.some((i) => i.id === item?.id) ? (
                  <FavoriteIcon sx={{ color: shades.secondary[400] }} />
                ) : (
                  <FavoriteBorderOutlinedIcon />
                )}
              </IconButton>
              <Typography sx={{ ml: '5px' }}>ADD TO WISH LIST</Typography>
            </Box>
            <Typography>CATEGORIES: {item?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* {INFORMATION} */}

      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === 'description' ? (
          <div>{item?.attributes?.longDescription}</div>
        ) : (
          <div>Reviews</div>
        )}
      </Box>

      {/* {RELATED ITEMS} */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 200px)"
          gap="1.3%"
          // justifyContent='center'
        >
          {items.length !== 0 &&
            items
              .slice(index, index + 4)
              .map((item, i) => (
                <Item key={`${item.name}-${i}`} item={item} imgWidth="100%" imgHeight="300px" />
              ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;
