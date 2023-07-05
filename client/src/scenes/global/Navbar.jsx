import { Badge, Box, IconButton, useMediaQuery } from '@mui/material';
import {
  PersonOutlined,
  ShoppingBagOutlined,
  SearchOutlined,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { shades } from '../../theme';
import { setIsCartOpen, setIsWishListOpen, setIsSearchOpen } from '../../state';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const wishList = useSelector((state) => state.cart.wishList);
  const isMobile = useMediaQuery('(max-width: 450px)');

  const total = cart.reduce((total, item) => total + item.count, 0);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '60px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        color: 'black',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '1',
      }}>
      <Box
        sx={{
          width: '80%',
          margin: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Box
          onClick={() => navigate('/')}
          sx={{
            '&:hover': { cursor: 'pointer' },
          }}
          color={shades.secondary[600]}>
          LuxeMart
        </Box>
        <Box
          display="flex"
          justifyContent={isMobile ? 'flex-end' : 'space-between'}
          columnGap={isMobile ? '5px' : '20px'}
          zIndex="2">
          <IconButton
            sx={{ color: shades.primary[900] }}
            onClick={() => dispatch(setIsSearchOpen({}))}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: shades.primary[900] }}>
            <PersonOutlined />
          </IconButton>
          <Badge
            badgeContent={total}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px',
              },
            }}>
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: shades.primary[900] }}>
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton
            onClick={() => dispatch(setIsWishListOpen({}))}
            sx={{ color: shades.primary[900] }}>
            {wishList.length ? (
              <FavoriteIcon sx={{ color: shades.secondary[400] }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
