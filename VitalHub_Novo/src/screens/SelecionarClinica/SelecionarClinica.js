import { useEffect, useState } from "react";
import { ClinicContent, ContainerC } from "../../components/Container/Style";
import { TitleBlack } from "../../components/Title/Style";
import { CardClinic } from "../../components/Cards/CardClinica/CardClinica";
import { ListClinic } from "../../components/Cards/CardClinica/Style";
import { BtnSub, BtnSubText } from "../../components/Modals/ModalCancel/Style";
import { BtnModal, BtnTitle } from "../../components/Button/Style";
import api from "../../services/service";

export const Clinica = ({navigation, route}) => {
  const [clinicaLista, setClinicaLista] = useState([]);
  const [clinica, setClinica] = useState("");

  const [showModalConsult, setShowModalConsult] = useState(false);

  async function ListarClinicas() {
    if (route.params) {
      await api
        .get(
          `/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`
        )
        .then((response) => {
          setClinicaLista(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    ListarClinicas();
  }, []);

  const [borderColor, setBorderColor] = useState(null);

  async function handleContinue() {
    navigation.replace("SelecionarMedico", {
      agendamento: {
        ...route.params.agendamento,
        ...clinica,
      },
    });
  }

  return (
    <ContainerC>
      <ClinicContent>
        <TitleBlack>Selecionar clínica</TitleBlack>
        <ListClinic
          data={clinicaLista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardClinic
              clickButton={item.id == borderColor}
              onPress={() => setBorderColor(item.id)}
              nomeFantasia={item.nomeFantasia}
              rated={item.rated}
              time={item.time}
              cidade={item.cidade}
              selected={clinica && clinica.clinicaId == item.id}
              setClinica={setClinica}
              clinica={item}
            />
          )}
        />

        {/* Botão */}
        <BtnModal onPress={() => handleContinue()}>
          <BtnTitle>Continuar</BtnTitle>
        </BtnModal>

        <BtnSub
          onPress={() => {
            navigation.navigate("Main");
            setShowModalConsult(true);
          }}
        >
          <BtnSubText>Cancelar</BtnSubText>
        </BtnSub>
      </ClinicContent>
    </ContainerC>
  );
};
