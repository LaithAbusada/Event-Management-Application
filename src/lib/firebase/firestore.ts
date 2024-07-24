import { Attendee, Event, EventData, editEvent } from "@/interfaces/interfaces";
import { db } from "@/lib/firebase/clientApp";
import { formatDate, getTime } from "@/utils/formatDate";
import {
  collection,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  limit,
  addDoc,
  deleteDoc,
  setDoc,
  startAfter,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";
import log from "loglevel";
export async function addEvent(data: Partial<Event>) {
  try {
    const myCollection = collection(db, "events");

    const newDocRef = await addDoc(myCollection, data);
    if (newDocRef.id) {
      return true;
    } else return false;
  } catch (e) {
    log.error(e);
  }
}

export async function getEvents(limitData: number) {
  const eventsRef = collection(db, "events");

  const q = query(eventsRef, orderBy("date", "desc"), limit(limitData));

  const queryData = await getDocs(q);

  const events = queryData.docs.map((doc) => {
    const data = doc.data();
    const formattedDate = formatDate(data.date);
    const time = getTime(data.date);
    return {
      ...data,
      date: formattedDate,
      time: time,
      id: doc.id,
    };
  });

  return events as EventData[];
}

export async function deleteById(id: string) {
  await deleteDoc(doc(db, "events", id));
}

export async function updateEvent(values: Partial<Event>) {
  if (values.id) {
    const eventRef = doc(db, "events", values.id);
    await updateDoc(eventRef, { ...values });
  }
}

export async function addAttendee(attendee: Attendee) {
  const path = `events/${attendee.eventID}/attendees`;
  const attendeeRef = doc(db, path, attendee.email);
  await setDoc(attendeeRef, { ...attendee });
}

export async function getAttendees(eventID: string) {
  const path = `events/${eventID}/attendees`;
  const attendeesRef = collection(db, path);
  const attendees = await getDocs(attendeesRef);
  return attendees.docs.map((doc) => doc.data() as Attendee);
}

export async function getEventById(eventID: string) {
  const eventRef = doc(db, "events", eventID);
  const event = await getDoc(eventRef);
  if (event.exists()) {
    const data = event.data();
    const formattedDate = formatDate(data.date);
    const time = getTime(data.date);

    return {
      ...data,
      date: formattedDate,
      time: time,
    } as EventData;
  } else {
    throw new Error("Event not found");
  }
}

export async function getEditEvent(eventID: string) {
  // this function is needed because the Date object and the firebase Timestamp object is not serializable in getServerSideProps,
  // but when we edit an event, we need the firebase timestamp object and a current date object to compare to, this returns the date
  // as a string, and then in EventForm we convert it back to a date to compare it to the user selected date.

  const eventRef = doc(db, "events", eventID);
  const event = await getDoc(eventRef);
  if (event.exists()) {
    const data = event.data();
    const formattedDate = formatDate(data.date);
    const time = getTime(data.date);

    return {
      ...data,
      date: data.date.toDate().toString(),
    } as EventData;
  } else {
    throw new Error("Event not found");
  }
}

export async function getNextEvents(
  lastVisible: DocumentSnapshot<DocumentData, DocumentData>,
  limits: number
) {
  // gets the next batch of events, after the currently last visible document
  try {
    const eventsRef = collection(db, "events");
    const q = query(
      eventsRef,
      orderBy("date", "desc"),
      startAfter(lastVisible),
      limit(limits)
    );

    const queryData = await getDocs(q);
    let events = queryData.docs.map((doc) => {
      const data = doc.data();
      const formattedDate = formatDate(data.date);
      const time = getTime(data.date);
      return {
        name: data.name,
        location: data.location,
        date: formattedDate,
        time: time,
        id: doc.id,
        image: data.image,
        description: data.description,
      };
    });
    const lastDoc = queryData.docs[queryData.docs.length - 1];
    return {
      events,
      lastDoc,
    };
  } catch (error) {
    console.error("Error fetching events: ", error);
    return {
      events: [],
      lastDoc: null,
    };
  }
}

export async function getSnapshot(id: string) {
  // This function will run after the initial events are received, to set the last visible document, so that
  // when getNextEvents is called, it can get the events after the lastVisible Event
  try {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
}
