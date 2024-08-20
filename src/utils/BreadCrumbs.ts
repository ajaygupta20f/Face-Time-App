import { NavigateFunction } from "react-router-dom";
import { BreadCrumbsType } from "./types";

export const getCreateMeetingdBreadCrumbs = (navigate: NavigateFunction )
: Array<BreadCrumbsType>=>[
    {
    text:"Dashboard",
    href:"#",
    onClick:()=>{
        navigate("/");
    },
},
{
    text:"Create Meeting",
},
]

export const getOneOnOneMeetingBreadCrumbs = (
    navigate: NavigateFunction
  ): Array<BreadCrumbsType> => [
    {
      text: "Dashboard",
      href: "#",
      onClick: () => {
        navigate("/");
      },
    },
    {
      text: "Create Meeting",
      href: "#",
      onClick: () => {
        navigate("/create");
      },
    },
    {
      text: "Create One on One Meeting",
    },
  ];
  

  export const getVideoConferenceBreadCrumbs = (
    navigate: NavigateFunction
  ): Array<BreadCrumbsType> => [
    {
      text: "Dashboard",
      href: "#",
      onClick: () => {
        navigate("/");
      },
    },
    {
      text: "Create Meeting",
      href: "#",
      onClick: () => {
        navigate("/create");
      },
    },
    {
      text: "Create Video Conference",
    },
  ];

  export const getMyMeetingBreadCrumbs = (
    navigate: NavigateFunction
  ): Array<BreadCrumbsType> => [
    {
      text: "Dashboard",
      href: "#",
      onClick: () => {
        navigate("/");
      },
    },

    {
      text: "My Meetings",
    },
  ];

  export const getMeetingBreadCrumbs = (
    navigate: NavigateFunction
  ): Array<BreadCrumbsType> => [
    {
      text: "Dashboard",
      href: "#",
      onClick: () => {
        navigate("/");
      },
    },

    {
      text: "Meetings",
    },
  ];