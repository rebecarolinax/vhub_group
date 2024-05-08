import {
  Container,
  ContainerLabel,
  ContainerLevantado,
  ContainerP,
  PerfilCityInputsContainer,
} from "../../components/Container/Style";
import { Subtitle, TitleBlack } from "../../components/Title/Style";
import { ScrollForm } from "../../components/ScrollForm/Style";
import { BtnCinza, BtnPerfil, BtnTitle } from "../../components/Button/Style";
import { ProfilePic } from "../../components/Image/Style";
import { InputBox } from "../../components/InputBox/Index";
import { PerfilInput } from "../../components/Input/PerfilInput/Index";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userDecodeToken } from "../../../Utils/Auth";
import api from "../../services/service"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ButtonCamera } from "./Style";
import { View } from "react-native";
import { Camera, useCameraPermissions } from "expo-camera";
import { CameraExpo } from "../../components/Camera/Camera";

import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";

export const Perfil = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [jti, setJti] = useState("");
  const [photo, setPhoto]= useState("");

  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraCapture, setCameraCapture] = useState(false);

  async function requestGaleria() {
    await MediaLibrary.requestPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  }

  async function logout() {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  }

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setName(token.name);
      setEmail(token.email);
      setJti(token.jti);
    }
  }

  useEffect(() => {
    profileLoad();
  }, []);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();

      const { status: mediaStatus } =
        await MediaLibrary.requestPermissionsAsync();
    })();
  }, []);
  useEffect(() => {
    requestGaleria();
  }, []);
  async function CapturePhoto() {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      setSalvarPhoto(photo.uri);

      setOpenModal(true);
    }
  }

  function ClearPhoto() {
    setSalvarPhoto(null);

    setOpenModal(false);
  }


  //funcao p alterar a imagem de usuario

  async function AlterarFotoPerfil(){

    const formData = new FormData();
    formData.append("Arquivo", {
      uri : cameraCapture ,
      name: `image.${ cameraCapture.split(".")[1] }`,
      type: `image/${ cameraCapture.split(".")[1]}`
    })

    await api.put(`/Usuario/AlterarFotoPerfil?id=${jti}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
    }).then (response => {
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(()=> {
      if(cameraCapture != null){
        AlterarFotoPerfil()
      }

  },[cameraCapture])


  async function UploadPhoto() {
    await MediaLibrary.createAssetAsync(salvarPhoto)
      .then(() => {
        alert("foto salva com sucesso");
      })
      .catch((error) => {
        console.log("nao foi possivel salvar a foto");
      });
  }
  return (
    <ScrollForm>
      <ContainerP>
        <ProfilePic
          source={{ uri: cameraCapture }}
          resizeMode="cover"
        >
          <ContainerLevantado>
            <TitleBlack>{name}</TitleBlack>
            <Subtitle>{email}</Subtitle>
          </ContainerLevantado>

          <ButtonCamera onPress={() => setShowCameraModal(true)}>
            <MaterialCommunityIcons
              name="camera-plus"

              size={24}
              color="#fbfbfb"
            />
          </ButtonCamera>
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

      <CameraExpo
        visible={showCameraModal}
        getMediaLibrary={true}
        setShowCameraModal={setShowCameraModal}
        setCameraCapture={setCameraCapture}
      />
    </ScrollForm>
  );
};
