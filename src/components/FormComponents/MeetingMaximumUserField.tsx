import { EuiFieldNumber, EuiFormRow } from "@elastic/eui";
import React from "react";

function MeetingMaximumUserField({
  value,setValue
}: {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <EuiFormRow label="Maximum People">
      <EuiFieldNumber
        min={1}
        max={50}
        placeholder="Maximum People"
        value={value}
        onChange={(e) => {
          if (!e.target.value.length || parseInt(e.target.value) === 0)
            setValue(1);
          else if (parseInt(e.target.value) > 50) setValue(50);
          else setValue(parseInt(e.target.value));
        }}
      />
    </EuiFormRow>
  );
}

export default MeetingMaximumUserField;

