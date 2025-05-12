import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TelaToken = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  const handleVerificar = async () => {
    if (token.trim().length === 0) {
      setErro('Informe o token');
      setSucesso(false);
      return;
    }

    setLoading(true);
    setErro('');
    setSucesso(false);

    // Simulação de verificação
    setTimeout(() => {
      setLoading(false);
      if (token === '123456') {
        setSucesso(true);
      } else {
        setErro('Token inválido ou expirado.');
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="key-outline" size={60} color="#198cff" style={styles.icone} />
      <Text style={styles.titulo}>Verificação de Token</Text>
      <Text style={styles.subtitulo}>Insira o código enviado para seu e-mail</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 123456"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        maxLength={6}
        value={token}
        onChangeText={setToken}
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      {sucesso ? <Text style={styles.sucesso}>Token verificado com sucesso!</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={handleVerificar} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoTexto}>Verificar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6faff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icone: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  erro: {
    color: '#e74c3c',
    marginTop: 4,
    marginBottom: 8,
  },
  sucesso: {
    color: '#27ae60',
    marginTop: 4,
    marginBottom: 8,
  },
  botao: {
    backgroundColor: '#198cff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TelaToken;
