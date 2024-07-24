import React from "react";

import EventCard from "@/components/EventCard";
import RegisterForm from "@/components/RegisterForm";
import { EventData } from "@/interfaces/interfaces";
import { getEventById } from "@/lib/firebase/firestore";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

function Register({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!event) {
    return <p>Error fetching event</p>;
  }
  return (
    <div className="flex flex-col sm:flex-row justify-center mt-20">
      <div className="flex-1  p-4">
        <EventCard event={event} />
      </div>
      <div className="flex-1 p-4">
        <RegisterForm id={event.id} />
      </div>
    </div>
  );
}

export const getServerSideProps = (async (context) => {
  const id = context?.params?.id as string;
  try {
    const event = await getEventById(id);
    return {
      props: {
        event,
      },
    };
  } catch (error) {
    const emptyEvent: EventData = {
      id: "",
      name: "",
      date: "",
      time: "",
      location: "",
      image: "",
      description: "",
    };
    return {
      props: {
        event: emptyEvent,
      },
    };
  }
}) satisfies GetServerSideProps<{ event: EventData | {} }>;
export default Register;
