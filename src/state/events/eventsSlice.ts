
import { EventState } from "@/interfaces";

import { createSlice } from "@reduxjs/toolkit";
import { getEvents } from "@/lib/firebase/firestore";

const initialState: EventState = {
  data: [],
};

const eventSlice = createSlice({
  name: "eventsData",
  initialState,
  reducers: {
    setEvents(state, action) {
      state.data = action.payload;
    },

    addEvents(state, action) {
      state.data?.push(...action.payload);
    },
  },
});

export const { setEvents, addEvents } = eventSlice.actions;

export default eventSlice.reducer;
