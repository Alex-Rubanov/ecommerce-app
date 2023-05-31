import { Box, Typography, IconButton, useMediaQuery } from '@mui/material'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { shades } from '../../theme'

// imports all images from assets folder
const importAll = fn =>
  fn.keys().reduce((acc, item) => {
    acc[item.replace('./', '')] = fn(item)
    return acc
  }, {})

const heroTextureImports = importAll(
  require.context('../../assets', false, /\.(png|jpe?g|svg)$/)
)

console.log(heroTextureImports)

const MainCarousel = () => {
  return <>Test</>
}

export default MainCarousel
