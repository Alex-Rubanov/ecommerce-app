import { Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { shades } from '../../theme';

// imports all images from assets folder
const importAll = (fn) =>
  fn.keys().reduce((acc, item) => {
    acc[item.replace('./', '')] = fn(item);
    return acc;
  }, {});

const heroTextureImports = importAll(require.context('../../assets', false, /\.(png|jpe?g|svg)$/));

const MainCarousel = () => {
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div style={{ marginTop: '60px' }}>
      <Carousel
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        autoPlay={true}
        interval={3500}
        stopOnHover={false}
        renderArrowPrev={(onClickHandler) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: 'absolute',
              top: '45%',
              left: '15px',
              color: 'white',
              padding: '5px',
              zIndex: '10',
            }}>
            <NavigateBeforeIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}
        renderArrowNext={(onClickHandler) => (
          <IconButton
            onClick={onClickHandler}
            sx={{
              position: 'absolute',
              top: '45%',
              right: '15px',
              color: 'white',
              padding: '5px',
              zIndex: '10',
            }}>
            <NavigateNextIcon sx={{ fontSize: 40 }} />
          </IconButton>
        )}>
        {Object.values(heroTextureImports).map((img, index) => (
          <Box key={`carousel-image-${index}`} sx={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}>
            <img
              src={img}
              alt={`carousel-img${index}`}
              style={{
                width: '100%',
                height: '750px',
                objectFit: 'cover',
                backgroundAttachment: 'fixed',
              }}
            />
            <Box
              color="white"
              padding="20px"
              borderRadius="5px"
              textAlign="left"
              backgroundColor="rgba(0, 0, 0, 0.4)"
              position="absolute"
              bottom="20%"
              left={isMobile ? '0' : '10%'}
              right={isMobile ? '0' : null}
              margin={isMobile ? '0 auto' : null}
              maxWidth={isMobile ? '240px' : null}>
              <Typography color={shades.secondary[200]}>-- NEW COLLECTION</Typography>
              <Typography variant="h1">Summer sale</Typography>
              <Typography
                fontWeight="bold"
                color={shades.secondary[300]}
                sx={{ textDecoreation: 'underline' }}>
                Discover More
              </Typography>
            </Box>
          </Box>
        ))}
      </Carousel>
    </div>
  );
};

export default MainCarousel;
