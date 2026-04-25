import * as Yup from "yup";

export const BrandSchema = Yup.object({
    brandName: Yup.string()
        .required("Brand name is required")
        .min(2, "Minimum 2 characters required")
        .max(50, "Maximum 50 characters allowed")
});