import { useState, useEffect } from "react";
import { getNextEvents, getSnapshot } from "@/lib/firebase/firestore";
import { EventData } from "@/interfaces/interfaces";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

function useInfiniteScroll(initialEvents: EventData[]) {
  const [loadedEvents, setLoadedEvents] = useState<EventData[]>(initialEvents);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] =
    useState<DocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialEvents?.length > 0) {
      getLastDocument(initialEvents[initialEvents.length - 1].id);
    } else {
      setLoading(false);
    }
  }, [initialEvents]);

  async function getLastDocument(id: string) {
    setLoading(true);
    const lastDocument = await getSnapshot(id);
    setLastVisible(lastDocument);
    setLoading(false);
  }

  async function fetchMoreData(limit: number) {
    if (loading || !lastVisible) return;

    const { events: nextEvents, lastDoc } = await getNextEvents(
      lastVisible,
      limit
    );
    if (nextEvents && nextEvents.length > 0) {
      setLoadedEvents((prev) => [...prev, ...nextEvents]);
      setLastVisible(lastDoc);
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }

  return { loadedEvents, hasMore, fetchMoreData, loading };
}

export default useInfiniteScroll;
