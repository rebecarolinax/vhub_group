import { useRef, useState } from "react";
import {
  BtnCadastro,
  BtnTitle,
  Button,
  ButtonTitle,
} from "../../components/Button/Style";
import { Container, ContainerInput } from "../../components/Container/Style";
import { InputCode } from "../../components/Input/Style";
import { LinkCode } from "../../components/Link/Style";
import { Logo } from "../../components/Logo/Style";
import { Subtitle, SubtitleLink, Title } from "../../components/Title/Style";

import { Feather } from "@expo/vector-icons"
import api from "../../services/service";

export const VerifiqueEmail = ({ navigation, route }) => {

  function focusNextInput(index){
    //verificar se o index passado eh menor doq a quantidade de campos

    if (index < inputs.length - 1) {
      inputs[index + 1].current.focus()
    }
  }

  function focusPrevInput(index){
    //verificar se o index eh maior q 0
    if (index > 0) {
      inputs[index - 1].current.focus()
      
    }
  }

  async function ValidarCodigo(){
    await api.post(`/RecuperarSenha/Comparar?email=${route.params.emailRecuperacao}&codigo=${codigo}`)
    .then(()=>{
      navigation.replace("NovaSenha", {emailRecuperacao: route.params.emailRecuperacao})
    }).catch((error) => {
      console.log(error);
    });
  }

  const inputs = [useRef(null), useRef(null),useRef(null),useRef(null) ]
  const [ codigo,setCodigo]=useState("")
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

      <Title style={{marginTop: -12 }}>Verifique seu e-mail</Title>

      <Subtitle>Digite o código de 4 dígitos enviado para</Subtitle>
      <SubtitleLink>{route.params.emailRecuperacao}</SubtitleLink>

      <ContainerInput>

        {
          [0,1,2,3].map((index)=>(
            <InputCode keyboardType="numeric"
              key={index}
              ref={inputs[index]}

              onChangeText={(txt)=>{
                
                if (txt == "") {
                  //verificar se um campo eh vazio
                  focusPrevInput(index)


                }else{
                  //verificar se um campo for preenchido

                  focusNextInput(index)

                  const codigoInformado = [...codigo]
                  codigoInformado[index] = txt
                  setCodigo(codigoInformado.join(''))

                }


                
              }}
            />
          ))
        }

      </ContainerInput>

      <BtnCadastro style={{marginTop:2}} onPress={() => ValidarCodigo()}>
        <BtnTitle>entrar</BtnTitle>
      </BtnCadastro>

      <LinkCode>Reenviar código</LinkCode>
    </Container>
  );
};
