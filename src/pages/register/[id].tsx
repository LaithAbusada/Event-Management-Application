import { RootState } from "@/state/store";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Event } from "@/interfaces/EventInterface";
import EventCard from "@/components/EventCard";
import RegisterForm from "@/components/RegisterForm";

function Register() {
  const [event, setEvent] = useState<Event | null>(null);
  const data = useSelector((state: RootState) => state.events.data);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (data && id) {
      const event = data.find((element) => element.id === id);
      if (event) {
        setEvent(event);
      }
    }
  }, [data, id]);

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

export default Register;
