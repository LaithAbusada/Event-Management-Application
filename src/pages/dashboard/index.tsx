import EventCard from "@/components/EventCard";
import { getEvents } from "@/lib/firebase/firestore";
import { RootState } from "@/state/store";
import Link from "next/link";
import router from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Event } from "@/interfaces/EventInterface";
import { IconButton, Tooltip } from "@mui/material";
import AlertDialog from "@/components/AlertDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Index() {
  const data = useSelector((state: RootState) => state.events.data);

  const handleClick = (id: string) => {
    router.push(`/edit-event/${id}`);
  };

  return (
    <>
      <Link href="/add-event">
        <button
          type="button"
          className="ml-20 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add Event
        </button>
      </Link>
      <section className="grid lg:grid-cols-2 2xl:grid-cols-3 grid-cols-1 gap-40 m-4">
        {data?.map((item) => (
          <div key={item.id}>
            <EventCard event={item} />
            <div className="flex justify-evenly mt-4">
              <Tooltip title="Edit">
                <IconButton onClick={() => handleClick(item.id)}>
                  <EditIcon className="text-blue-500" fontSize="large" />
                </IconButton>
              </Tooltip>
              <AlertDialog id={item.id} />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default Index;
