import * as yup from 'yup';

export const initialValues = {
  billingAddress: {
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: '',
    lastName: '',
    country: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  },
  email: '',
  phoneNumber: '',
};

export const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup.string().trim().required('required'),
      lastName: yup.string().trim().required('required'),
      country: yup.string().trim().required('required'),
      street1: yup.string().trim().required('required'),
      street2: yup.string(),
      city: yup.string().trim().required('required'),
      state: yup.string().trim().required('required'),
      zipCode: yup.string().trim().required('required'),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === false,
        then: () => yup.string().trim().required('required'),
      }),
      lastName: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === false,
        then: () => yup.string().trim().required('required'),
      }),
      country: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === false,
        then: () => yup.string().trim().required('required'),
      }),
      street1: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === false,
        then: () => yup.string().trim().required('required'),
      }),
      street2: yup.string(),
      city: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === false,
        then: () => yup.string().trim().required('required'),
      }),
      state: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === false,
        then: () => yup.string().trim().required('required'),
      }),
      zipCode: yup.string().when('isSameAddress', {
        is: (isSameAddress) => isSameAddress === false,
        then: () => yup.string().trim().required('required'),
      }),
    }),
  }),
  yup.object().shape({
    email: yup.string().trim().required('required'),
    phoneNumber: yup.string().trim().required('required'),
  }),
];
