import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Navbar from "@/components/Navbar";
import useDataListener from "@/lib/firebase/dataListener";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import EventList from "@/components/EventList";
import Pagination from "@/components/Pagination";

function Index() {
  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 3;
  const data = useSelector((state: RootState) => state.events.data) || [];

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data?.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  return (
    <div className="smallScreen">
      <EventList events={currentItems} withEdit={false} />

      {currentItems && (
        <Pagination pageCount={pageCount} onPageChange={handlePageClick} />
      )}
    </div>
  );
}

export default Index;
