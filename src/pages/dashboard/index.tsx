import { RootState } from "@/state/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EventList from "@/components/EventList";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { EventData } from "@/interfaces/interfaces";
import { getEvents } from "@/lib/firebase/firestore";
import InfinteScroller from "@/components/InfinteScroller";

function Index({
  events,
  limit,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    // when user refreshes the page, revert the page scroll back to the top, as sometimes that would cause errors for the infiniteScroller
    window.history.scrollRestoration = "manual";
  }, []);
  return (
    <div className="smallScreen">
      <Link href="/add-event">
        <button
          type="button"
          className="ml-20 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Add Event
        </button>
      </Link>

      {events.length > 0 ? (
        <InfinteScroller events={events} edit={true} limit={limit} />
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="sm:text-2xl font-bold text-gray-700 m-2">
            There are no events currently, Stay tuned for future events 🔥
          </h1>
        </div>
      )}
    </div>
  );
}

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
