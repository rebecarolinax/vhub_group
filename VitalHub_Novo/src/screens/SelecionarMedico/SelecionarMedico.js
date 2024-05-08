import { useEffect, useState } from "react";
import { ClinicContent, ContainerC } from "../../components/Container/Style";
import { TitleBlackDoctor } from "../../components/Cards/CardMedico/Style";
import { ListClinic } from "../../components/Cards/CardClinica/Style";
import { CardMedico } from "../../components/Cards/CardMedico/CardMedico";
import {
  BtnModal,
  BtnSub,
  BtnSubText,
} from "../../components/Modals/ModalCancel/Style";
import { BtnTitle } from "../../components/Button/Style";

import api from "../../services/service";

export const SelecionarMedico = ({ navigation, route }) => {
  const [medicoLista, setMedicoLista] = useState([]);
  const [medico, setMedico] = useState("");

  async function ListarMedico() {
    //instalar a nossa conexao da api
    await api
      .get(
        `/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.clinicaId}`
      )
      .then((response) => {
        setMedicoLista(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    ListarMedico();
  }, []);

  const [borderColor, setBorderColor] = useState(null);

  async function handleContinue() {
    navigation.replace("Calendario", {
      agendamento: { ...route.params.agendamento, ...medico },
    });
  }

  return (
    <ContainerC>
      <ClinicContent>
        {/* titulo */}
        <TitleBlackDoctor>Selecionar médico</TitleBlackDoctor>

        {/* lista as especialidades dos medicos */}
        <ListClinic
          data={medicoLista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            // card do medico
            <CardMedico
              medico={item}
              clickButton={item.id == borderColor}
              onPress={() => setBorderColor(item.id)}
              source={item.source}
              name={item.name}
              type={item.type}
              selected={medico && medico.medicoClinicaId == item.id}
              setMedico={setMedico}
            />
          )}
        />
        {/* Botão */}
        <BtnModal onPress={() => handleContinue()}>
          {/* titulo do botao */}
          <BtnTitle>Continuar</BtnTitle>
        </BtnModal>

        <BtnSub onPress={() => navigation.replace("Clinica")}>
          <BtnSubText>Cancelar</BtnSubText>
        </BtnSub>
      </ClinicContent>
    </ContainerC>
  );
};
