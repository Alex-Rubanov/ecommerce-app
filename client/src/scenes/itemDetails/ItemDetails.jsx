import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { shades } from '../../theme'
import { addToCart } from '../../state'
import { useParams } from 'react-router-dom'

const ItemDetails = () => {
  const dispatch = useDispatch()
  const { itemId } = useParams()

  const [value, setValue] = useState('description')
  const [count, setCount] = useState(1)
  const [item, setItem] = useState(null)
  const [items, setItems] = useState([])

  const handleChange = (event, newValue) => setValue(newValue)

  async function getItem (id) {
    try {
      const response = await fetch(
        `http://localhost:1337/api/items/${id}?populate=image`
      )

      if (!response.ok) throw Error(response.status)

      const { data } = await response.json()
      setItem(data)
    } catch (e) {
      console.error(e)
    }
  }

  const getItems = async () => {
    try {
      const response = await fetch(
        'http://localhost:1337/api/items?populate=image'
      )

      if (!response.ok) throw Error(response.statusText)

      const { data } = await response.json()

      setItems(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getItem(itemId)
    getItems()
  }, [itemId]) //react-hooks/exhaustive-deps

  return (
    <Box width='80%' m='80px auto'>
      <Box display='flex' flexWrap='wrap' columnGap='40px'>
        {/* {IMAGES} */}
        <Box flex='1 1 40%' mb='40%'>
          <img
            src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            alt={item?.name}
            width='100%'
            height='100%'
            style={{ objectFit: 'contain' }}
          />
        </Box>

        {/* {ACTIONS} */}

        <Box flex='1 1 50%' mb='40px'>
          <Box display='flex' justifyContent='space-between'>
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box>

          <Box m='65px 0 25px'>
            <Typography variant='h3'>{item?.attributes?.name}</Typography>
            <Typography>€{item?.attributes?.price}</Typography>
            <Typography sx={{ mt: '20px' }}>
              {item?.attributes?.longDescription}
            </Typography>
          </Box>

          <Box display='flex' alignItems='center' minHeight='50px'>
            <Box
              display='flex'
              alignItems='center'
              border={`1.5px solid ${shades.neutral[300]}`}
              mr='20px'
              p='2px 5px'
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count => count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ItemDetails
