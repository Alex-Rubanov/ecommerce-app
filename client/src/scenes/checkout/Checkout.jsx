import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Stepper, Step, StepLabel, CircularProgress } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { shades } from '../../theme';
import { initialValues, checkoutSchema } from '../../utils/checkoutValidation';
import Shipping from './Shipping';
import Payment from './Payment';
import { loadStripe } from '@stripe/stripe-js';
import { addToCart } from '../../state';
import { useNavigate } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TOKEN);

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const isFinalStep = activeStep === 2;

  // useEffect(() => {

  //   if (localStorage.getItem('cart')) {
  //     const data = JSON.parse(localStorage.getItem('cart'));
  //     console.log(data);

  //     dispatch(
  //       addToCart(
  //         data?.map((item) => {
  //           const { count } = item;

  //           return { item: { ...item, count } };
  //         }),
  //       ),
  //     );
  //   }
  // }, []);

  console.log(cart);

  const handleFormSubmit = async (values, actions) => {
    setActiveStep((prev) => prev + 1);

    //copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue('shippingAddress', {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      localStorage.setItem('cart', JSON.stringify(cart));
      makePayment(values);
    }

    actions.setTouched({});
  };

  async function makePayment(values) {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.billingAddress.firstName, values.billingAddress.lastName].join(' '),
      email: values.email,
      products: cart.map(({ id, count }) => ({
        id,
        count,
      })),
    };

    const response = await fetch('http://localhost:1337/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) throw Error(response.statusText);

    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
  }

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: '20px  0' }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box
                display="flex"
                justifyContent={isFinalStep ? 'center' : 'space-between'}
                gap="50px">
                {isSecondStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: 'none',
                      color: 'white',
                      borderRadius: 0,
                      padding: '15px 40px',
                    }}
                    onClick={() => setActiveStep((prev) => prev - 1)}>
                    Back
                  </Button>
                )}
                {isFinalStep ? (
                  <Box>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[400],
                      boxShadow: 'none',
                      color: 'white',
                      borderRadius: 0,
                      padding: '15px 40px',
                      // display: activeStep === 3 ? 'none' : '',
                    }}>
                    {isFirstStep ? 'Next' : 'Place Order'}
                  </Button>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Checkout;
