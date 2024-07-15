import { RootState } from "@/state/store";
import Link from "next/link";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import EventList from "@/components/EventList";
import Pagination from "@/components/Pagination";
import usePagination from "@/hooks/usePagination";

function Index() {
  const { currentItems, handlePageClick, pageCount } = usePagination(3);

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

      <EventList events={currentItems} withEdit={true} />

      {currentItems && (
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      )}
    </div>
  );
}

export default Index;
