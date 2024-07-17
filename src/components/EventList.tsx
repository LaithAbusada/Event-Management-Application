import React from "react";
import EventCard from "@/components/EventCard";
import AlertDialog from "@/components/AlertDialog";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import PeopleIcon from "@mui/icons-material/People";
import { EventListProps } from "@/interfaces/propsInterfaces";

function EventList({ events, withEdit }: EventListProps) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/edit-event/${id}`);
  };
  const manageUsers = (id: string) => {
    router.push(`manage-users/${id}`);
  };
  if (!events?.length) return null;
  return (
    <section className="grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-40 m-4">
      {events ? (
        events.map((event) => (
          <div key={event.id}>
            <EventCard event={event} />
            {withEdit && (
              <div className="flex justify-evenly mt-4">
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleClick(event.id)}>
                    <EditIcon className="text-blue-500" fontSize="large" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Manage Users">
                  <IconButton onClick={() => manageUsers(event.id)}>
                    <PeopleIcon className="text-blue-500" fontSize="large" />
                  </IconButton>
                </Tooltip>
                <AlertDialog id={event.id} />
              </div>
            )}
          </div>
        ))
      ) : (
        <div>
          There are no events currently, Stay tuned for future events 🥳
        </div>
      )}
    </section>
  );
}

export default EventList;
