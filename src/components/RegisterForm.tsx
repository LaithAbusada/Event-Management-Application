import * as React from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import { addAttendee, addEvent } from "@/lib/firebase/firestore";
import { toast } from "react-toastify";
import { RegisterFormValues } from "@/interfaces/EventInterface";
import { RegisterSchema, validationSchema } from "@/validation/EventValidation";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import { Attendee } from "@/interfaces/UserInterface";
import { showToast } from "@/helpers/toast";
import { TOAST_TYPES } from "@/constants/toastEnums";
import { v4 as uuidv4 } from "uuid";

interface RegisterFormProps {
  id: string;
}
function RegisterForm(props: RegisterFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues: RegisterFormValues = {
    name: "",
    gender: "",
    email: "",
    phone: "",
  };
  const { id } = props;

  const handleSubmit = async (
    values: RegisterFormValues,
    actions: FormikHelpers<RegisterFormValues>
  ) => {
    actions.setSubmitting(false);
    setLoading(true);
    try {
      const data: Attendee = {
        eventID: id,
        ...values,
        id: uuidv4(),
      };

      await addAttendee(data);
      showToast(TOAST_TYPES.SUCCESS, "You have registered successfully!");
    } catch (error) {
      showToast(
        TOAST_TYPES.ERROR,
        "There was an error with your registration, please try again later"
      );
    }
    setLoading(false);
    router.push("/");
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={RegisterSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <FormField
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    label="Name"
                  />
                  {errors.name && touched.name ? (
                    <div className="text-red-600">{errors.name}</div>
                  ) : null}
                </div>
                <div className="w-full">
                  <FormField
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    label="Email"
                  />
                  {errors.email && touched.email ? (
                    <div className="text-red-600">{errors.email}</div>
                  ) : null}
                </div>
                <div className="w-full">
                  <FormField
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Enter your phone number"
                    label="Phone Number"
                  />
                  {errors.phone && touched.phone ? (
                    <div className="text-red-600">{errors.phone}</div>
                  ) : null}
                </div>
                <div className="w-full">
                  <FormField
                    as="select"
                    name="gender"
                    id="gender"
                    label="Gender"
                  >
                    <option value="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </FormField>
                  {errors.gender && touched.gender ? (
                    <div className="text-red-600">{errors.gender}</div>
                  ) : null}
                </div>
                <div className="sm:col-span-2 flex justify-center mt-10">
                  <SubmitButton loading={loading} message="Register Now" />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default RegisterForm;
