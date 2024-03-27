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

import api from "../../services/service"

export const SelecionarMedico = ({ navigation }) => {

  const [medicoLista, setMedicoLista] = useState([]);

  async function ListarMedico() {
    //instalar a nossa conexao da api
    await api
      .get("/Medicos")
      .then((response) => {
        setMedicoLista(response.data);

        console.log(medicoLista);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    ListarMedico();
  }, []);

  const Doctor = [
    {
      id: 1,
      nome: Doctor,
      source: require("../../../src/assets/img/DoctorImage.png"),
      name: "Dra Alessandra",
      type: "Demartologa, Esteticista",
    },

    {
      id: 2,
      nome: Doctor,
      source: require("../../../src/assets/img/DoctorImage2.png"),
      name: "Dr Kumushiro",
      type: "Cirurgião, Cardiologista",
    },

    {
      id: 3,
      nome: Doctor,
      source: require("../../../src/assets/img/DoctorImage3.png"),
      name: "Dr Rodrigo Santos",
      type: "Clínico, Pediatra",
    },
  ];

  const [borderColor, setBorderColor] = useState(null);

  return (
    <ContainerC>
      <ClinicContent>
        {/* titulo */}
        <TitleBlackDoctor>Selecionar médico</TitleBlackDoctor>

        {/* lidta as especialidades dos medicos */}
        <ListClinic
          data={medicoLista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            // card do medico
            <CardMedico


              clickButton={item.id == borderColor}
              onPress={() => setBorderColor(item.id)}
              source={item.source}
              name={item.name}
              type={item.type}
              medico={item}
            />
          )}
        />
        {/* Botão */}
        <BtnModal onPress={() => navigation.replace("Calendario")}>
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
