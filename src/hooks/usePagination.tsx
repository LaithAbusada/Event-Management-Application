import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";

const usePagination = (itemsPerPage: number) => {
  const [itemOffset, setItemOffset] = useState(0);

  const data = useSelector((state: RootState) => state.events.data) || [];

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return { currentItems, pageCount, handlePageClick };
};

export default usePagination;
