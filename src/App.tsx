import React from 'react'
import {EuiProvider,EuiThemeProvider, EuiGlobalToastList} from "@elastic/eui"
import "@elastic/eui/dist/eui_theme_light.css"
import "@elastic/eui/dist/eui_theme_dark.css"
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Dashboard from './pages/Dashboard.tsx'
import { useEffect,useState } from 'react'
import { useAppDispatch,useAppSelector } from './app/hook.ts'
import ThemeSelector from './components/ThemeSelector.tsx'
import CreateMeeting from "./pages/CreateMeeting.tsx"
import OneOnOneMeeting from './pages/OneOnOneMeeting.tsx'
import { setToasts } from "./app/slices/MeetingSlice.tsx";
import VideoConference from './pages/VideoConference.tsx'
import MyMeetings from './pages/MyMeetings.tsx'
import Meeting from './pages/Meeting.tsx'
import JoinMeeting from './pages/JoinMeeting.tsx'

function App() {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [theme,setTheme]=useState<EuiThemeColorMode>("light");
  const [isInitialEffect, setIsInitialEffect] = useState(true);
  const toasts = useAppSelector((zoom) => zoom.meetings.toasts);
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    } else {
      localStorage.setItem("zoom-theme", "light");
    }
  }, []);

  useEffect(() => {
    if (isInitialEffect) setIsInitialEffect(false);
    else {
      window.location.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDarkTheme]);
  const overrides = {
    colors: {
      LIGHT: { primary: "#0b5cff" },
      DARK: { primary: "#0b5cff" },
    },
  };

  const removeToast = (removedToast: { id: string }) => {
    dispatch(
      setToasts(
        toasts.filter((toast: { id: string }) => toast.id !== removedToast.id)
      )
    );
  };

  return (
    <ThemeSelector>
   <EuiProvider colorMode={theme}>
    <EuiThemeProvider>
   <Routes>
    <Route path="login" element={<Login />}/>
    <Route path="/create" element={<CreateMeeting />} />
    <Route path="/create1on1" element={<OneOnOneMeeting/>}/>
    <Route path="/videoconference" element={<VideoConference />} />
    <Route path="/mymeetings" element={<MyMeetings/>}/>
    <Route path="/meetings" element={<Meeting/>}/>
    <Route path="/join/:id" element={<JoinMeeting/>}/>
    <Route path="/" element={<Dashboard/>}/>
    <Route path="*" element={<Dashboard/>}/>

   </Routes>
   <EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={5000}
          />
        </EuiThemeProvider>
   
   </EuiProvider>
   </ThemeSelector>
  )
}

export default App
