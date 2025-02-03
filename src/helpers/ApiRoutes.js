//export const BASEURL = 'http://192.168.1.103/sportsapp/'; // Local
export const BASEURL = 'http://192.168.1.103/fantsayapp/'; //Local
// export const BASEURL = 'http://3.6.88.216/webapi/'; //Staging

export const LOGIN_API = BASEURL + 'api/user/login';
export const REGISTER_API = BASEURL + 'api/user/register';
export const OTP_API = BASEURL + 'api/user/verify-otp';
export const OTP_RESEND_MOBILE_API = BASEURL + 'api/user/resend-otp/mobile';

export const ABOUT_US_API = BASEURL + 'api/user/page/about-us';
export const PRIVACY_POLICY_API = BASEURL + 'api/user/page/privacy-policy';
export const TERMS_CONDITIOS_API = BASEURL + 'api/user/page/terms-condition';
export const GET_RULES_API = BASEURL + 'api/user/get-rules';
export const SUPPORT_API = BASEURL + 'api/user/support';

export const GET_SPORTS_API = BASEURL + 'api/user/get-sports';
export const GET_UPCOMING_MATCHES_API = BASEURL + 'api/user/upcoming-matches/';
export const MATCH_SQUADS_API = BASEURL + 'api/user/match-squads/';

export const GET_MATCH_CONTESTS_API = BASEURL + 'api/user/get-match-contests';
export const GET_TEAMS_DETAILS_API = BASEURL + 'api/user/get-team-details';
export const ADD_TEAMS_API = BASEURL + 'api/user/add-team';
export const EDIT_TEAMS_API = BASEURL + 'api/user/edit-team';
export const GET_TEAM_API = BASEURL + 'api/user/get-team-list';
export const UPDATE_TEAM_API = BASEURL + 'api/user/update-team';
export const JOIN_CONTEST_API = BASEURL + 'api/user/join-contest';
export const MY_UPCOMING_MATCHES_API = BASEURL + 'api/user/my-upcoming-matches/';
export const MY_LIVE_MATCHES_API = BASEURL + 'api/user/my-live-matches/';
export const MY_COMPLETED_MATCHES_API = BASEURL + 'api/user/my-completed-matches/';
export const MY_CONTESTS_API = BASEURL + 'api/user/my-contests';
export const LEADERBOARD_API = BASEURL + 'api/user/leaderboard/';
export const LIVE_LEADERBOARD_API = BASEURL + 'api/user/live-leaderboard/';
export const GET_PROFILE_API = BASEURL + 'api/user/get-profile';
export const SWITCH_TEAM_API = BASEURL + 'api/user/switch-team';
export const GET_BONUS_API = BASEURL + 'api/user/bonus-history';
export const GET_WINNING_API = BASEURL + 'api/user/winning-history';
export const GET_CONTEST_HISTORY = BASEURL + 'api/user/contest-history';
export const GET_SCOREBOARD = BASEURL + 'api/user/get-match-scoreboard';
export const AMOUNT_DEPOSIT = BASEURL + 'api/user/deposite-amount';
export const CLAIM_AMOUNT = BASEURL + 'api/user/claim-amount';

// StorageValue Key
export const USERDETAILS = 'USERDETAILS';
export const AUTHTOKEN = 'AUTHTOKEN';
export const MATCHTYPE = 'MATCHTYPE';
