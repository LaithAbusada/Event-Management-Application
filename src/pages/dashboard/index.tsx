import React, { useEffect } from "react";
import EventList from "@/components/EventList";
import Head from "next/head";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getEvents } from "@/lib/firebase/firestore";
import { EventData } from "@/interfaces";
import InfinteScroller from "@/components/InfinteScroller";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setEvents } from "@/state/events/eventsSlice";
import Link from "next/link";
import SubmitButton from "@/components/SubmitButton";

const Index = ({
  events,
  limit,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const dispatch = useDispatch();

  if (events) dispatch(setEvents(events));
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return (
    <>
      <div className="text-center mb-2">
        <Link href="/add-event">
          <SubmitButton loading={false} message="Add Event" />
        </Link>
      </div>
      {events.length > 0 ? (
        <InfinteScroller edit={true} limit={limit} />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="sm:text-2xl font-bold text-gray-700 m-2">
            There are no events currently, Stay tuned for future events 🔥
          </h1>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = (async () => {
  try {
    const limit: number = parseInt(process.env.EVENTS_DISPLAYED_LIMIT!);
    const events = await getEvents(limit);
    return {
      props: { events, limit },
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      props: { events: [], limit: 0 },
    };
  }
}) satisfies GetServerSideProps<{
  events: EventData[];
  limit: number;
}>;

export default Index;
