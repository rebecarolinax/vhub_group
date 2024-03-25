import { ContainerLabel, ContainerLevantado, ContainerP, PerfilCityInputsContainer } from "../../components/Container/Style"
import { Subtitle, TitleBlack } from "../../components/Title/Style"
import { ScrollForm } from "../../components/ScrollForm/Style"
import { BtnCinza, BtnPerfil, BtnTitle, } from "../../components/Button/Style"
import { ProfilePic } from "../../components/Image/Style"
import { InputBox } from "../../components/InputBox/Index"
import { PerfilInput } from "../../components/Input/PerfilInput/Index"
import { userDecodeToken } from "../../../Utils/Auth"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"


export const Perfil = ({ navigation, img }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    async function profileLoad() {
        const token = await userDecodeToken();

        if (token) {
            setName(token.name),
                setEmail(token.email)
        }
    }

    async function logout() {
        await AsyncStorage.removeItem('token');
        navigation.navigate("Login")
    }

    useEffect(() => {
        profileLoad();
    }, [])



    return (
        <ScrollForm>
            <ContainerP>
                <ProfilePic
                    source={img}
                    resizeMode='cover'
                >

                    <ContainerLevantado>
                        <TitleBlack>{name}</TitleBlack>
                        <Subtitle>{email}</Subtitle>
                    </ContainerLevantado>
                </ProfilePic>

                <PerfilInput
                    inputLabel="Data de nascimento"
                    inputPlaceholder="04/15/1999"
                    containerWidth="90%"
                    inputType={"numeric"}
                />
                <PerfilInput
                    inputLabel="CPF"
                    inputPlaceholder="859********"
                    containerWidth="90%"
                    inputType={"numeric"}
                />
                <PerfilInput
                    inputLabel="Endereço"
                    inputPlaceholder="Rua Vicente Silva, 987"
                    containerWidth="90%"
                />

                <PerfilCityInputsContainer>
                    <PerfilInput
                        inputLabel="Cep"
                        inputPlaceholder="06548-909"
                        containerWidth="40%"
                    />
                    <PerfilInput
                        inputLabel="Cidade"
                        inputPlaceholder="Moema-SP"
                        containerWidth="40%"
                    />
                </PerfilCityInputsContainer>
                <BtnPerfil>
                    <BtnTitle>SALVAR</BtnTitle>
                </BtnPerfil>
                <BtnPerfil>
                    <BtnTitle>EDITAR</BtnTitle>
                </BtnPerfil>
                <BtnCinza onPress={() => logout()}>
                    <BtnTitle>Sair do app</BtnTitle>
                </BtnCinza>
            </ContainerP>
        </ScrollForm>
    )
}