import * as React from "react";
import { Formik, FormikHelpers, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRouter } from "next/router";
import { addEvent, updateEvent } from "@/lib/firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { uploadImage } from "@/lib/firebase/storage";
import { showToast } from "@/helpers/toast";
import { validationSchema } from "@/validation/EventValidation";
import _ from "lodash";
import FormField from "./FormField";
import SubmitButton from "./SubmitButton";
import { EventFormProps, MyFormValues } from "@/interfaces/interfaces";
import { Event } from "@/interfaces/interfaces";
import { TOAST_TYPES } from "@/constants/toastEnums";

function EventForm({ event }: EventFormProps) {
  const router = useRouter();

  const [initialValues, setInitialValues] = useState<MyFormValues>({
    name: "",
    location: "",
    description: "",
  });

  const [date, setDate] = useState<Date | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (event) {
      setInitialValues({
        name: event.name,
        location: event.location,
        description: event.description,
      });
      const d = new Date(event.date);
      setDate(d);
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (e.target.id === "image") {
      setImage(file);
    } else if (e.target.id === "video") {
      setVideo(file);
    }
  };

  const handleSubmit = async (
    values: MyFormValues,
    actions: FormikHelpers<MyFormValues>
  ) => {
    actions.setSubmitting(false);
    setLoading(true);
    try {
      const myTimestamp = date ? Timestamp.fromDate(date) : undefined;
      const imageUrl = image ? await uploadImage(image) : undefined;
      const data: Partial<Event> = {
        ...values,
        image: imageUrl,
        date: myTimestamp,
      };
      // if there is an event it means we are in edit event
      if (event) {
        const d = new Date(event.date);

        const updatedData: Partial<Event> = {};
        if (values.name != initialValues.name) {
          updatedData.name = values.name;
        }
        if (values.location != initialValues.location) {
          updatedData.location = values.location;
        }
        if (values.description != initialValues.description) {
          updatedData.description = values.description;
        }

        if (date?.getMilliseconds() != d.getMilliseconds()) {
          updatedData.date = myTimestamp;
        }

        if (imageUrl) {
          updatedData.image = imageUrl;
        }

        if (!_.isEmpty(updatedData)) {
          updatedData.id = event.id;
          await updateEvent(updatedData);
          showToast(
            TOAST_TYPES.SUCCESS,
            "The event has been edited successfully!"
          );
        } else {
          showToast(
            TOAST_TYPES.INFO,
            "No values were changed, redirecting to dashboard"
          );
        }
      } else {
        //if there is no event it means we are in add event
        await addEvent(data);
        showToast(
          TOAST_TYPES.SUCCESS,
          "A new event has been added successfully!"
        );
      }
      router.push("/dashboard");
    } catch (error) {
      showToast(
        TOAST_TYPES.ERROR,
        "There was an error processing your request, please try again later"
      );
    }
    setLoading(false);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          {event ? "Edit Event" : "Add a new event"}
        </h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize
        >
          {({ errors, touched }) => (
            <Form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <FormField
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Type Event Name"
                    label="Event Name"
                  />
                  {errors.name && touched.name ? (
                    <div className="text-red-600">{errors.name}</div>
                  ) : null}
                </div>
                <div className="w-full">
                  <FormField
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Event Location"
                    label="Location"
                  />
                  {errors.location && touched.location ? (
                    <div className="text-red-600">{errors.location}</div>
                  ) : null}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date & Time
                  </label>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      disablePast
                      value={date}
                      views={[
                        "year",
                        "month",
                        "day",
                        "hours",
                        "minutes",
                        "seconds",
                      ]}
                      slotProps={{
                        textField: {
                          required: true,
                        },
                      }}
                      onChange={(date: Date | null) => setDate(date)}
                    />
                  </LocalizationProvider>
                </div>
                <div className="sm:col-span-2">
                  <FormField
                    as="textarea"
                    rows={5}
                    name="description"
                    id="description"
                    placeholder="Your description here"
                    label="Description"
                  />
                  {errors.description && touched.description ? (
                    <div className="text-red-600">{errors.description}</div>
                  ) : null}
                </div>
                {event && event.image && (
                  <div className="mb-2 w-full">
                    <span className="block text-gray-700 dark:text-gray-300">
                      Current Event Image:
                    </span>
                    <img
                      src={event.image}
                      alt="Current Event Image"
                      className="h-20 w-20 object-cover"
                    />
                  </div>
                )}
                <div className="w-full">
                  <FormField
                    id="image"
                    name="image"
                    type="file"
                    FormChange={handleChange}
                    label={event ? "Upload New Image" : "Upload Image"}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="video"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Video (Optional)
                  </label>
                  <input id="video" name="video" type="file" accept="video/*" />
                </div>
                <div className="sm:col-span-2 flex justify-center mt-10">
                  <SubmitButton
                    loading={loading}
                    message={event ? "Edit Event" : "Add Event"}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default EventForm;
