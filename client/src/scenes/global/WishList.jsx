import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { removeFromWishList, setIsWishListOpen } from '../../state';

const FlexBox = styled(Box)`
  display: flex;
  justify-content: start;
  align-items: start;
  gap: 10px;
`;

const WishList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.cart.wishList);
  const isWishListOpen = useSelector((state) => state.cart.isWishListOpen);
  const isMobile = useMediaQuery('(max-width: 450px)');

  const openWishList = (e) => {
    if (e.currentTarget !== e.target) return;

    dispatch(setIsWishListOpen({}));
  };

  const redirectOnItemPage = (item) => {
    dispatch(setIsWishListOpen({}));
    navigate(`/item/${item?.id}`);
  };

  return (
    <Box
      onClick={openWishList}
      display={isWishListOpen ? 'block' : 'none'}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      sx={{
        position: 'fixed',
        zIndex: '10',
        width: '100%',
        height: '100vh',
        left: '0',
        top: '0',
        bottom: '0',
        right: '0',
        overflow: 'hidden',
      }}>
      {/* {MODAL} */}
      <Box
        position="fixed"
        top="0"
        right="0"
        width={isMobile ? '100%' : 'max(400px, 30%)'}
        oferflow="auto"
        height="100vh"
        backgroundColor="white">
        <Box padding="15px" overflow="auto" height="100%">
          {/* {HEADER} */}
          <Box mb="15px" display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" pt="5px">
              YOUR WISHLIST
            </Typography>
            <IconButton size="large" onClick={() => dispatch(setIsWishListOpen({}))}>
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>

          <Box>
            {wishList.map((item) => (
              <Box
                key={`${item.attributes.name}-${item.id}`}
                position="relative"
                sx={{ cursor: 'pointer' }}>
                <FlexBox p="15px 0" alignItems="center" justifyContent="start">
                  <Box alignSelf="start" onClick={() => redirectOnItemPage(item)}>
                    <img
                      src={item?.attributes?.image?.data?.attributes?.formats?.small?.url}
                      alt={item?.name}
                      width="70px"
                      height="90px"
                      style={{ objectFit: 'cover', borderRadius: '5px' }}
                    />
                  </Box>
                  <Box>
                    {/* {ITEM NAME} */}
                    <FlexBox mb="5px" alignContent="flex-start">
                      <Typography fontWeight="bold" p="7px 0">
                        {item.attributes.name}
                      </Typography>
                      <IconButton onClick={() => dispatch(removeFromWishList({ id: item.id }))}>
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                  </Box>
                </FlexBox>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default WishList;
