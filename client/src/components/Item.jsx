import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { shades } from '../theme'
import { addToCart } from '../state'
import { useNavigate } from 'react-router-dom'

const Item = ({ item, width, imgWidth, imgHeight }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [count, setCount] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  const {
    palette: { neutral }
  } = useTheme()

  const { category, price, name, image } = item.attributes
  const {
    data: {
      attributes: {
        formats: {
          small: { url }
        }
      }
    }
  } = image

  return (
    <Box width={width}>
      <Box
        position='relative'
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {item && (
          <img
            src={`http://localhost:1337${url}`}
            alt={item?.name}
            width={imgWidth || '300px'}
            height={imgHeight || '400px'}
            onClick={() => navigate(`/item/${item.id}`)}
            style={{
              cursor: 'pointer',
              objectFit: 'cover',
              borderRadius: '7px',
              border: 'none'
            }}
          />
        )}
        <Box
          display={isHovered ? 'block' : 'none'}
          position='absolute'
          bottom='10%'
          left='0'
          width='100%'
          padding='0 5%'
        >
          <Box display='flex' justifyContent='space-between'>
            {/* {AMOUNT} */}
            <Box
              display='flex'
              alignItems='center'
              backgroundColor={shades.neutral[100]}
              borderRadius='3px'
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count => count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>

            {/* {BUTTON} */}
            <Button
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
              sx={{
                backgroundColor: shades.primary[300],
                color: 'white'
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box marginTop='3px' padding='0 5px'>
        <Typography variant='subtitle2' color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())}
        </Typography>
        <Typography>{name}</Typography>
        <Typography fontWeight='bold'>{price}€</Typography>
      </Box>
    </Box>
  )
}

export default Item
