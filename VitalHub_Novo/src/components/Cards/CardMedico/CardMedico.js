import {
  Container,
  ContainerCard,
  ContainerLevantadoConsulta,
  ContainerText,
  DataUser,
} from "../../Container/Style";
import { CardPic } from "../../Image/Style";
import { TextSemiBold, TitleBlack } from "../../Title/Style";

import api from "../../../services/service";

export const CardMedico = ({
  name,
  type,
  source,
  onPress,
  clickButton,
  navigation,
  medico,
  selected,
  setMedico,
}) => {
  return (
    <ContainerLevantadoConsulta
      clickButton={clickButton}
      selected={selected}
      onPress={() =>
        setMedico({
          medicoId: medico.id,
          medicoLabel: medico.idNavigation.nome,
          medicoEspecialidade: medico.especialidade.especialidade1
          
        })
      }
    >
      <ContainerCard>
        <CardPic source={source} />
        <DataUser>
          <ContainerText>
            <TitleBlack>{medico.idNavigation.nome}</TitleBlack>
          </ContainerText>
        </DataUser>
      </ContainerCard>
    </ContainerLevantadoConsulta>
  );
};
