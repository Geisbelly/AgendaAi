import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

const local_data = [
  {
    value: '1',
    lable: 'Confirmado',
    color: 'rgba(25, 255, 113, 0.1)',
    text: 'rgb(25, 255, 113)', // Cor do texto
    image: {
      uri: 'https://img.icons8.com/?size=90&id=59850&format=png&color=20C997',
    },
  },
  {
    value: '2',
    lable: 'Marcado',
    color: 'rgba(25, 140, 255, 0.1)',
    text: 'rgb(25, 140, 255)', // Cor do texto
    image: {
      uri: 'https://img.icons8.com/?size=90&id=84065&format=png&color=339AF0',
    },
  },
  {
    value: '3',
    lable: 'Cancelado',
    color: 'rgba(255, 40, 25, 0.1)',
    text: 'rgb(255, 40, 25)', // Cor do texto
    image: {
      uri: 'https://img.icons8.com/?size=100&id=63688&format=png&color=F44336',
    },
  },
  {
    value: '4',
    lable: 'Pendente',
    color: 'rgba(240, 255, 25, 0.1)',
    text: 'rgb(255, 232, 25)', // Cor do texto
    image: {
      uri: 'https://img.icons8.com/?size=90&id=ONiFkFMQosub&format=png&color=FCC419',
    },
  },
];

const local_data2 = [
  {
    value: '1',
    lable: 'Online',
    color: 'rgba(25, 255, 113, 0.1)',
    text: 'rgb(25, 255, 113)', // Cor do texto
    image: {
      uri: 'https://img.icons8.com/?size=80&id=g8ka3rcvneUX&format=png&color=20C997',
    },
  },
  {
    value: '2',
    lable: 'Presencial',
    color: 'rgba(25, 140, 255, 0.1)',
    text: 'rgb(25, 140, 255)', // Cor do texto
    image: {
      uri: 'https://img.icons8.com/?size=80&id=96RE9rrwGcm6&format=png&color=339AF0',
    },
  },
];

const SelectCountryScreen = (_props: any) => {
  const [country, setCountry] = useState(_props?.value || 'Marcado'); 
  const [modo, setModo] = useState('livre');
  const [width, setWidth] = useState(135);
  const [customData, setCustomData] = useState<any>([]);
  const [iconeWidth, setIconeWidth] = useState(20);
  const [iconeHeight, setIconeHeight] = useState(20);
  
  useEffect(() => {
    if (_props.value) {
      setCountry(_props.value);  // Sincronize com o valor externo, se disponível
    }
  }, [_props.value]);

  // Se o modo for 'livre', você pode passar os dados personalizados
  useEffect(() => {
    if (_props.modo === 'tipo') {
      setCountry('Online')
      setModo('tipo');
      setWidth(127)
      setIconeWidth(15)
      setIconeHeight(15)
    } else if (_props.modo === 'status') {
      setModo('status');
      setWidth(135)
    } else if (_props.modo === 'livre' && _props.customData) {
      // Se o modo for 'livre', usa os dados personalizados
      setCountry(_props.customData[0])
      setModo('livre');
      setWidth(_props.width)
      setCustomData(_props.customData);
      setIconeWidth(_props?.widthIcone)
      setIconeHeight(_props?.eightIcone)
    }
  }, [_props.modo, _props.customData, _props.width]);

  

  // Escolhe qual conjunto de dados usar com base no modo
  const data = modo === 'livre' ? customData : modo === 'tipo' ? local_data2 : local_data;

  // Atualiza a cor da barra de status ao selecionar o status
  useEffect(() => {
    const selectedItem = data.find((item:any) => item.lable === country);
    const statusBarColor = selectedItem ? selectedItem.color : 'rgba(25, 140, 255, 0.3)';
    StatusBar.setBarStyle('light-content');
    StatusBar.setBackgroundColor(statusBarColor);
  }, [country, data]);

  const selectedItem = data.find((item:any) => item.lable === country);
  const backgroundColor = selectedItem ? selectedItem.color : 'rgba(25, 140, 255, 0.3)';
  const textColor = selectedItem ? selectedItem.text : 'rgba(25, 140, 255)';

  return (
    <SelectCountry
      style={[styles.dropdown, { backgroundColor, width:width }]}
      iconColor={textColor}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={[styles.imageStyle, {width:iconeWidth, height:iconeHeight}]}
      iconStyle={styles.iconStyle }
      maxHeight={200}
      activeColor={backgroundColor}
      value={country}
      data={data}
      valueField="lable"
      labelField="lable"
      imageField="image"
      placeholder="Select option"
      searchPlaceholder="Search..."
      onChange={e => {
        setCountry(e.lable);
        _props.onChangeText(e.lable)
      }}
    />
  );
};

export default SelectCountryScreen;

const styles = StyleSheet.create({
  dropdown: {
    marginTop:0,
    marginBottom:14,
    marginRight:8,
    marginLeft:0,
    height: 34,
    width:13,
    maxWidth:'auto',
    borderRadius: 15,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 20,
    height: 20,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 2,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
