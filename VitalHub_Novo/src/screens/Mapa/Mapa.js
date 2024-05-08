import { useEffect, useState } from "react";
import {
  ContainerP,
  ContainerSub,
  PerfilCityInputsContainer,
} from "../../components/Container/Style";
import { ProfilePicSub } from "../../components/Image/Style";
import { PerfilInput } from "../../components/Input/PerfilInput/Index";
import { InputBox } from "../../components/InputBox/Index";
import { MapaAtual } from "../../components/MapaAtual/MapaAtual";
import { TextGray, TitleSub } from "../../components/Title/Style";
import { BtnSub, BtnSubText } from "../../components/Modals/ModalConsulta/Style";

export const Mapa = ({ navigation, route }) => {
  const [clinica, setClinica] = useState(null);

  useEffect(() => {
    if (clinica == null) {
      BuscarClinica();
    }
  }, [clinica]);

  async function BuscarClinica() {
    await api
      .get(`/Clinica/BuscarPoriD?id=${route.paramas.clinicaId}`)
      .then((response) => {
        setClinica(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <ContainerP>
      
          <MapaAtual />

          <ProfilePicSub
            source={require("../../../src/assets/img/Mapa.png")}
            resizeMode="cover"
          />

          <TitleSub>Clínica Natureh</TitleSub>
          <TextGray>São Paulo, SP</TextGray>

          <PerfilInput
            inputLabel="Endereço"
            inputPlaceholder="Rua Exemplo, 000"
            containerWidth="90%"
          />
          <PerfilCityInputsContainer>
            <PerfilInput
              inputLabel="Número"
              inputPlaceholder="000"
              containerWidth="40%"
              inputType={"numeric"}
            />
            <PerfilInput
              inputLabel="Bairro"
              inputPlaceholder="Bairro-Estado"
              containerWidth="40%"
            />
          </PerfilCityInputsContainer>

          <BtnSub>
            <BtnSubText>voltar</BtnSubText>
          </BtnSub>
       
    </ContainerP>
  );
};
