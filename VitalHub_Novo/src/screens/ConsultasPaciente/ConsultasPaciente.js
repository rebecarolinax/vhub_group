import { ListComponent } from "../../components/Lista/Lista";
import { CardPaciente } from "../../components/Cards/CardPaciente/CardPaciente";
import { ModalConsulta } from "../../components/Modals/ModalConsulta/ModalConsulta";
import {
  CardModalPaciente,
  ModalCard,
} from "../../components/Modals/ModalCard/ModalCard";
import { useEffect, useState } from "react";
import { BtnMedical, BtnStethoscope } from "../../components/Button/Style";
import { FontAwesome6 } from "@expo/vector-icons";
import CalendarList from "../../components/Calendario/Index";
import {
  ContainerBtn,
  ContainerConsulta,
  ContainerMedico,
  MedicalInstrument,
} from "../../components/Container/Style";
import { BtnCadastroM } from "../../components/Button/BtnCadastro/BtnCadastro";
import { Header } from "../../components/Header/Header";

import api from "../../services/service";
import { userDecodeToken } from "../../../Utils/Auth";
import { CardMedico } from "../../components/Cards/CardMedico/CardMedico";
import moment from "moment";
import { ModalCancel } from "../../components/Modals/ModalCancel/ModalCancel";
import { Text } from "react-native";

export const PacienteConsulta = ({ navigation }) => {
  const [dataConsulta, setDataConsulta] = useState("");
  const [profile, setProfile] = useState({});
  const [consultasListas, setConsultasListas] = useState([]);

  const [showModalAppointment, setShowModalAppointment] = useState(false);
  const [showModalAppointmentMedico, setShowModalAppointmentMedico] =
    useState(false);
  const [showModalConsult, setShowModalConsult] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [statusListaPaciente, setStatusListaPaciente] = useState("Agendada");

  const [statusModal, setStatusModal] = useState("");
  const [name, setName] = useState("");

  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const [role, setRole] = useState("");

  const [situacao, setSituacao] = useState("");

  async function ListarConsultas() {
    const url = profile.role == "Medico" ? "Medicos" : "Pacientes";

    await api
      .get(`/${url}/BuscarPorData?data=${dataConsulta}&id=${profile.jti}`)
      .then((response) => {
        console.log("KADEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
        console.log(response.data);
        setConsultasListas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setName(token.name);
      setProfile(token);
      setRole(token.jti);

      setDataConsulta(moment().format("YYYY-MM-DD"));
    }
  }

  function MostrarModal(modal, consulta) {
    setConsultaSelecionada(consulta);

    if (modal == "ModalCancel") {
      setShowModalCancel(true);
      setSituacao(consulta.situacao.situacao)
    } else if (modal == "ModalCard") {
      setShowModalAppointmentMedico(true);
    } else {
      setShowModalConsult(true);
    }
  }

  useEffect(() => {
    profileLoad();
  }, []);

  useEffect(() => {
    if (dataConsulta != "") {
      ListarConsultas();
    }
  }, [dataConsulta, situacao]);

  return (
    <ContainerConsulta>
      {/* Header */}
      <Header />

      {/* Calendário */}
      <CalendarList setDataConsulta={setDataConsulta} />

      {/* Botões */}
      <ContainerBtn>
        <BtnCadastroM
          textButton={"Agendadas"}
          clickButton={statusListaPaciente === "Agendada"}
          onPress={() => setStatusListaPaciente("Agendada")}
        />
        <BtnCadastroM
          textButton={"Realizadas"}
          clickButton={statusListaPaciente === "Realizada"}
          onPress={() => setStatusListaPaciente("Realizada")}
        />
        <BtnCadastroM
          textButton={"Canceladas"}
          clickButton={statusListaPaciente === "Cancelada"}
          onPress={() => setStatusListaPaciente("Cancelada")}
        />
      </ContainerBtn>

      {/* FlatList */}
      <ListComponent
        data={consultasListas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>
          statusListaPaciente === item.situacao.situacao && (
            // console.log(item.medicoClinica)
            <CardPaciente
              navigation={navigation}
              
              consultas={item}
              onPressCancel={() => MostrarModal("ModalCancel", item)}
              onPressAppointment={() => MostrarModal("ModalCard", item)}
              situacao={item.situacao.situacao}
              usuario={
                profile.role == "Paciente"
                  ? item.medicoClinica.medico
                  : item.paciente
              }
            />
          )
        }
      />

      <MedicalInstrument>
        <BtnStethoscope onPress={() => setShowModalConsult(true)}>
          <FontAwesome6 name="stethoscope" size={24} color="white" />
        </BtnStethoscope>
      </MedicalInstrument>

      {/* modal de agendar consulta (botao verde) */}
      <ModalConsulta
        navigation={navigation}
        visible={showModalConsult}
        setShowModalConsult={setShowModalConsult}
        setStatusModal={setStatusModal}
        statusModal={statusModal}
      />

      {/* modal de cancelar consulta */}
      <ModalCancel
        setSituacao={setSituacao}
        consulta={consultaSelecionada}
        visible={showModalCancel}
        setShowModalCancel={setShowModalCancel}
      />

      {/* modal de prontuario para paciente (dados do medico)*/}
      <CardModalPaciente
        consulta={consultaSelecionada}
        roleUsuario={profile.role}
        navigation={navigation}
        visible={showModalAppointment}
        setShowModalAppointment={setShowModalAppointment}
      />

      {/* modal de prontuario para medico (dados do paciente)*/}
      <ModalCard
        consulta={consultaSelecionada}
        roleUsuario={profile.role}
        navigation={navigation}
        visible={showModalAppointmentMedico}
        setShowModalAppointmentMedico={setShowModalAppointmentMedico}
      />
    </ContainerConsulta>
  );
};
