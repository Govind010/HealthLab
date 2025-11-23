import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Option 1", value: "1" },
  { label: "Option 2", value: "2" },
];

export default function TestComponent() {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      data={data}
      labelField="label"
      valueField="value"
      value={value}
      onChange={(item) => setValue(item.value)}
      style={{ margin: 16, borderWidth: 1, padding: 12 }}
    />
  );
}
