import { db } from "@/lib/firebase/clientApp";
import {
  collection,
  onSnapshot,
  query,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  orderBy,
  Timestamp,
  runTransaction,
  where,
  addDoc,
  getFirestore,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { Event } from "@/interfaces/EventInterface";
import { Attendee } from "@/interfaces/UserInterface";
export async function addEvent(data: Object) {
  try {
    const myCollection = collection(db, "events");

    const newDocRef = await addDoc(myCollection, data);
    if (newDocRef.id) {
      return true;
    } else return false;
  } catch (e) {
    console.log(e);
  }
}

export async function getEvents() {
  const querySnapshot = await getDocs(collection(db, "events"));
  const events: any = [];

  querySnapshot.forEach((doc) => {
    events.push({
      id: doc.id,
      ...doc.data(),
      date: doc.data().date?.toDate(),
    });
  });
  return events;
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
    return event.data() as Event;
  } else {
    throw new Error("Event not found");
  }
}
