import { useTheme } from '@mui/material'
import { Box, Typography } from '@mui/material'
import { shades } from '../../theme'

const Footer = () => {
  const {
    palette: { neutral }
  } = useTheme()

  return (
    <Box mt='70px' p='40px 0' backgroundColor={neutral.light}>
      <Box
        width='80%'
        margin='auto'
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        rowGap='30px'
        columnGap='clamp(20px, 30px,  40px)'
      >
        <Box width='clamp(20%, 30%,  40%)'>
          <Typography
            vairant='h4'
            fontWeight='bold'
            mb='30px'
            color={shades.secondary[500]}
          >
            LUXEMART
          </Typography>
          <div>
            <p>
              Introducing <b>LuxeMart</b>, your ultimate destination for trendy
              and fashionable clothing.
            </p>
            <p>
              Embrace your unique style, express yourself through fashion, and
              make a statement wherever you go. Shop with us today and
              experience the joy of fashion at your fingertips.
            </p>
            <p>LuxeMart - Where Style Meets Convenience.</p>
          </div>
        </Box>

        <Box>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            About Us
          </Typography>
          <Typography mb='30px'>Careers</Typography>
          <Typography mb='30px'>Our Store</Typography>
          <Typography mb='30px'>Terms & Conditions</Typography>
          <Typography mb='30px'>Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant='h4' fontWeight='bold' mb='30px'>
            Customer Care
          </Typography>
          <Typography mb='30px'>Help Center</Typography>
          <Typography mb='30px'>Track Your Order</Typography>
          <Typography mb='30px'>Corporate & Bulk Purchasing</Typography>
          <Typography mb='30px'>Return & Refunds</Typography>
        </Box>

        <Box width='clamp(20%, 25%,  30%)'>
          <Typography vairant='h4' fontWeight='bold' mb='30px'>
            Contact Us
          </Typography>
          <Typography mb='30px'>
            38th South Blvd, Washington, DC 10501
          </Typography>
          <Typography mb='30px'>
            email: customer-service@luxemart.com
          </Typography>
          <Typography mb='30px'>
            <a
              href='tel:353-555-700'
              style={{
                textDecoration: 'none',
                color: shades.primary[700]
              }}
            >
              tel: (353)-555-700
            </a>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
