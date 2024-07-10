import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import EditEvent from "@/components/EditEvent";
import { RootState } from "@/state/store";
import { Event } from "@/interfaces/EventInterface";

function EditEventId() {
  const data = useSelector((state: RootState) => state.events.data);
  const router = useRouter();
  const { id } = router.query;

  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (data && id) {
      const event = data.find((element) => element.id === id);
      if (event) {
        setEvent(event);
      }
    }
  }, [data, id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return <EditEvent event={event} />;
}

export default EditEventId;
