import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHeader,
  EuiText,
  EuiTextColor,
} from "@elastic/eui";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hook.ts";
import { changeTheme } from "../app/slices/AuthSlice.ts";
import { firebaseAuth } from "../utils/FirebaseConfig.ts";
import {getCreateMeetingdBreadCrumbs} from "../utils/BreadCrumbs.ts"
import {getOneOnOneMeetingBreadCrumbs} from "../utils/BreadCrumbs.ts"
import {getVideoConferenceBreadCrumbs} from "../utils/BreadCrumbs.ts"
import  { getMyMeetingBreadCrumbs} from "../utils/BreadCrumbs.ts";
import {getMeetingBreadCrumbs} from "../utils/BreadCrumbs.ts"

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = useAppSelector((zoom) => zoom.auth.userInfo?.name);
  const isDarkTheme = useAppSelector((zoomApp) => zoomApp.auth.isDarkTheme);
  const [breadCrumbs, setBreadCrumbs] = useState([
    {
      text: "Dashboard",
    },
  ]);
  const [isResponsive, setIsResponsive] = useState(false);
  const dispatch = useDispatch();
  
  const logout = () => {
    signOut(firebaseAuth);
  };

  useEffect(() => {
    const { pathname } = location;
    // if (pathname === "/") setBreadCrumbs(getDashboardBreadCrumbs(navigate));
     if (pathname === "/create")
      setBreadCrumbs(getCreateMeetingdBreadCrumbs(navigate));
    else if (pathname === "/create1on1")
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate));
    else if (pathname === "/videoconference")
      setBreadCrumbs(getVideoConferenceBreadCrumbs(navigate));
    else if (pathname === "/mymeetings")
      setBreadCrumbs( getMyMeetingBreadCrumbs(navigate));
    else if (pathname === "/meetings") {
      setBreadCrumbs(getMeetingBreadCrumbs(navigate));
    }
  }, [location, navigate]);

  const invertTheme = () => {
    const theme = localStorage.getItem("zoom-theme");
    localStorage.setItem("zoom-theme", theme === "light" ? "dark" : "light");
    dispatch(changeTheme({ isDarkTheme: !isDarkTheme }));
  };

  const section=[{
    items: [
      <Link to="/">
        <EuiText>
          <h2 style={{ padding: "0 1vw" }}>
            <EuiTextColor color="#0b5cff">Face-Time</EuiTextColor>
          </h2>
        </EuiText>
      </Link>,
    ],
  },

  {
    items: [
      <>
        {userName ? (
          <EuiText>
            <h3>
              <EuiTextColor color="white">Hello, </EuiTextColor>
              <EuiTextColor color="#0b5cff">{userName}</EuiTextColor>
            </h3>
          </EuiText>
        ) : null}
      </>,
    ],
  },

  {
    items: [
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
        direction="row"
        style={{ gap: "2vw" }}
      >
        <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>

          {isDarkTheme ?(

          
        
            <EuiButtonIcon
              onClick={invertTheme}
              iconType="sun"
              display="fill"
              size="s"
              color="warning"
              aria-label="logout-button"
            />
          ):(
          
            <EuiButtonIcon
              onClick={invertTheme}
              iconType="moon"
              display="fill"
              size="s"
              color="danger"
              aria-label="logout-button"
            />
          )}
        </EuiFlexItem>
        <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
          <EuiButtonIcon
            onClick={logout}
            iconType="lock"
            display="fill"
            size="s"
            aria-label="logout-button"
          />
        </EuiFlexItem>
      </EuiFlexGroup>,
    ],


  }];

  const responsiveSection=[
    {
      items: [
        <Link to="/">
          <EuiText>
            <h2 style={{ padding: "0 1vw" }}>
              <EuiTextColor color="#0b5cff">Zoom</EuiTextColor>
            </h2>
          </EuiText>
        </Link>,
      ],
    },
    
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: "2vw" }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            {isDarkTheme ? (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="sun"
                display="fill"
                size="s"
                color="warning"
                aria-label="theme-button-light"
              />
            ) : (
              <EuiButtonIcon
                onClick={invertTheme}
                iconType="moon"
                display="fill"
                size="s"
                color="ghost"
                aria-label="theme-button-dark"
              />
            )}
          </EuiFlexItem>
          <EuiFlexItem grow={false} style={{ flexBasis: "fit-content" }}>
            <EuiButtonIcon
              onClick={logout}
              iconType="lock"
              display="fill"
              size="s"
              aria-label="logout-button"
            />
          </EuiFlexItem>
        </EuiFlexGroup>,
      ],
    },
  ];


  useEffect(() => {
    if (window.innerWidth < 480) {
      // sectionSpliced.splice(1, 1);
      // setSection(sectionSpliced);
      setIsResponsive(true);
    }
  }, []);


  return(
    <>
      <EuiHeader
        style={{ minHeight: "8vh" }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader
        style={{ minHeight: "8vh" }}
        sections={[
          {
            breadcrumbs: breadCrumbs,
          },
        ]}
      />
    </>
  )
      }