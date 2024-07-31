import { useState, useEffect } from "react";
import { getNextEvents, getSnapshot } from "@/lib/firebase/firestore";
import { EventData } from "@/interfaces";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { concat } from "lodash";
import { addEvents, setEvents } from "@/state/events/eventsSlice";
import { RootState } from "@/state/store";

function useInfiniteScroll() {
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] =
    useState<DocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const data = useSelector((state: RootState) => state.events.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data?.length > 0) {
      getLastDocument(data[data.length - 1].id);
      setHasMore(true);
    } else {
      setLoading(false);
    }
  }, []);

  async function getLastDocument(id: string) {
    setLoading(true);
    try {
      const lastDocument = await getSnapshot(id);
      setLastVisible(lastDocument);
      setLoading(false);
    } catch (error) {
      setHasMore(false);
      setLoading(false);
    }
  }

  async function fetchMoreData(limit: number) {
    console.log(loading, lastVisible, hasMore);
    if (loading || !lastVisible) return;

    const { events: nextEvents, lastDoc } = await getNextEvents(
      lastVisible,
      limit
    );
    if (nextEvents && nextEvents.length > 0) {
      dispatch(addEvents(nextEvents));
      setLastVisible(lastDoc);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }

  return { hasMore, fetchMoreData, loading };
}

export default useInfiniteScroll;
