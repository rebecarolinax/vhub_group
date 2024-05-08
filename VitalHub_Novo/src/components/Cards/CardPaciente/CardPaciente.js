import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  BoxCircle,
  Circle,
  ContainerCancel,
  ContainerCardSub,
  ContainerLevantadoConsulta,
  ContainerText,
  DataUser,
  TimeBox,
} from "../../Container/Style";
import { BtnCancel, BtnCancelSub, BtnText, TextBold } from "./Style";
import { CardPic } from "../../Image/Style";
import {
  TextGrayBold,
  TextGraySub,
  TextSemiBold,
  TitleBlack,
  TitleBlack1,
} from "../../Title/Style";
import { useEffect, useState } from "react";
import { Prescricao } from "../../../screens/Prescricao/Prescricao";

import { format, differenceInYears } from "date-fns";
import api from "../../../services/service";
import { userDecodeToken } from "../../../../Utils/Auth";
import moment from "moment";

export const CardPaciente = ({
  navigation,
  onPressImage,
  situacao,
  onPressCancel,
  onPressAppointment,
  source,
  id,
  dataConsulta,
  consultas,
  showModalAppointment,

  usuario

  // usuario
}) => {
  const [profile, setProfile] = useState("Paciente");
  const [role, setRole] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [medCard, setMedCard] = useState("");
  const [jti, setJti] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/${api}/Pacientes`);

        const data = await response.json();
        setDateOfBirth(data.dataNascimento);
      } catch (error) {}
    };
    fetchData();
  }, []);

  async function GetConsultas() {
    const url = profile.role == "Medico" ? "Medicos" : "Pacientes";
    await api
      .get(`/${url}/BuscarPorData?data=${dataConsulta}&id=${token.jti}`)
      .then((response) => {
        setMedCard(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setRole(token.role);
      setJti(token.jti);
    }
  }

  useEffect(() => {
    profileLoad();
    GetConsultas();

    console.log('card')
    console.log(usuario)
  }, []);

  const calculateAge = (dateOfBirth) => {
    return differenceInYears(new Date(), new Date(dateOfBirth));
  };

  return (
    <ContainerLevantadoConsulta>
      <ContainerCardSub>
        <BtnCancelSub onPress={onPressImage}>
          <CardPic source={source} />
        </BtnCancelSub>
        <DataUser>
          <ContainerText> 
            <TitleBlack1>
              {usuario.idNavigation.nome}
            </TitleBlack1>

            <BoxCircle>
              <TextGraySub>
                {
                  role == "Paciente"
                    ? calculateAge(dateOfBirth) + " anos"
                    : usuario.crm
                }
              </TextGraySub>

              <Circle></Circle>
              <TextGrayBold>
                {consultas.prioridade.prioridade == 1
                  ? "Rotina"
                  : consultas.prioridade.prioridade == 2
                    ? "Exame"
                    : "Urgência"}
              </TextGrayBold>
            </BoxCircle>
          </ContainerText>
          <ContainerCancel>
            <TimeBox situacao={situacao}>
              <MaterialCommunityIcons
                name="clock"
                size={14}
                color={situacao == "Agendada" ? "#49B3BA" : "#4E4B59"}
              />
              <TextBold>
                {moment(consultas.dataConsulta).format('HH:mm')}
              </TextBold>
            </TimeBox>

            {situacao == "Cancelada" ? (
              <></>
            ) : situacao == "Agendada" ? (
              <BtnCancel onPress={onPressCancel} situacao={situacao}>
                <BtnText situacao={situacao}>Cancelar</BtnText>
              </BtnCancel>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  role != "Paciente"
                    ? navigation.navigate("Prontuario", {
                        consultaId: consultas.id,
                      })
                    : navigation.navigate("Prescricao", {
                        consultaId: consultas.id,
                      });
                }}

                // onPress={()=> {
                //   role != "Paciente"
                //   ? setShowModal
                // }}

                // {...role == "Paciente"
                // ?  (
                //   onPress={() => navigation.navigate("Prescricao", { consultaId : consultas.id })}
                // )
                // :
                // (
                //   onPress={() => navigation.navigate("Prontuario", { consultaId : consultas.id })}
                // )}
              >
                <BtnText situacao={situacao}>Ver prontuário</BtnText>
              </TouchableOpacity>
            )}
          </ContainerCancel>
        </DataUser>
      </ContainerCardSub>
    </ContainerLevantadoConsulta>
  );
};
