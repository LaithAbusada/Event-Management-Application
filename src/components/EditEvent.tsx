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
import { toast } from "react-toastify";
import { ValidationMessages } from "@/constants/formEnums";
import { Event, MyFormValues } from "@/interfaces/EventInterface";
import { validationSchema } from "@/validation/EventValidation";
import { RootState } from "@/state/store";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { validateSections } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";
import _ from "lodash";
import { EditEventProps } from "@/interfaces/propsInterfaces";

function EditEvent(props: EditEventProps) {
  const { event } = props;

  const initialValues: MyFormValues = {
    name: event.name,
    location: event.location,
    description: event.description,
  };

  const [date, setDate] = useState<Date | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    const data: Partial<Event> = {};
    const myTimestamp = date ? Timestamp.fromDate(date) : null;
    if (myTimestamp) {
      data.date = myTimestamp;
    }

    try {
      if (image) {
        const imageUrl = image && (await uploadImage(image));
        data.image = imageUrl;
      }

      if (values.name != event.name) {
        data.name = values.name;
      }

      if (values.description != event.description) {
        data.description = values.description;
      }

      if (values.location != event.location) {
        data.location = values.location;
      }
      if (_.isEmpty(data)) {
        toast.info("No values were changed, redirecting to dashboard", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        setLoading(false);
        router.push("/dashboard");
        return;
      }
      data.id = event.id;

      await updateEvent(data);
      toast.success("the event has been edited successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "There was an error editing your event, please try again later",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );
    }
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          Edit Event
        </h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type Event Name"
                  />
                  {errors.name && touched.name ? (
                    <div className="text-red-600">{errors.name}</div>
                  ) : null}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <Field
                    type="text"
                    name="location"
                    id="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Event Location"
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
                      value={event.date.toDate()}
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
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Event Description
                  </label>
                  <Field
                    as="textarea"
                    rows={5}
                    name="description"
                    id="description"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your description here"
                  />
                  {errors.description && touched.description ? (
                    <div className="text-red-600">{errors.description}</div>
                  ) : null}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Add New Image
                  </label>

                  <Field
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="video"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Video (Optional)
                  </label>
                  <Field
                    id="video"
                    name="video"
                    type="file"
                    accept="video/*"
                    onChange={onChange}
                  />
                </div>
                <div className="sm:col-span-2 flex justify-center mt-10">
                  <button
                    type="submit"
                    className="px-40 py-5 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="#1C64F2"
                          />
                        </svg>
                        Loading...
                      </>
                    ) : (
                      "Edit Event"
                    )}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default EditEvent;
