import { Badge, Box, IconButton } from '@mui/material'
import {
  PersonOutlined,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { shades } from '../../theme'
import { setIsCartOpen } from '../../state'
import { useSelector, useDispatch } from 'react-redux'

const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart.cart)

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
        zIndex: '1'
      }}
    >
      <Box
        sx={{
          width: '80%',
          margin: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Box
          onClick={() => navigate('/')}
          sx={{
            '&:hover': { cursor: 'pointer' }
          }}
          color={shades.secondary[600]}
        >
          LuxeMart
        </Box>
        <Box
          display='flex'
          justifyContent='space-between'
          columnGap='20px'
          zIndex='2'
        >
          <IconButton sx={{ color: shades.primary[900] }}>
            <SearchOutlined />
          </IconButton>
          <IconButton sx={{ color: shades.primary[900] }}>
            <PersonOutlined />
          </IconButton>
          <Badge
            badgeContent={cart.length}
            color='secondary'
            invisible={cart.length === 0}
            sx={{
              '& .MuiBadge-badge': {
                right: 5,
                top: 5,
                padding: '0 4px',
                height: '14px',
                minWidth: '13px'
              }
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen())}
              sx={{ color: shades.primary[900] }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          <IconButton sx={{ color: shades.primary[900] }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
