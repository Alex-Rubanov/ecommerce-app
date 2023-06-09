import { useSelector } from 'react-redux'
import { Box, Button, Stepper, Step, StepLabel } from '@mui/material'
import { Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import { shades } from '../../theme'
import { initialValues, checkoutSchema } from '../../utils/checkoutValidation'
import Shipping from './Shipping'

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)
  const cart = useSelector(state => state.cart.cart)
  const isFirstStep = Boolean(!activeStep)
  const isSecondStep = Boolean(activeStep)

  const handleSubmit = async (value, actions) => {
    setActiveStep(prev => prev + 1)
  }

  return (
    <Box width='80%' m='100px auto'>
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
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={() => checkoutSchema(yup)[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue
          }) => (
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
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  )
}

export default Checkout
