import * as Yup from "yup";

export const CategorySchema = Yup.object({
    categoryName: Yup.string()
        .required("Category name is required")
        .min(2, "Minimum 2 characters required")
        .max(50, "Maximum 50 characters allowed")
});