import { Box, Button, Divider, IconButton, Typography, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { decreaseCount, increaseCount, removeFromCart, setIsCartOpen } from '../../state';
import { shades } from '../../theme';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  const isMobile = useMediaQuery('(max-width: 450px)');

  const totalAmount = cart.reduce((total, item) => total + item.count, 0);
  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <Box
      onClick={(e) => {
        if (e.currentTarget !== e.target) return;

        dispatch(setIsCartOpen({}));
      }}
      display={isCartOpen ? 'block' : 'none'}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex="10"
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto">
      {/* {MODAL} */}
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width={isMobile ? '100%' : 'max(400px, 30%)'}
        height="100%"
        backgroundColor="white">
        <Box padding="30px" overflow="auto" height="100%">
          {/* {HEADER} */}
          <FlexBox mb="15px">
            <Typography variant="h3">
              SHOPPING BAG (<b>{totalAmount}</b>)
            </Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* {CART LIST} */}
          <Box>
            {cart.map((item) => (
              <Box key={`${item.attributes.name}-${item.id}`} position="relative">
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%" alignSelf="start">
                    <img
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
                      alt={item?.name}
                      width="123px"
                      height="164px"
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    {/* {ITEM NAME} */}
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">{item.attributes.name}</Typography>
                      <IconButton onClick={() => dispatch(removeFromCart({ id: item.id }))}>
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.attributes.shortDescription}</Typography>

                    {/* {AMOUNT} */}
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}>
                        <IconButton onClick={() => dispatch(decreaseCount({ id: item.id }))}>
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton onClick={() => dispatch(increaseCount({ id: item.id }))}>
                          <AddIcon />
                        </IconButton>
                      </Box>
                    </FlexBox>
                  </Box>

                  {/* {PRICE} */}
                  <Typography fontWeight="bold" position="absolute" right="0" bottom="10%">
                    €{item.attributes.price}
                  </Typography>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* {ACTIONS} */}
          <Box m="20px 0">
            {totalAmount ? (
              <FlexBox m="20px 0">
                <Typography fontWeight="bold">SUBTOTAL</Typography>
                <Typography fontWeight="bold">€{totalPrice}</Typography>
              </FlexBox>
            ) : (
              <FlexBox m="20px 0">
                <Typography fontWeight="bold" fontSize="large">
                  CART IS EMPTY
                </Typography>
              </FlexBox>
            )}
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: 'white',
                display: cart.length ? '' : 'none',
                borderRadius: 0,
                minWidth: '100%',
                padding: '20px 40px',
                margin: '20px 0',
                transition: '0.2s ease',
                border: '1px solid transparent',
                '&:hover': {
                  backgroundColor: '#eee',
                  border: `1px solid ${shades.primary[400]}`,
                  color: shades.primary[700],
                  borderRadius: '5px',
                },
              }}
              onClick={() => {
                navigate('/checkout');
                dispatch(setIsCartOpen({}));
              }}>
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
