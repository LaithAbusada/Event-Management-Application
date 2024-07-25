import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Timestamp } from "firebase/firestore";
import { format } from "path";
import AlertDialog from "./AlertDialog";
import Link from "next/link";
import { useRouter } from "next/router";
import LocationOn from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { formatDate, getTime } from "@/utils/formatDate";
import { EventProps } from "@/interfaces";
import Image from "next/image";

function EventCard(props: EventProps) {
  const router = useRouter();
  const { event } = props;
  console.log("Testing + ", event);
  console.log(event?.image);
  function handleClick() {
    router.push(`/register/${event?.id}`);
  }
  return (
    <article className="mx-auto max-w-sm shadow-xl bg-cover bg-center min-h-[500px] transform duration-500 hover:-translate-y-2 group md:min-w-[500px]">
      <Image src={event.image} alt={event.name} layout="fill" />
      <div className="bg-black  bg-opacity-20 min-h- px-10 flex flex-wrap flex-col pt-60 hover:bg-opacity-75 transform duration-300">
        <h2 className="text-white text-3xl mb-5 transform translate-y-10 group-hover:-translate-y-40 duration-300">
          {event.name}
        </h2>
        <div className="w-16 h-2 bg-yellow-500 rounded-full mb-5 transform translate-y-10 group-hover:-translate-y-40 duration-300"></div>

        <div className="mb-5 h-30 min-h-full overflow-hidden opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500 group-hover:-translate-y-40 ">
          <p>{event.description}</p>
        </div>
        <p className=" mb-2 opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500 group-hover:-translate-y-40 h-8 overflow-hidden">
          <LocationOnIcon /> Location: {event.location}
        </p>
        <p className="mb-2 opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500 group-hover:-translate-y-40 h-8 overflow-hidden">
          <CalendarMonthIcon /> Date: {event.date}
        </p>
        <p className="opacity-0 text-white text-xl group-hover:opacity-80 transform duration-500 group-hover:-translate-y-40 h-8 overflow-hidden">
          <AccessTimeIcon /> Time: {event.time}
        </p>
        <button
          className="m-10 opacity-0 text-black bg-yellow-500 px-4 py-2 mt-4 rounded group-hover:opacity-100 transform duration-500"
          onClick={handleClick}
        >
          Register Now
        </button>
      </div>
    </article>
  );
}

export default EventCard;
