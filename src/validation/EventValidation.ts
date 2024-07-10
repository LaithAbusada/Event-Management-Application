import * as Yup from "yup";
import { ValidationMessages } from "@/constants/formEnums";

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
