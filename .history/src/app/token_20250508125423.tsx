import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { AuthService } from '@/backend/services/session';
import XanoApiAgenda from '@/backend/services/apis/agenda';

const TelaToken = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const route = useRouter();

  const handleVerificar = async () => {
    if (token.trim().length === 0) {
      setErro('Informe o token');
      setSucesso(false);
      return;
    }
    setLoading(true);
    setErro('');
    setSucesso(false);
    const dados = await XanoApiAgenda.getCalendarios(token)
    console.log(dados);
    
   
    setLoading(false);
    if (dados !== null) {
      setSucesso(true);
      AuthService.login(token)
      route.push('/u/listaAgendas')
    } else {
      setErro('Token inválido.');
    }

  };

  return (
    <View style={styles.container}>
      {/* Ícone acima do título */}
      <View style={styles.iconTopContainer}>
        <Ionicons name="lock-closed-outline" size={72} color="#198cff" />
      </View>

      <Text style={styles.titulo}>Verificação de Token</Text>
      <Text style={styles.subtitulo}>Insira o código enviado para seu e-mail</Text>

      <View style={styles.inputWrapper}>
        <MaterialIcons name="vpn-key" size={24} color="#198cff" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Ex: 123456"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
       
          value={token}
          onChangeText={setToken}
        />
      </View>

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
  iconTopContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    width: '100%',
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
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
    elevation: 2,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TelaToken;
