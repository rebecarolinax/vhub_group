import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BoxCard,
  BoxDay,
  DayBox,
  IconContent,
  TextBlue,
  TextBox,
  TextCity,
  TextGold,
} from "./Style";
import { AntDesign } from "@expo/vector-icons";
import { ContainerLevantadoConsulta } from "../../Container/Style";
import { TitleBlack } from "../../Title/Style";

import api from "../../../services/service";

export const CardClinic = ({
  name,
  time,
  city,
  onPress,
  clickButton,
  cidade,
  nomeFantasia,
  clinica,
  endereco,
  setClinica,
}) => {
  return (
    <ContainerLevantadoConsulta
      onPress={() =>
        setClinica({
          clinicaId: clinica.id,
          clinicaLabel: clinica.nomeFantasia,
        })
      }
      clickButton={clickButton}
    >
      <BoxCard>
        <TextBox>
          <TitleBlack>{nomeFantasia}</TitleBlack>
          <IconContent></IconContent>
        </TextBox>
        <BoxDay>
          <TextCity>{clinica.endereco.cidade}</TextCity>
        </BoxDay>
      </BoxCard>
    </ContainerLevantadoConsulta>
  );
};
