import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./clientApp";
import { setEvents } from "@/state/events/eventsSlice";

const useDataListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const collectionRef = collection(db, "events");

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Listening all the time");

      dispatch(setEvents(eventsData));
    });

    return () => unsubscribe();
  }, [dispatch]);
};

export default useDataListener;
