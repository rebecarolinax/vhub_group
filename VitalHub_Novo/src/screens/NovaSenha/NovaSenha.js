import { useState } from "react";
import {
  Btn,
  BtnTitle,
  Button,
  ButtonTitle,
} from "../../components/Button/Style";
import { Container } from "../../components/Container/Style";
import { InputSenha } from "../../components/Input/Style";
import { Logo } from "../../components/Logo/Style";
import { Subtitle, Title } from "../../components/Title/Style";

import { Feather } from "@expo/vector-icons";
import api from "../../services/service";

export const NovaSenha = ({ navigation , route}) => {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function alterarSenha() {
    if (novaSenha === confirmarSenha) {
      await api
        .put(`/Usuario/AlterarSenha?email=${route.params.emailRecuperacao}`, {
          senhaNova: novaSenha,
        })
        .then(() => {
          navigation.replace("Login");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Senhas incompativeis");
    }
  }

  return (
    <Container>
      <Feather
        style={{ position: "absolute", left: 20, top: 30 }}
        onPress={() => navigation.navigate("Login")}
        name="x-circle"
        size={30}
        color="#34898F"
      />
      <Logo source={require("../../../src/assets/img/VitalHub_LogoAzul.png")} />

      <Title style={{ marginTop: -12 }}>Redefinir senha</Title>
      <Subtitle style={{ marginBottom: 8 }}>
        Insira e confirme a sua nova senha
      </Subtitle>

      <InputSenha
        value={novaSenha}
        onChangeText={(txt) => setNovaSenha(txt)}
        placeholder="Nova senha"
      />
      <InputSenha
        value={confirmarSenha}
        onChangeText={(txt) => setConfirmarSenha(txt)}
        placeholder="Confirmar nova senha"
      />

      <Btn style={{ marginTop: 30 }} onPress={() => alterarSenha()}>
        <BtnTitle>confirmar nova senha</BtnTitle>
      </Btn>
    </Container>
  );
};
