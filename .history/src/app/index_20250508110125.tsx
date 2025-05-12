import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const TelaInicial = () => {
  const navigation = useRouter();

  const handleEntrar = () => {
    navigation.replace('/token');
  };

  return (
    <View style={styles.container}>
      {/* Vetor ilustrativo de agenda */}
      {/* <Image
        source={require('../assets/agenda.png')} // coloque um vetor fofo em assets/agenda.png
        style={styles.imagem}
        resizeMode="contain"
      /> */}

      <Text style={styles.titulo}>Bem-vinda ao Agenda+ </Text>
      <Text style={styles.subtitulo}>Sua organização mais charmosa começa aqui!</Text>

      <TouchableOpacity style={styles.botao} onPress={handleEntrar}>
        <Ionicons name="log-in-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf7ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  imagem: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5a2ea6',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#8e44ad',
    textAlign: 'center',
    marginBottom: 40,
  },
  botao: {
    flexDirection: 'row',
    backgroundColor: '#9b59b6',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
    elevation: 3,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaInicial;
