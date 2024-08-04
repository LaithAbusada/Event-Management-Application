import React from "react";

import EventCard from "@/components/EventCard";
import RegisterForm from "@/components/RegisterForm";
import { EventData } from "@/interfaces";
import { getEventById } from "@/lib/firebase/firestore";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

function Register({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!event) {
    return <p>Error fetching event</p>;
  }
  return (
    <>
      <Head>
        <title>{event.name}</title>
        <meta name="description" content={event.description} />
        <meta
          name="keywords"
          content="Event Management, Conferences, Workshops, Social Gatherings, Event Planning, Event Organizer"
        />
        <meta name="author" content="EventCo" />
        <meta property="og:title" content={event.name} />
        <meta property="og:description" content={event.description} />
        <link
          rel="canonical"
          href={`https://event-management-application-theta.vercel.app/register/${event.id}`}
        />
      </Head>
      <div className="grid sm:grid-cols-2 grid-cols-1">
        <div className=" p-4">
          <EventCard event={event} />
        </div>
        <div className="p-4">
          <RegisterForm id={event.id} />
        </div>
      </div>
    </>
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
