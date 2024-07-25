import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { EventData } from "@/interfaces";
import EventForm from "@/components/EventForm";
import { getEditEvent } from "@/lib/firebase/firestore";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

function EditEventId({
  event,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const data = useSelector((state: RootState) => state.events.data);
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {event ? (
        <EventForm event={event} withEdit />
      ) : (
        <h2 className="text-center text-red-500 h-screen mt-20 text-2xl font-bold">
          Couldn't find the event you are trying to edit , Please try again
        </h2>
      )}
    </>
  );
}

export const getServerSideProps = (async (context) => {
  try {
    const id = context?.params?.id as string;

    const event = await getEditEvent(id);

    return { props: { event } };
  } catch (error) {
    return {
      props: {
        event: null,
      },
    };
  }
}) satisfies GetServerSideProps<{ event: EventData | null }>;

export default EditEventId;
