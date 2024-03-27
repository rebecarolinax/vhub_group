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
    medico

}) => {
    return (
        <ContainerLevantadoConsulta clickButton={clickButton} onPress={onPress}>
            <ContainerCard>
                <CardPic
                    source={source}
                />
                <DataUser>
                    <ContainerText>
                            <TitleBlack>{medico.idNavigation.nome}</TitleBlack>
                            <TextSemiBold>{medico.especialidade.especialidade1}</TextSemiBold>
                    </ContainerText>
                </DataUser>
            </ContainerCard>
        </ContainerLevantadoConsulta>
    )
}

// const CardMedico = ({ selected = true, medico }) => {
//   return (
//     <CardMedico selected={selected}>
//       <ContainerCard>

//         <CardPic source={source} />

//         <DataUser>

//           <ContainerText>

//             <TitleBlack>{medico.idNavigation.name}</TitleBlack>

//             <TextSemiBold>{medico.especialidade.especialidade1}</TextSemiBold>

//           </ContainerText>

//         </DataUser>
//       </ContainerCard>
//     </CardMedico>
//   );
// };
