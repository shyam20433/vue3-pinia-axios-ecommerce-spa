import * as yup from 'yup'

const productSchema = yup.object({
  name: yup.string().required().min(3),
  price: yup.number().required().positive(),
  image: yup.string().required().url(),
  description: yup.string().required().min(10),
  category: yup.string().required(),
  brand: yup.string().required().min(2),
})

export default productSchema

