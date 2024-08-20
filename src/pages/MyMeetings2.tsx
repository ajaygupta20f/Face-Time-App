import React from 'react'
import  { useEffect, useState, useCallback } from "react";
// import { where } from 'firebase/firestore';
  import { getDocs, query, where } from "firebase/firestore";
import { useAppSelector } from "../app/hook.ts";
import { meetingsRef } from "../utils/FirebaseConfig.ts";
  import { MeetingType } from "../utils/types.ts";
  import useAuth from "../hooks/useAuth.tsx";
 export default  function MyMeetings() {

    useAuth();
    const userInfo = useAppSelector((zoom) => zoom.auth.userInfo);
   
       const [meetings, setMeetings] = useState<Array<MeetingType>>([]);
       useEffect(()=>{
        console.log("in effect", userInfo);
        if(userInfo){
            console.log("ui",userInfo)
            console.log("mr",meetingsRef)
            
            const getMyMeeting=async()=>{
                        const firestoreQuery=query(
                            meetingsRef,
                          where("createBy", "==", userInfo?.uid)
                      );
 const fetchedMeetings =  await getDocs(firestoreQuery);
 console.log(fetchedMeetings)
if (fetchedMeetings.docs.length) {
  const myMeetings: Array<MeetingType> = [];
  fetchedMeetings.forEach((meeting) => {
    console.log(meeting);
    myMeetings.push({
      docId: meeting.id,
      ...(meeting.data() as MeetingType),
    });
  });
     console.log(myMeetings)              
  setMeetings(myMeetings)      
        }
    };
    console.log({meetings})
    getMyMeeting()
}
       },[userInfo]);
  return 
    <div>
      ytbddgbds
    </div>
  
}


