import * as Yup from "yup";
import { ValidationMessages } from "@/constants/formEnums";
const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, ValidationMessages.NAME_SHORT)
    .max(50, ValidationMessages.NAME_LONG)
    .required(ValidationMessages.NAME_REQUIRED),
  location: Yup.string()
    .min(4, ValidationMessages.LOCATION_SHORT)
    .max(100, ValidationMessages.LOCATION_LONG)
    .required(ValidationMessages.LOCATION_REQUIRED),
  description: Yup.string()
    .min(20, ValidationMessages.DESCRIPTION_SHORT)
    .max(250, ValidationMessages.DESCRIPTION_LONG)
    .required(ValidationMessages.DESCRIPTION_REQUIRED),
});

export const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, ValidationMessages.NAME_SHORT)
    .max(50, ValidationMessages.NAME_LONG)
    .required(ValidationMessages.NAME_REQUIRED),
  email: Yup.string()
    .email(ValidationMessages.EMAIL_INVALID)
    .required(ValidationMessages.EMAIL_REQUIRED),
  phone: Yup.string()
    .matches(phoneRegExp, ValidationMessages.PHONE_INVALID)
    .required(ValidationMessages.PHONE_REQUIRED),
  gender: Yup.string().required(ValidationMessages.GENDER_REQUIRED),
});
