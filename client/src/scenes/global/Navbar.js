import { Badge, Box, IconButton } from '@mui/material'
import {
  PersonOutlined,
  ShoppingBagOutlined,
  MenuOutlined,
  SearchOutlined
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { shades } from '../../theme'

const Navbar = () => {
  const navigate = useNavigate()

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
          <IconButton sx={{ color: shades.primary[900] }}>
            <ShoppingBagOutlined />
          </IconButton>
          <IconButton sx={{ color: shades.primary[900] }}>
            <MenuOutlined />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
