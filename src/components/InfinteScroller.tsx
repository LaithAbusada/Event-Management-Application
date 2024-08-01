import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { EventData, InfiniteScrollerProps } from "@/interfaces";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EventList from "./EventList";
import Loading from "../../public/icons/Loading.svg";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

function InfiniteScroller({ edit, limit }: InfiniteScrollerProps) {
  const { hasMore, fetchMoreData, loading } = useInfiniteScroll();
  const events = useSelector((state: RootState) => state.events.data);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen text-white">
          <h2 className="text-center">Loading initial events...</h2>
          <Loading className="inline mr-2 w-4 h-4 text-gray-200 animate-spin" />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={events ? events.length : 0}
          next={() => fetchMoreData(limit)}
          hasMore={hasMore}
          loader={
            <h4 className="text-center text-white mt-5 mb-5 sm:text-xl">
              Loading more events...
              <Loading className="inline mr-2 w-6 h-6 text-gray-200 animate-spin" />
            </h4>
          }
          endMessage={
            <div className="text-center py-5">
              <p className="text-xl font-bold text-gray-400">
                Yay! You have seen it all! Stay tuned for future events 🔥
              </p>
            </div>
          }
        >
          <EventList withEdit={edit} />
        </InfiniteScroll>
      )}
    </>
  );
}

export default InfiniteScroller;
