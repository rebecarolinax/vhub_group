import { ActivityIndicator, Modal } from "react-native";
import {
  BtnCard,
  BtnCardSub,
  BtnModalCard,
  BtnModalCardClinic,
  BtnSubText,
  CardPacienteModal,
  ContainerModalText,
  ModalAge,
  ModalCardContainer,
  ModalCardContainerConsulta,
  ModalConsultContentText,
  ModalEmail,
  ModalPic,
  TextModalCalendar,
} from "./Style";
import { TextBlack, TitleBlack } from "../../Title/Style";
import { BtnTitle } from "../../Button/Style";
import { InputLabelSub } from "../../Label/Style";
import { useEffect, useState } from "react";

import { format, differenceInYears } from "date-fns";
import api from "../../../services/service";
import moment from "moment";

import {userDecodeToken} from "../../../../Utils/Auth"

//modal de medico quando clica em prontuario
export const ModalCard = ({
  visible,
  consulta,
  navigation,
  setShowModalAppointmentMedico,
  ...rest
  // rest todas as outras propriedades do modal de um determinado componente nativo assim como o modal estamos usando todas as suas propriedades
}) => {
  async function HandlePress(rotas) {
    await navigation.navigate(rotas, { consultaId: consulta.id });

    setShowModalAppointmentMedico(false);
  }

  const [dateOfBirth, setDateOfBirth] = useState(null);
  const calculateAge = (dateOfBirth) => {
    return differenceInYears(new Date(), new Date(dateOfBirth));
  };

  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      {/* Container */}
      <CardPacienteModal>
        {consulta != null ? (
          <>
            {/* Content */}
            <ModalCardContainer>
              <ModalPic
                source={require("../../../assets/img/ImageModal.png")}
              />

              {/* Titulo */}
              {/* <TitleBlack>{consulta.paciente.idNavigation.nome}</TitleBlack> */}

              {/* Descrição */}
              <ContainerModalText>
                <ModalAge>{calculateAge(dateOfBirth) + " anos"}</ModalAge>
                {/* <ModalEmail>{consulta.paciente.idNavigation.email}</ModalEmail> */}
              </ContainerModalText>

              {/* Botão */}
              <BtnModalCard onPress={() => HandlePress("Prontuario")}>
                <BtnTitle>Inserir Prontuário</BtnTitle>
              </BtnModalCard>

              <BtnCardSub onPress={() => setShowModalAppointmentMedico(false)}>
                <BtnSubText>Cancelar</BtnSubText>
              </BtnCardSub>
            </ModalCardContainer>
          </>
        ) : (
          <></>
        )}
      </CardPacienteModal>
    </Modal>
  );
};

//card de ver prontuario para paciente
export const CardModalPaciente = ({
  visible,
  setShowModalAppointment,
  navigation,
  consulta,
  roleUsuario,
  situacao,
  ...rest
  // rest todas as outras propriedades do modal de um determinado componente nativo assim como o modal estamos usando todas as suas propriedades
}) => {
  function HandlePress(rota) {
    navigation.replace(rota, { consultaId: consulta.id });
  }
  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      {/* Container */}
      <CardPacienteModal>
        {consulta != null ? (
          <>
            {/* Content */}
            <ModalCardContainer>
              <ModalPic
                source={require("../../../assets/img/ImageModalPaciente.png")}
              />

              {/* Titulo */}
              <TitleBlack>
                {consulta.medicoClinica.medico.idNavigation.nome}
              </TitleBlack>

              {/* Descrição */}
              <ContainerModalText>
                <ModalAge>{consulta.especialidade}</ModalAge>
                <ModalEmail>CRM-15286</ModalEmail>
              </ContainerModalText>

              {/* Botão */}
              <BtnModalCard onPress={() => HandlePress("Prescricao")}>
                <BtnTitle>Ver local da consulta</BtnTitle>
              </BtnModalCard>

              <BtnCardSub onPress={() => setShowModalAppointment(false)}>
                <BtnSubText>Cancelar</BtnSubText>
              </BtnCardSub>
            </ModalCardContainer>
          </>
        ) : (
          <></>
        )}
      </CardPacienteModal>
    </Modal>
  );
};

//modal de agendar consulta para paciente
export const AppointmentModalConsulta = ({
  visible,
  agendamento,
  navigation,
  setShowModalAppointment,
  ...rest
  // rest todas as outras propriedades do modal de um determinado componente nativo assim como o modal estamos usando todas as suas propriedades
}) => {
  function HandlePress(rota) {
    navigation.replace(rota, { consultaId: consulta.id });
  }

  const [profile, setProfile] = useState(null);

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setProfile(token);
    }
  }

  useEffect(() => {
    profileLoad();
  }, [medico]);  
  
  async function handleConfirm() {
    await api
      .post("/Consultas/Cadastrar", {
        ...agendamento,
        pacienteId: profile.jti,
        situacaoId: "1CAEB7C7-0640-4378-8192-ED2198D84BC0",

      
      })
      .then(async () => {
        await setShowModalAppointment(false);

        navigation.replace("Main");
      })
      .catch((error) => {
        console.log(error);
      });
  }



  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      {/* Container */}
      <CardPacienteModal>
        {agendamento ? (
          <ModalCardContainerConsulta>
            {/* Titulo */}
            <TitleBlack>Agendar consulta</TitleBlack>

            <TextBlack>
              Consulte os dados selecionados para a sua consulta
            </TextBlack>

            {/* Descrição */}
            <ModalConsultContentText>
              <InputLabelSub>Data da consulta</InputLabelSub>
              <TextModalCalendar>
                {moment(agendamento.dataConsulta).format("DD/MM/YYYY HH:mm")}
              </TextModalCalendar>
            </ModalConsultContentText>

            <ModalConsultContentText>
              <InputLabelSub>Médico(a) da consulta</InputLabelSub>
              <TextModalCalendar>{agendamento.medicoLabel}</TextModalCalendar>
              <TextModalCalendar>Demartologa, Esteticista</TextModalCalendar>
            </ModalConsultContentText>

            <ModalConsultContentText>
              <InputLabelSub>Clinica</InputLabelSub>
              <TextModalCalendar>{agendamento.clinicaLabel}</TextModalCalendar>
            </ModalConsultContentText>

            <ModalConsultContentText>
              <InputLabelSub>Local da consulta</InputLabelSub>
              <TextModalCalendar>{agendamento.localizacao}</TextModalCalendar>
            </ModalConsultContentText>

            <ModalConsultContentText>
              <InputLabelSub>Tipo da consulta</InputLabelSub>
              <TextModalCalendar>
                {agendamento.prioridadeLabel}
              </TextModalCalendar>
            </ModalConsultContentText>

            {/* Botão */}
            <BtnModalCardClinic
              onPress={() => {
                handleConfirm();
              }}
            >
              <BtnTitle>Confirmar</BtnTitle>
            </BtnModalCardClinic>

            <BtnCard onPress={() => setShowModalAppointment(false)}>
              <BtnSubText>Cancelar</BtnSubText>
            </BtnCard>
          </ModalCardContainerConsulta>
        ) : (
          <ActivityIndicator></ActivityIndicator>
        )}
        {/* Content */}
      </CardPacienteModal>
    </Modal>
  );
};
