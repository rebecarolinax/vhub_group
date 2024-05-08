import { useEffect, useState } from "react";
import {
  BtnCinzaSub,
  BtnPerfil,
  BtnTitle,
} from "../../components/Button/Style";
import {
  ContainerLevantado,
  ContainerP,
} from "../../components/Container/Style";
import { ProfilePic } from "../../components/Image/Style";
import { InputBoxSub } from "../../components/InputBox/Index";
import { LinkBlue } from "../../components/Link/Style";
import { ScrollForm } from "../../components/ScrollForm/Style";
import { Subtitle, TitleBlack } from "../../components/Title/Style";
import api from "../../services/service";

export const Prontuario = ({ route, consulta }) => {
  const [consultas, setConsultas] = useState(null);
  const [cameraCapture, setCameraCapture] = useState(false);


  async function BuscarProntuario() {
    await api
      .get(`/Consultas/BuscarPorId?id=${route.params.consultaId}`)
      .then((response) => {
        setConsultas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    BuscarProntuario();
  }, []);


  return (
    <ScrollForm>
      <ContainerP>
        {consultas != null ? (
          <>
            <ProfilePic
              source={require("../../../src/assets/img/ImagePerfil.png")}
              resizeMode="cover"
            >
              <ContainerLevantado>
                <TitleBlack>{consultas.paciente.idNavigation.nome}</TitleBlack>
            <Subtitle>{consultas.paciente.idNavigation.email}</Subtitle>
              </ContainerLevantado>
            </ProfilePic>

            <InputBoxSub
              textLabel="Descrição da consulta"
              placeholder="Descrição"
              keyboardType="default"
              maxLength={10}
              editable={true}
              fieldWidth={80}
              customHeight={120}
              customP={60}
            />
            <InputBoxSub
              textLabel="Diagnóstico do paciente"
              placeholder="Diagnóstico"
              keyboardType="numeric"
              maxLength={14}
              editable={true}
              fieldWidth={80}
            />
            <InputBoxSub
              textLabel="Prescrição médica"
              placeholder="Prescrição médica"
              keyboardType="default"
              maxLength={100}
              editable={true}
              fieldWidth={80}
              customHeight={120}
              customP={60}
            />

            <BtnPerfil>
              <BtnTitle>Salvar</BtnTitle>
            </BtnPerfil>

            <BtnCinzaSub>
              <BtnTitle>Editar</BtnTitle>
            </BtnCinzaSub>

            <LinkBlue>Cancelar</LinkBlue>
          </>
        ) : (
          <></>
        )}
      </ContainerP>
    </ScrollForm>
  );
};
