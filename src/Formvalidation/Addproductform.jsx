import * as Yup from 'yup'

// Custom validation for images (optional but useful)
const imageValidation = Yup.array()
  .min(1, 'At least 1 image is required')
  .max(5, 'Maximum 5 images allowed')
  .test('fileType', 'Only image files are allowed', (value) => {
    if (!value || value.length === 0) return true

    return value.every((file) =>
      ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)
    )
  })

export const AddProductSchema = Yup.object({
  productName: Yup.string()
    .min(3, 'Product name must be at least 3 characters')
    .required('Product name is required'),

  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),

  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than 0')
    .required('Price is required'),

  stockQuantity: Yup.number()
    .typeError('Stock must be a number')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock quantity is required'),

  categoryId: Yup.string()
    .required('Please select a category'),

  brandId: Yup.string()
    .required('Please select a brand'),

  productImages: imageValidation
})