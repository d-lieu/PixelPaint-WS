import React, { useState, useContext } from "react";
import { MuiColorInput } from "mui-color-input";
import { UserContext } from "../hooks/UserContext";

export default function ColorPicker() {
  const { user, setUser } = useContext(UserContext);

  const handleOnChange = (color) => {
    setUser((prevUser) => ({ ...prevUser, color }));
  };
  return <MuiColorInput value={user.color} onChange={handleOnChange} />;
}
