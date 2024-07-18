import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getAttendees, getEventById } from "@/lib/firebase/firestore";
import AttendeeList from "@/components/AttendeeList";
import { Attendee } from "@/interfaces/interfaces";

function ManageUsers({
  attendees,
  eventName,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">
        {eventName ? eventName : "There was an error fetching this event data"}
      </h1>
      {attendees ? (
        <AttendeeList attendees={attendees} />
      ) : (
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-8">
          There was an error fetching attendees of this event
        </h1>
      )}
    </div>
  );
}

export const getServerSideProps = (async (context) => {
  const id = context?.params?.id as string;

  try {
    const attendees = await getAttendees(id);
    const event = await getEventById(id);
    const { name: eventName } = event;

    return { props: { attendees, eventName } };
  } catch (error) {
    console.log("error");
    return { props: { attendees: null, eventName: "" } };
  }
}) satisfies GetServerSideProps<{
  attendees: Attendee[] | null;
  eventName: string;
}>;

export default ManageUsers;
