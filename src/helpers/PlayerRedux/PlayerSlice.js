import { createSlice } from '@reduxjs/toolkit';
import Util from '../../utils/Util';

const PlayerSlice = createSlice({
  name: 'player',
  initialState: {
    selectedPlayers: {
      wk: [],
      bat: [],
      bowl: [],
      all: []
    },
    playerCount: 0,
    creditsPoints: 100,
    homeCnt: 0,
    awayCnt: 0
  },
  reducers: {
    selectPlayer: (state, action) => {
      const position = action?.payload?.player_details?.position;
      const totalSelectedPlayers =
        state?.selectedPlayers?.wk?.length + state?.selectedPlayers?.bat?.length + state?.selectedPlayers?.bowl?.length + state?.selectedPlayers?.all?.length;

      const totalCreditsUsed =
        state.selectedPlayers.wk.reduce((sum, player) => sum + parseFloat(player.credit), 0) +
        state.selectedPlayers.bat.reduce((sum, player) => sum + parseFloat(player.credit), 0) +
        state.selectedPlayers.bowl.reduce((sum, player) => sum + parseFloat(player.credit), 0) +
        state.selectedPlayers.all.reduce((sum, player) => sum + parseFloat(player.credit), 0);

      const remainingCredits = 100 - totalCreditsUsed;

      if (totalSelectedPlayers >= 11) {
        Util.errorToast('You have already selected the maximum of 11 players.');
        return;
      }
      if (position === 'wk' && state?.selectedPlayers?.wk?.length >= 1) {
        Util.errorToast('You can only select 1 Wicket Keeper.');
        return;
      } else if (position === 'bat' && state?.selectedPlayers?.bat?.length >= 6) {
        Util.errorToast('You have already selected the maximum of 6 Batsmen.');
        return;
      } else if (position === 'bowl' && state?.selectedPlayers?.bowl?.length >= 4) {
        Util.errorToast('You have already selected the maximum of 4 Bowlers.');
        return;
      } else if (position === 'all' && state?.selectedPlayers?.all?.length >= 4) {
        Util.errorToast('You have already selected the maximum of 4 All-rounders.');
        return;
      } else if (remainingCredits - parseFloat(action.payload.credit) < 0) {
        Util.errorToast('Insufficient credits to select this player.');
        return;
      } else {
        state?.selectedPlayers[position].push(action.payload);
      }
      // state.playerCount = state?.selectedPlayers?.length;
      // setPlayerCount(state);
    },
    deselectPlayer: (state, action) => {
      const { playerId, position } = action.payload.player_details;
      state.selectedPlayers[position] = state.selectedPlayers[position].filter((player) => player.playerId !== playerId);
      // state.playerCount = state?.selectedPlayers?.length;
      // setPlayerCount(state);
    },
    clearData: (state) => {
      state.selectedPlayers = {
        wk: [],
        bat: [],
        bowl: [],
        all: []
      };
      state.playerCount = 0;
      state.creditsPoints = 100;
    },
    editTeams: (state, action) => {
      state.selectedPlayers = action.payload;
      state.playerCount = state.selectedPlayers.wk.length + state.selectedPlayers.bat.length + state.selectedPlayers.bowl.length + state.selectedPlayers.all.length;
      state.creditsPoints =
        100 -
        (state.selectedPlayers.wk.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.selectedPlayers.bat.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.selectedPlayers.bowl.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.selectedPlayers.all.reduce((sum, item) => sum + parseFloat(item.credit), 0));
    },
    setPlayerCount: (state, action) => {
      state.playerCount = state.selectedPlayers.wk.length + state.selectedPlayers.bat.length + state.selectedPlayers.bowl.length + state.selectedPlayers.all.length;
      console.log('Data------------------>>>>>>>>>>>', action.payload);
      let cnt = 0;
      ['bat', 'bowl', 'wk', 'all'].forEach((category) => {
        state.selectedPlayers[category].forEach((player) => {
          if (player.team_details.short_title === action?.payload?.hometeam?.short_title) {
            cnt++;
          }
        });
      });
      state.homeCnt = cnt;

      let cnt1 = 0;
      ['bat', 'bowl', 'wk', 'all'].forEach((category) => {
        state.selectedPlayers[category].forEach((player) => {
          if (player.team_details.short_title === action?.payload?.awayteam?.short_title) {
            cnt1++;
          }
        });
      });
      state.awayCnt = cnt1;
    },
    setCreditsPoints: (state) => {
      state.creditsPoints =
        100 -
        (state.selectedPlayers.wk.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.selectedPlayers.bat.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.selectedPlayers.bowl.reduce((sum, item) => sum + parseFloat(item.credit), 0) +
          state.selectedPlayers.all.reduce((sum, item) => sum + parseFloat(item.credit), 0));
    }
  }
});

export const { selectPlayer, deselectPlayer, clearData, editTeams, setPlayerCount, setCreditsPoints } = PlayerSlice.actions;

const PLAYER_SLICE = PlayerSlice.reducer;

export default PLAYER_SLICE;
