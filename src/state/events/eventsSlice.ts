import { EventState } from "@/interfaces/EventInterface";
import { createSlice } from "@reduxjs/toolkit";
import { getEvents } from "@/lib/firebase/firestore";

const initialState: EventState = {
  data: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setEvents } = eventSlice.actions;

export default eventSlice.reducer;
