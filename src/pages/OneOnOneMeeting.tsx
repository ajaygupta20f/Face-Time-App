import React from 'react'
import { EuiFlexGroup,EuiForm, EuiSpacer } from '@elastic/eui'
import Header from '../components/Header.tsx'
import { useState } from 'react'
import { addDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

import MeetingNameField from '../components/FormComponents/MeetingNameField.tsx'
import MeetingUserField from '../components/FormComponents/MeetingUsersField.tsx'
import useAuth from "../hooks/useAuth.tsx";
import useFetchUsers from '../hooks/useFetchUsers.tsx'
import moment from "moment";
import MeetingDateField from '../components/FormComponents/MeetingDateField.tsx'
import CreateMeetingButtons from '../components/FormComponents/CreateMeetingButtons.tsx'
import { meetingsRef } from '../utils/FirebaseConfig.ts'
import { useAppSelector } from '../app/hook.ts'
import { UserType } from '../utils/types.ts'
import { generateMeetingID } from '../utils/generateMeetingId.ts';
import useToast from '../hooks/useToast.tsx';

function OneOnOneMeeting() {

  useAuth();
  const [users]=useFetchUsers();
  const navigate=useNavigate();
  const [createToast]=useToast()

    const [meetingName,setMeetingName]=useState("")
    const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
    const [startDate,setStartDate]=useState(moment());
    const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);

    const [showErrors, setShowErrors] = useState<{
      meetingName: FieldErrorType;
      meetingUser: FieldErrorType;
    }>({
      meetingName: {
        show: false,
        message: [],
      },
      meetingUser: {
        show: false,
        message: [],
      },
    });
  

    const onUserChange=(selectedOptions:any)=>{
      setSelectedUsers(selectedOptions)
    };

    const validateForm = () => {
      // const showErrorsClone = { ...showErrors };
      let errors = false;
      const clonedShowErrors={...showErrors };
      if (!meetingName.length) {
        clonedShowErrors.meetingName.show = true;
        clonedShowErrors.meetingName.message = ["Please Enter Meeting Name"];
        errors = true;
      } else {
        clonedShowErrors.meetingName.show = false;
        clonedShowErrors.meetingName.message = [];
      }
      if(!selectedUsers.length){

        clonedShowErrors.meetingUser.show = true;
        clonedShowErrors.meetingUser.message = ["Please select a User"];
      
      }else{
        clonedShowErrors.meetingUser.show = false;
        clonedShowErrors.meetingUser.message = [];
      }
      setShowErrors(clonedShowErrors);
      return errors;
    }

    const createMeeting=async()=>{
   if(!validateForm()){

     const meetingId=generateMeetingID();
     await addDoc(meetingsRef,{
      createBy:uid,
      meetingId,
      meetingName,
      meetingType:"1-on-1",
      invitedUsers:[selectedUsers[0].uid],
      meetingDate:startDate.format("L"),
      maxUsers:1,
      status:true,
     });
     createToast({
      title:"One on One Meeting Created Successfully.",
      type:"success"
     })

     navigate("/");
}
    }

  return (
    <div
    style={{
      display: "flex",
      height: "100vh",
      flexDirection: "column",
    }}
  >
    <Header />
    <EuiFlexGroup justifyContent="center" alignItems="center">
        <EuiForm >
            <MeetingNameField 
            
            label="Meeting Name"
            placeholder="Meeting Name"
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            />

<MeetingUserField
            label="Invite User"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Select a User"
          />
          <MeetingDateField selected={startDate} setStartDate={setStartDate}/>
          <EuiSpacer/>
          <CreateMeetingButtons createMeeting={createMeeting}/>
        </EuiForm>
        </EuiFlexGroup>
        </div>
  )
}



export default OneOnOneMeeting;
