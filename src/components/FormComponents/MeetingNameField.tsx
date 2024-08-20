import { EuiFieldText, EuiFormRow } from '@elastic/eui'
import React from 'react'

function MeetingNameField({label,placeholder,value,setMeetingName ,isInvalid,error,
} 
  : {
    label: string;
    isInvalid: boolean;
    error: Array<string>;
    placeholder: string;
    value: string;
    setMeetingName: React.Dispatch<React.SetStateAction<string>>;
  }) {
 
  return (
    <EuiFormRow  label={label} isInvalid={isInvalid} error={error} >
      <EuiFieldText 
      
      placeholder={placeholder}
      value={value}
      
      onChange={(e)=>setMeetingName(e.target.value )}
      isInvalid={isInvalid}
      
      />
    </EuiFormRow>
  )
}
export default MeetingNameField;

