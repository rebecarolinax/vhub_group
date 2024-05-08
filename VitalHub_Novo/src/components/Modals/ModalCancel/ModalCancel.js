import { Modal } from "react-native";
import {
  ModalContent,
  ModalText,
  PatientModal,
  BtnSub,
  BtnSubText,
} from "./Style";
import { BtnModal, BtnTitle } from "../../Button/Style";
import { TitleBlack } from "../../Title/Style";

import * as Notifications from "expo-notifications";
import api from "../../../services/service";

//solicita permissões de notificação ao iniciar o app
Notifications.requestPermissionsAsync();

//define como as notificacoes devem ser tratadas quando recebidos valores
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    //Mostrar um alerta quando a notificacao for recebida
    shouldShowAlert: true,

    //Reproduz som ao receber a notificacao
    shouldPlaySound: true,

    //Mostrar quantidade de notificacoes no icone do app
    shouldSetBadge: false,
  }),
});

export const ModalCancel = ({
  visible,
  setShowModalCancel,
  setSituacao,
  consulta,
  route,
  ...rest
  // rest todas as outras propriedades do modal de um determinado componente nativo assim como o modal estamos usando todas as suas propriedades
}) => {
  //funçao para lidar com a chamada de notificaçao
  const handleCallNotifications = async () => {
    //obtem o status da permissao
    const { status } = await Notifications.getPermissionsAsync();

    //verifica se o usuario permitiu as notificaçoes
    if (status != "granted") {
      alert("Você não ativou as notificações");
      return;
    }

    //Agenda uma notificação
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Consulta Cancelada",
        body: "Sua consulta foi cancelada",
        sound: "Notification.mp3",
      },
      trigger: null,
    });
  };
  async function CancelarConsulta() {
   
    await api
      .put(`Consultas/Status?idConsulta=${consulta.id}&status=Cancelada`)
      .then(() => {
        setSituacao("Cancelada");
        setShowModalCancel(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Modal {...rest} visible={visible} transparent={true} animationType="fade">
      {/* Container */}
      <PatientModal>
        {/* Content */}
        <ModalContent>
          {/* Titulo */}
          <TitleBlack>Cancelar consulta</TitleBlack>

          {/* Descrição */}
          <ModalText>
            Ao cancelar essa consulta, abrirá uma possível disponibilidade no
            seu horário, deseja mesmo cancelar essa consulta?
          </ModalText>

          {/* Botão */}
          <BtnModal onPress={() => CancelarConsulta()}>
            <BtnTitle>Confirmar</BtnTitle>
          </BtnModal>

          <BtnSub onPress={() => setShowModalCancel(false)}>
            <BtnSubText>Cancelar</BtnSubText>
          </BtnSub>
        </ModalContent>
      </PatientModal>
    </Modal>
  );
};
