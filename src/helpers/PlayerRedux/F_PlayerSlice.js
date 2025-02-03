import { createSlice } from '@reduxjs/toolkit';
import Util from '../../utils/Util';

const F_playerSlice = createSlice({
  name: 'player',
  initialState: {
    f_selectedPlayers: {
      G: [],
      F: [],
      D: [],
      M: []
    },
    f_playerCount: 0,
    f_creditsPoints: 100,
    f_homeCnt: 0,
    f_awayCnt: 0
  },
  reducers: {
    f_selectPlayer: (state, action) => {
      const position = action?.payload?.player_details?.position;
      console.log('position:::::::---------------------->>>>>>>>>>>>>', position);
      const totalSelectedPlayers =
        state?.f_selectedPlayers?.G?.length + state?.f_selectedPlayers?.F?.length + state?.f_selectedPlayers?.D?.length + state?.f_selectedPlayers?.M?.length;

      const totalCreditsUsed =
        state.f_selectedPlayers.G.reduce((sum, player) => sum + parseFloat(player.credit), 0) +
        state.f_selectedPlayers.F.reduce((sum, player) => sum + parseFloat(player.credit), 0) +
        state.f_selectedPlayers.D.reduce((sum, player) => sum + parseFloat(player.credit), 0) +
        state.f_selectedPlayers.M.reduce((sum, player) => sum + parseFloat(player.credit), 0);

      const remainingCredits = 100 - totalCreditsUsed;

      if (totalSelectedPlayers >= 11) {
        Util.errorToast('You have already selected the maximum of 11 players.');
        return;
      }
      if (position === 'G' && state?.f_selectedPlayers?.G?.length >= 1) {
        Util.errorToast('You can only select 1 GoalKeeper.');
        return;
      } else if (position === 'F' && state?.f_selectedPlayers?.F?.length >= 4) {
        Util.errorToast('You have already selected the maximum of 4 Strikers.');
        return;
      } else if (position === 'D' && state?.f_selectedPlayers?.D?.length >= 5) {
        Util.errorToast('You have already selected the maximum of 5 Defenders.');
        return;
      } else if (position === 'M' && state?.f_selectedPlayers?.M?.length >= 5) {
        Util.errorToast('You have already selected the maximum of 5 Midfielders.');
        return;
      } else if (remainingCredits - parseFloat(action.payload.credit) < 0) {
        Util.errorToast('Insufficient credits to select this player.');
        return;
      } else {
        state?.f_selectedPlayers[position].push(action.payload);
      }
      // state.playerCount = state?.selectedPlayers?.length;
      // setPlayerCount(state);
    },
    f_deselectPlayer: (state, action) => {
      const { playerId, position } = action.payload.player_details;
      state.f_selectedPlayers[position] = state.f_selectedPlayers[position].filter((player) => player.playerId !== playerId);
      // state.playerCount = state?.selectedPlayers?.length;
      // setPlayerCount(state);
    },
    f_clearData: (state) => {
      state.f_selectedPlayers = {
        G: [],
        F: [],
        D: [],
        M: []
      };
      state.f_playerCount = 0;
      state.f_creditsPoints = 100;
    },
    f_editTeams: (state, action) => {
      state.f_selectedPlayers = action.payload;
      state.f_playerCount = state.f_selectedPlayers.G.length + state.f_selectedPlayers.F.length + state.f_selectedPlayers.D.length + state.f_selectedPlayers.M.length;
      state.f_creditsPoints =
        100 -
        (state.f_selectedPlayers.G.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.f_selectedPlayers.F.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.f_selectedPlayers.D.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.f_selectedPlayers.M.reduce((sum, item) => sum + parseFloat(item.credit), 0));
    },
    f_setPlayerCount: (state, action) => {
      state.f_playerCount = state.f_selectedPlayers.G.length + state.f_selectedPlayers.F.length + state.f_selectedPlayers.D.length + state.f_selectedPlayers.M.length;
      console.log('Data------------------>>>>>>>>>>>', action);
      let cnt = 0;
      ['G', 'F', 'D', 'M'].forEach((category) => {
        state.f_selectedPlayers[category].forEach((player) => {
          if (player.team_details.short_title === action?.payload?.hometeam?.short_title) {
            cnt++;
          }
        });
      });
      state.f_homeCnt = cnt;

      let cnt1 = 0;
      ['G', 'F', 'D', 'M'].forEach((category) => {
        state.f_selectedPlayers[category].forEach((player) => {
          if (player.team_details.short_title === action?.payload?.awayteam?.short_title) {
            cnt1++;
          }
        });
      });
      state.f_awayCnt = cnt1;
    },
    f_setCreditsPoints: (state) => {
      state.f_creditsPoints =
        100 -
        (state.f_selectedPlayers.G.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.f_selectedPlayers.F.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.f_selectedPlayers.D.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.f_selectedPlayers.M.reduce((sum, item) => sum + parseFloat(item.credit), 0));
    }
  }
});

export const { f_selectPlayer, f_deselectPlayer, f_clearData, f_editTeams, f_setPlayerCount, f_setCreditsPoints } = F_playerSlice.actions;

const F_PLAYER_SLICE = F_playerSlice.reducer;

export default F_PLAYER_SLICE;
