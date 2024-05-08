import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollForm } from "../../components/ScrollForm/Style";
import {
  ContainerLabel,
  ContainerLevantado,
  ContainerP,
  ContainerPic,
  Separator,
} from "../../components/Container/Style";
import { ProfilePic } from "../../components/Image/Style";
import { InputBox } from "../../components/InputBox/Index";
import { InputLabelE } from "../../components/Label/Style";
import {
  Subtitle,
  TextBtnCamera,
  TextCancel,
  TitleBlack,
  TxtPic,
} from "../../components/Title/Style";
import { BtnCamera, BtnCameraText } from "../../components/Button/Style";
import { BtnCard, BtnSubText } from "../../components/Modals/ModalCard/Style";
import { PerfilInput } from "../../components/Input/PerfilInput/Index";
import { Image } from "react-native";

//import para funcionalidade da camera
import { Camera, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import BtnPhoto from "../../components/BtnPhoto/BtnPhoto";
import { CameraExpo } from "../../components/Camera/Camera";
import { format, differenceInYears } from "date-fns";

import { userDecodeToken } from "../../../Utils/Auth";
import api from "../../services/service";

export const Prescricao = ({
  navigation,
  medico,
  especialidade,
  crm,
  route,
}) => {
  const cameraRef = useRef(null);
  const [tipoCamera, setTipoCamera] = useState(CameraType.front);
  const [openModal, setOpenModal] = useState(false);
  const [salvarPhoto, setSalvarPhoto] = useState(null);

  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraCapture, setCameraCapture] = useState(null);

  const [dateOfBirth, setDateOfBirth] = useState(null);

  //use state para trazer o nome direto da api
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [descricaoExame, setDescricaoExame] = useState("");

  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  async function BuscarProntuario() {
    await api
      .get(`/Consultas/BuscarPorId?id=${route.params.consultaId}`)
      .then((response) => {
        setConsultaSelecionada(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
      BuscarProntuario();
  }, []);

  async function profileLoad() {
    const token = await userDecodeToken();

    if (token) {
      setName(token.name);
      setEmail(token.email);
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

  async function UploadPhoto() {
    await MediaLibrary.createAssetAsync(salvarPhoto)
      .then(() => {
        alert("foto salva com sucesso");
      })
      .catch((error) => {
        console.log("nao foi possivel salvar a foto");
      });
  }

  const calculateAge = (dateOfBirth) => {
    return differenceInYears(new Date(), new Date(dateOfBirth));
  };

  async function InserirExame() {
    setLoad(true);

    const formData = new FormData();
    formData.append("ConsultaId", { jti });
    formData.append("Imagem", {
      uri: cameraCapture,
      type: `image/${cameraCapture.split(".").pop()}`,
      name: `image.${cameraCapture.split(".").pop()}`,
    });

    await api
      .post(`/Exame/Cadastrar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDescricaoExame(setDescricaoExame + "\n" + response.data.descricao);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <ScrollForm>
      <ContainerP>
        {consultaSelecionada != null ? (
          <>
            <ProfilePic
              source={require("../../../src/assets/img/ImagePrescricao.png")}
              resizeMode="cover"
            >
              <ContainerLevantado>
                <TitleBlack>{name}</TitleBlack>

                <Subtitle>
                  {calculateAge(dateOfBirth) + " anos de idade"}
                </Subtitle>
                <Subtitle>{email}</Subtitle>
              </ContainerLevantado>
            </ProfilePic>

            <PerfilInput
              inputLabel="Descrição da consulta"
              inputPlaceholder={consultaSelecionada.descricao}
              containerWidth="90%"
            />
            <PerfilInput
              inputLabel="Diagnóstico do paciente"
              inputPlaceholder={consultaSelecionada.diagnostico}
              containerWidth="90%"
            />
            <PerfilInput
              inputLabel="Prescrição médica"
              inputPlaceholder={consultaSelecionada.receita.medicamento}
              containerWidth="90%"
            />

            <InputLabelE>Exames médicos</InputLabelE>

            <ContainerPic>
              {cameraCapture == null ? (
                <>
                  <MaterialCommunityIcons
                    name="file-alert-outline"
                    size={24}
                    color="#4E4B59"
                  />
                  <TxtPic>Nenhuma foto informada</TxtPic>
                </>
              ) : (
                <>
                  <Image
                    style={{ width: "100%", height: 120, borderRadius: 5 }}
                    source={{ uri: cameraCapture }}
                  />
                </>
              )}
            </ContainerPic>

            <ContainerLabel>
              <BtnCamera onPress={() => setShowCameraModal(true)}>
                <TextBtnCamera>
                  <MaterialCommunityIcons
                    name="camera-plus-outline"
                    size={24}
                    color="white"
                  />
                </TextBtnCamera>
                <TextBtnCamera>enviar</TextBtnCamera>
              </BtnCamera>
              <TextCancel onPress={() => setCameraCapture(null)}>
                Cancelar
              </TextCancel>
            </ContainerLabel>

            <Separator></Separator>

            <InputBox
              maxLength={100}
              editable={true}
              fieldWidth={80}
              multiline={true}
              numberOfLines={2}
              customHeight={103}
              customP={25}
            />

            <BtnCard onPress={() => navigation.navigate("Main")}>
              <BtnSubText>Voltar</BtnSubText>
            </BtnCard>

            <CameraExpo
              visible={showCameraModal}
              setShowCameraModal={setShowCameraModal}
              setCameraCapture={setCameraCapture}
            />
          </>
        ) : (
          <></>
        )}
      </ContainerP>
    </ScrollForm>
  );
};
