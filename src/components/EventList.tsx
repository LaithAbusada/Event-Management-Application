import React from "react";
import EventCard from "@/components/EventCard";
import AlertDialog from "@/components/AlertDialog";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import PeopleIcon from "@mui/icons-material/People";
import { EventListProps } from "@/interfaces";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

function EventList({ withEdit }: EventListProps) {
  const router = useRouter();
  const events = useSelector((state: RootState) => state.events.data);
  const handleClick = (id: string) => {
    router.push(`/edit-event/${id}`);
  };
  const manageUsers = (id: string) => {
    router.push(`manage-users/${id}`);
  };
  if (!events?.length) return null;
  return (
    <section className="grid lg:grid-cols-2 min-[1460px]:grid-cols-3 min-[2000]:grid-cols-4 grid-cols-1 gap-16 m-4">
      {events.map((event) => (
        <div key={event.id} className="flex flex-col items-center">
          <EventCard event={event} />
          {withEdit && (
            <div className="flex justify-evenly mt-4 w-full">
              <Tooltip title="Edit">
                <IconButton onClick={() => handleClick(event.id)}>
                  <EditIcon
                    className="text-white hover:text-blue-500"
                    fontSize="large"
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Manage Users">
                <IconButton onClick={() => manageUsers(event.id)}>
                  <PeopleIcon
                    className="text-white hover:text-blue-500"
                    fontSize="large"
                  />
                </IconButton>
              </Tooltip>
              <AlertDialog id={event.id} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

export default EventList;
