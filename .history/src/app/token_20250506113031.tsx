import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styles } from '../../../style/style';
import { styles_form } from '../../../style/style';
import { Ionicons } from '@expo/vector-icons';

const TelaToken = ({ onTokenSubmit }: { onTokenSubmit: (token: string) => Promise<void> }) => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handlePress = async () => {
    if (token.trim().length === 0) {
      setErro('Informe o código');
      return;
    }
    setErro('');
    setLoading(true);
    try {
      await onTokenSubmit(token);
    } catch (e) {
      setErro('Token inválido ou expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles_form.container}>
      <Ionicons name="key-outline" size={50} color="rgba(25, 140, 255, 0.4)" />
      <Text style={styles.title}>Verificação de Código</Text>

      <TextInput
        style={styles_form.input}
        placeholder="Digite o token recebido"
        placeholderTextColor="#999"
        value={token}
        onChangeText={setToken}
        keyboardType="numeric"
        maxLength={6}
      />

      {erro ? <Text style={styles_form.errorText}>{erro}</Text> : null}

      <TouchableOpacity style={styles_form.button} onPress={handlePress} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles_form.buttonText}>Verificar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default TelaToken;
