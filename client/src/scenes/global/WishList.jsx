import { Box, IconButton, Typography, useMediaQuery } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import { removeFromWishList, setIsWishListOpen } from '../../state';
import { useNavigate } from 'react-router-dom';

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
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box
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
        right="0"
        bottom="0"
        width={isMobile ? '100%' : '30%'}
        oferflow="auto"
        height="100vh"
        backgroundColor="white">
        <Box padding="30px" overflow="auto" height="100%">
          {/* {HEADER} */}
          <FlexBox mb="15px">
            <Typography variant="h3" pt="5px">
              YOUR WISHLIST
            </Typography>
            <IconButton onClick={() => dispatch(setIsWishListOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          <Box>
            {wishList.map((item) => (
              <Box
                key={`${item.attributes.name}-${item.id}`}
                position="relative"
                onClick={() => navigate(`/item/${item?.id}`)}
                sx={{ cursor: 'pointer' }}>
                <FlexBox p="15px 0" alignItems="center" justifyContent="start">
                  <Box alignSelf="start">
                    <img
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.small?.url}`}
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
