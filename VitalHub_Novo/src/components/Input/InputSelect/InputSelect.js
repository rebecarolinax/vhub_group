import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { useEffect, useState } from "react";

// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
// import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

const InputSelect = ({ setHoraSelecionada, horaSelecionada }) => {
  const dataAtual = moment().format("YYYY-MM-DD");
  const [arrayOptions, setArrayOptions] = useState(null);

  async function loadOptions() {
    //capturar a quantidade de horas q faltam p meia noite
    const horasRestantes = moment(dataAtual)
      .add(24, "hours")
      .diff(moment(), "hours");

    //criar um laco q rode exatamente a qnt de hrs q faltam
    const options = Array.from({ length: horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + (index + 1);

      return {
        label: `${valor}:00`,
        value: `${valor}:00`,
      };
    });
    setArrayOptions(options);
    //p cada hora q falta, cria uma nova options
  }

  useEffect(() => {
    loadOptions();
  }, []);

  return (
    <View style={{ width: 316 }}>
      {arrayOptions ? (
        <RNPickerSelect
          style={style}
          Icon={() => {
            return (
              <MaterialIcons
                name="keyboard-arrow-down"
                size={22}
                color="#34898F"
              />
            );
            //   return <FontAwesomeIcon icon={faCaretDown} color='#34898F' size={22}/>
          }}
          placeholder={{
            label: "Selecione um valor",
            value: null,
            color: "#34898F",
          }}
          onValueChange={(value) => setHoraSelecionada(value)}
          items={
            arrayOptions
          }
        />
      ) : (
        <></>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#60BFC5",
    borderRadius: 5,
    color: "#34898F",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "MontserratAlternates_600SemiBold",
  },
  inputAndroid: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#60BFC5",
    borderRadius: 5,
    color: "#34898F",
    alignItems: "center",
    justifyContent: "center",

    fontFamily: "MontserratAlternates_600SemiBold",
  },
  iconContainer: {
    top: "25%",
    marginRight: 10,
  },
  placeholder: {
    color: "#34898F",
  },
});

export default InputSelect;
