import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "player",
  initialState: { seasons: [], contentDetail: null },
  reducers: {
    getSeasons(state, action) {
      state.seasons = action.payload;
    },
    getEpisodes(state, action) {
      state[`S${action.payload.seasonNum}E`] = action.payload.episodes;
    },
    getContentDetail(state, action) {
      state.contentDetail = action.payload;
    },
  },
});

export const { getSeasons, getEpisodes, getContentDetail } =
  playerSlice.actions;
export default playerSlice.reducer;
