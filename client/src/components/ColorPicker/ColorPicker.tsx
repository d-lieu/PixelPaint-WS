import { useContext } from "react";
import { MuiColorInput } from "mui-color-input";
import { UserContext, UserContextProvider } from "../../hooks/UserContext";
import { User } from "../../Types/global";

export default function ColorPicker() {
  const { user, setUser } = useContext<UserContextProvider>(UserContext);

  const handleOnChange = (color: string) => {
    setUser((prevUser: User) => ({ ...prevUser, color }));
  };
  return <MuiColorInput value={user.color} onChange={handleOnChange} />;
}
