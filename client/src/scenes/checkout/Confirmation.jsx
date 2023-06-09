import { Box, Alert, AlertTitle, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made on Order -{''}
        <strong>Congrats on making your purchase</strong>. If you will need any help or assistance
        please don't hesitate to contact us - {''}
        <strong>luxemart-ecommerce@support.com</strong>
      </Alert>
      <Button onClick={() => navigate('/')} variant="outlined" sx={{ marginTop: '15px' }}>
        Go back to Main Page
      </Button>
    </Box>
  );
};

export default Confirmation;
