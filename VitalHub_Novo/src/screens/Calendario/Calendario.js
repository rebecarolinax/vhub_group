import { useEffect, useState } from "react";
import {
  ClinicContent,
  ContainerCalendar,
  InputContent,
} from "../../components/Container/Style";
import { TitleBlackDoctor } from "../../components/Cards/CardMedico/Style";
import CalendarComponent from "../../components/Calendar/Calendar";
import {
  BtnModal,
  BtnSub,
  BtnSubText,
  ModalSubtitle2,
} from "../../components/Modals/ModalConsulta/Style";
import InputSelect from "../../components/Input/InputSelect/InputSelect";
import { BtnTitle } from "../../components/Button/Style";
import { AppointmentModalConsulta } from "../../components/Modals/ModalCard/ModalCard";
import { logProfileData } from "react-native-calendars/src/Profiler";

export const CalendarioPaciente = ({ navigation, route}) => {
  const [showModalAppointment, setShowModalAppointment] = useState(false);
  const [agendamento, setAgendamento] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horaSelecionada, setHoraSelecionada] = useState("");

  function handleContinue(){
    setAgendamento({
      ...route.params.agendamento,
      dataConsulta: `${dataSelecionada} ${horaSelecionada}`
    });
    setShowModalAppointment(true)
  }


  useEffect(() => {
    console.log("ROUTEEEEEE");
    console.log(route.params);
  },[route.params])

  return (
    <ContainerCalendar>
      <ClinicContent>
        <TitleBlackDoctor>Selecionar data</TitleBlackDoctor>

        <CalendarComponent
          setDataSelecionada={setDataSelecionada}
          dataSelecionada={dataSelecionada}
        />

        <InputContent>
          <ModalSubtitle2>Selecione um horário disponível</ModalSubtitle2>
          <InputSelect
          setHoraSelecionada={setHoraSelecionada}
          />
        </InputContent>

        {/* Botão */}
        <BtnModal onPress={() => handleContinue()}>

        {/* onPress={() => setShowModalAppointment(true) */}
          <BtnTitle>Continuar</BtnTitle>
        </BtnModal>

        <BtnSub onPress={() => navigation.replace("SelecionarMedico")}>
          <BtnSubText>Cancelar</BtnSubText>
        </BtnSub>
      </ClinicContent>

      <AppointmentModalConsulta
        navigation={navigation}
        visible={showModalAppointment}
        setShowModalAppointment={setShowModalAppointment}
        agendamento={agendamento}
      />
    </ContainerCalendar>
  );
};
