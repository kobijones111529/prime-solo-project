import React from "react";
import { useState } from "react";

function EditField({ defaultValue, onChange, edit, noEdit }) {
  const [editMode, setEditMode] = useState(false);
  /** @type {[string | undefined, (value: string | undefined) => void]} */
  const [input, setInput] = useState(undefined);

  const Edit = edit;
  const NoEdit = noEdit;

  if (editMode) {
    return (
      <Edit
        value={input}
        onChange={(/** @type {string} */ value) => {
          setInput(value);
          onChange()
        }}
        exitEdit={() => {
          setEditMode(false);
          setInput(undefined);
        }}
      />
    );
  } else {
    return (
      <NoEdit value={defaultValue} enterEdit={() => {
        setEditMode(true);
        setInput(defaultValue);
      }} />
    );
  }
}

export default EditField;
