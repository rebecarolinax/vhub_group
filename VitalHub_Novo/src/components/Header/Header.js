import { useEffect, useState } from "react";
import { BoxUser, ContainerHeader, DataUser } from "../Container/Style";
import { HeaderImage } from "../Image/Style";
import { TextGray, UserTitle } from "../Title/Style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { userDecodeToken } from "../../../Utils/Auth";

export const Header = (cameraCapture) => {
  const [name, setName] = useState("");

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setName(token.name);
    }
  }

  useEffect(() => {
    profileLoad();
  }, []);



  return (
    <ContainerHeader>
      <BoxUser>
        <HeaderImage source={{ uri : cameraCapture }} />
        <DataUser>
          <TextGray>Bem vindo</TextGray>
          <UserTitle>{name}</UserTitle>
        </DataUser>
      </BoxUser>
      <MaterialCommunityIcons name="bell" size={25} color="#ffffff" />
    </ContainerHeader>
  );
};
