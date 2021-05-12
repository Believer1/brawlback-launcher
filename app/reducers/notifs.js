import {
  APP_UPGRADE_DOWNLOADING, APP_UPGRADE_DOWNLOADED, SET_ACTIVE_NOTIF, DISMISS_GLOBAL_NOTIF, BOOT_ERROR_ENCOUNTERED,
} from '../actions/notifs';

// Default state for this reducer
const defaultState = {
  visibility: {},
  dismissed: {},
  meta: {},
  activeNotif: null,
};

export default function fileLoader(state = defaultState, action) {
  switch (action.type) {
  case APP_UPGRADE_DOWNLOADING:
    return displayAppDownloadNotif(state, action);
  case APP_UPGRADE_DOWNLOADED:
    return displayAppUpgradeNotif(state, action);
  case SET_ACTIVE_NOTIF:
    return setActiveNotif(state, action);
  case DISMISS_GLOBAL_NOTIF:
    return dismissNotif(state, action);
  case BOOT_ERROR_ENCOUNTERED:
    return displayBootErrorDialog(state, action);
  default:
    return state;
  }
}

function displayAppDownloadNotif(state, action) {
  const newState = { ...state };

  newState.visibility.appUpgradeDownloading = true;
  newState.meta.appUpgrade = action.payload.upgradeDetails;
  newState.meta.appUpdateDownloaded = action.payload.downloaded;
  return newState;
}

function displayAppUpgradeNotif(state, action) {
  const newState = { ...state };

  newState.visibility.appUpgradeDownloading = false;
  newState.visibility.appUpgrade = true;
  newState.meta.appUpgrade = action.payload.upgradeDetails;
  newState.meta.appUpdateDownloaded = action.payload.downloaded;
  return newState;
}

function setActiveNotif(state, action) {
  const newState = { ...state };

  newState.activeNotif = action.payload.notif;
  return newState;
}

function dismissNotif(state, action) {
  const newState = { ...state };

  const key = action.payload.key;
  newState.dismissed[key] = true;
  return newState;
}

function displayBootErrorDialog(state, action) {
  const newState = { ...state };

  newState.visibility.bootError = true;
  newState.meta.bootError = action.payload.error;
  return newState;
}