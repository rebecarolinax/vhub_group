import { Modal } from "react-native";
import {
  BtnModal,
  BtnSub,
  BtnSubText,
  ModalContent,
  ModalSubtitle,
  PatientModal,
  TitleBold,
} from "./Style";
import { ContainerBtn } from "../../Container/Style";
import { InputP } from "../../Input/Index";
import { BtnTitle } from "../../Button/Style";
import { BtnAgendar } from "../../Button/BtnCadastro/BtnCadastro";
import { useEffect, useReducer, useState } from "react";

export const ModalConsulta = ({
  navigation,
  visible,
  setShowModalConsult,
  clickButton,
  statusModal,
  setStatusModal,
  ...rest
}) => {
  const [agendamento, setAgendamento] = useState(null);

  async function handleContinue() {
    await setShowModalConsult(false);

    navigation.navigate("Clinica", { agendamento: agendamento });
  }
  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      {/* Container */}
      <PatientModal>
        {/* Content */}
        <ModalContent>
          {/* Titulo */}
          <TitleBold>Agendar consulta</TitleBold>

          {/* Descrição */}
          <ModalSubtitle>Qual o nível da consulta</ModalSubtitle>
          <ContainerBtn>
            {/* id 1 roina */}
            <BtnAgendar
              // onPress={() => 'B20618F1-7B58-44E8-900E-EB34E413238D'}
              textButton={"Rotina"}
              clickButton={statusModal === "rotina"}
              onPress={() =>
                setAgendamento({
                  ...agendamento, //mantem as informacoes que ja existem dentro do state e so add mais
                  prioridadeId: "B20618F1-7B58-44E8-900E-EB34E413238D",
                  prioridadeLabel: "Rotina",
                })
              }
            />

            {/* id 2 exame */}
            <BtnAgendar
              // onPress={() => '8D904E93-1BA7-4A0F-86D3-E5D8815C7718'}
              textButton={"Exame"}
              clickButton={statusModal === "exame"}
              onPress={() =>
                setAgendamento({
                  ...agendamento,
                  prioridadeId: "8D904E93-1BA7-4A0F-86D3-E5D8815C7718",
                  prioridadeLabel: "Exame",
                })
              }
            />

            {/* id 3 urgencia */}
            <BtnAgendar
              // onPress={() => '361E08CF-FE34-4DE5-BBF8-C0C04C49A1F2'}
              textButton={"Urgência"}
              clickButton={statusModal === "urgencia"}
              onPress={() =>
                setAgendamento({
                  ...agendamento,
                  prioridadeId: "361E08CF-FE34-4DE5-BBF8-C0C04C49A1F2",
                  prioridadeLabel: "Urgencia",
                })
              }
            />
          </ContainerBtn>

          {/* nivel de prioridade da consulta (no banco) */}
          <ModalSubtitle>Qual o nível da consulta</ModalSubtitle>
          <InputP
            placeholder={"Informe a localização"}
            editable={true}
            maxLength={200}
            customWidth={90}
            onChangeText={(txt) =>
              setAgendamento({
                ...agendamento,
                localizacao: txt,
              })
            }
            value={agendamento ? agendamento.localizacao : null}
          />

          <BtnModal
            onPress={() => handleContinue()}
          >
            <BtnTitle>Continuar</BtnTitle>
          </BtnModal>

          <BtnSub onPress={() => setShowModalConsult(false)}>
            <BtnSubText>Cancelar</BtnSubText>
          </BtnSub>
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
