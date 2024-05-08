import { useState } from "react";
import { Btn, BtnTitle } from "../../components/Button/Style";
import { Container } from "../../components/Container/Style";
import { Input } from "../../components/Input/Style";
import { LinkCancel } from "../../components/Link/Style";
import { Logo } from "../../components/Logo/Style";
import { Subtitle, Title } from "../../components/Title/Style";
import { Feather } from "@expo/vector-icons";
import api from "../../services/service";

export const EsqueceuSenha = ({ navigation }) => {
  const [email, setEmail] = useState("");

  async function EnviarEmail() {
    await api
      .post(`/RecuperarSenha?email=${email}`)
      .then(() => {
        navigation.replace("VerifiqueEmail", { emailRecuperacao: email });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Container>
      <Feather
        style={{ position: "absolute", left: 20, top: 30 }}
        onPress={() => navigation.navigate("Login")}
        name="arrow-left-circle"
        size={30}
        color="#34898F"
      />

      <Logo source={require("../../../src/assets/img/VitalHub_LogoAzul.png")} />
      <Title style={{ marginBottom: 24 }}>Recuperar Senha</Title>
      <Subtitle>
        Digite abaixo seu email cadastrado que enviaremos um link para
        recuperação de senha
      </Subtitle>

      <Input
        placeholder={"Usuário ou E-mail"}
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ marginTop: 30 }}
      />

      <Btn style={{ marginTop: 36 }}
      onPress={()=>EnviarEmail()}
      >

        <BtnTitle>Continuar</BtnTitle>
      </Btn>
    </Container>
  );
};
