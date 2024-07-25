import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { InfiniteScrollerProps } from "@/interfaces";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import EventList from "./EventList";
import Loading from "../../public/icons/Loading.svg";

function InfiniteScroller({ events, edit, limit }: InfiniteScrollerProps) {
  const { loadedEvents, hasMore, fetchMoreData, loading } =
    useInfiniteScroll(events);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <h2 className="text-center">Loading initial events...</h2>
          <Loading className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600" />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={loadedEvents.length}
          next={() => fetchMoreData(limit)}
          hasMore={hasMore}
          loader={
            <h4 className="text-center mt-5 mb-5 sm:text-xl">
              Loading more events...
              <Loading className="inline mr-2 w-6 h-6 text-gray-200 animate-spin dark:text-gray-600" />
            </h4>
          }
          endMessage={
            <div className="text-center py-5">
              <p className="text-xl font-bold text-gray-500">
                Yay! You have seen it all! Stay tuned for future events 🔥
              </p>
            </div>
          }
        >
          <EventList events={loadedEvents} withEdit={edit} />
        </InfiniteScroll>
      )}
    </>
  );
}

export default InfiniteScroller;
