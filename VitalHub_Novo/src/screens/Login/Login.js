import { Container } from "../../components/Container/Style";
import { Logo } from "../../components/Logo/Style";
import { Title } from "../../components/Title/Style";
import { Input } from "../../components/Input/Style";
import {
  BtnGoogleTitle,
  Btn,
  BtnGoogle,
  BtnTitle,
} from "../../components/Button/Style";
import { ContentAccount } from "../../components/ContentAccount/Style";
import { TextAccount } from "../../components/TextAccount/Style";
import { AntDesign } from "@expo/vector-icons";
import { Link, LinkBlue } from "../../components/Link/Style";
import { useState } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../../services/service";

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState("rayssa@gmail.com");
  const [senha, setSenha] = useState("r1234");

  async function Login() {
    await api
      .post("/Login", {
        email: email,
        senha: senha,
      })
      .then(async (response) => {
        await AsyncStorage.setItem("token", JSON.stringify(response.data));

        navigation.navigate("Main");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Container>
      <Logo source={require("../../../src/assets/img/VitalHub_LogoAzul.png")} />

      <Title>Entrar ou criar conta</Title>

      <Input
        placeholder={"Usuário ou E-mail"}
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />

      <Input
        placeholder={"Senha"}
        secureTextEntry={true}
        value={senha}
        onChangeText={(txt) => setSenha(txt)}
      />

      <Link onPress={() => navigation.replace("EsqueceuSenha")}>
        Esqueceu sua senha?
      </Link>

      <Btn onPress={(e) => Login()}>
        <BtnTitle>entrar</BtnTitle>
      </Btn>

      <BtnGoogle>
        <AntDesign name="google" size={20} color="#496BBA" />
        <BtnGoogleTitle>entrar com Google</BtnGoogleTitle>
      </BtnGoogle>

      <ContentAccount>
        <TextAccount>
          Não tem conta?{" "}
          <LinkBlue onPress={() => navigation.replace("Cadastro")}>
            Crie uma conta agora!
          </LinkBlue>
        </TextAccount>
      </ContentAccount>
    </Container>
  );
};
