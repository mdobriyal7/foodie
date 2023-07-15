import { createSlice } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  currentColor: "#03C9D7",
  currentMode: "Light",
  activeMenu: true,
  screenSize: 0,
  isClicked: {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
  },
  themeSettings: false,
};

 export const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    setScreenSize: (state, action) => {
      state.screenSize = action.payload;
    },
    setIsClicked: (state, action) => {
      const { payload } = action;
      // console.log(payload);
      state.isClicked = { ...initialState.isClicked, [payload]: true };
      // console.log(initialState)
    },
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setCurrentColor: (state, action) => {
      state.currentColor = action.payload;
    },
    setCurrentMode: (state, action) => {
      state.currentMode = action.payload;
    },
    setThemeSettings: (state, action) => {
      state.themeSettings = action.payload;
    },
    resetState: (state) => {
      state.isClicked = initialState.isClicked;
    },
  },
});

export const {
  setScreenSize,
  setIsClicked,
  setActiveMenu,
  setCurrentColor,
  setCurrentMode,
  setThemeSettings,
  resetState
} = stateSlice.actions;

export const useScreenState = () => {
  const dispatch = useDispatch();
  const {
    currentColor,
    currentMode,
    activeMenu,
    screenSize,
    isClicked,
    themeSettings,
  } = useSelector((state) =>state.state );
  const setScreenSizeHandler = (value) =>
    dispatch(setScreenSize(value));
  const setIsClickedHandler = (value) => dispatch(setIsClicked(value));
  const setActiveMenuHandler = (value) =>
    dispatch(setActiveMenu(value));
  const setCurrentColorHandler = (value) =>
    dispatch(setCurrentColor(value));
  const setCurrentModeHandler = (value) =>
    dispatch(setCurrentMode(value));
  const setThemeSettingsHandler = (value) =>
    dispatch(setThemeSettings(value));
  const setResetState=(value)=>dispatch(resetState(value))

  return {
    initialState,
    currentColor,
    currentMode,
    activeMenu,
    screenSize,
    setScreenSize: setScreenSizeHandler,
    handleClick: setIsClickedHandler,
    isClicked,
    setActiveMenu: setActiveMenuHandler,
    setCurrentColor: setCurrentColorHandler,
    setCurrentMode: setCurrentModeHandler,
    setMode: setCurrentModeHandler,
    setColor: setCurrentColorHandler,
    themeSettings,
    setThemeSettings: setThemeSettingsHandler,
    resetState:setResetState
  };
};

export const stateReducer = stateSlice.reducer;

export default stateReducer;
