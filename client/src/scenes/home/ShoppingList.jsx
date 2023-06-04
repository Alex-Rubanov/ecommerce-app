import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material'
import Item from '../../components/Item'
import { setItems } from '../../state'
import { categoryFilter } from '../../utils/categoryFilter'

const ShoppingList = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('all')
  const items = useSelector(state => state.cart.items)
  const isMobile = useMediaQuery('(max-width: 600px)')

  console.log('items >> ', items)

  const handleChange = (event, newValue) => setValue(newValue)

  const getItems = async () => {
    const response = await fetch('http://localhost:1337/api/items?populate=*')

    if (!response.ok) throw Error(response.statusText)

    const { data } = await response.json()

    dispatch(setItems(data))
  }

  // console.log('fn >> ', categoryFilter(items, value))

  useEffect(() => {
    getItems()
  }, [])

  return (
    <Box width='80%' margin='80px auto'>
      <Typography variant='h3' textAlign='center'>
        Our Featurec <b>Products</b>
      </Typography>
      <Tabs
        textColor='primary'
        indicatorColor='primary'
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isMobile ? 'none' : 'block' } }}
        sx={{
          margin: '25px',
          '& .MuiTabs-flexContainer': {
            flexWrap: 'wrap'
          }
        }}
      >
        <Tab label='ALL' value='all' />
        <Tab label='NEW ARRIVALS' value='newArrivals' />
        <Tab label='BEST SELLERS' value='bestSellers' />
        <Tab label='TOP RATED' value='topRated' />
      </Tabs>
      <Box
        margin='0 auto'
        display='grid'
        gridTemplateColumns='repeat(auto-fill, 300px)'
        justifyContent='space-around'
        rowGap='20px'
        columnGap='1.33%'
      >
        {items &&
          categoryFilter(items, value)?.map(item => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
      </Box>
    </Box>
  )
}

export default ShoppingList
