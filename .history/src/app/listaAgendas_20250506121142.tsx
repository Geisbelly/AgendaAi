import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const agendasDisponiveis = [
  'Agenda Clínica',
  'Agenda Vacinação',
  'Agenda Parto',
  'Agenda Inseminação',
  'Agenda Consultoria',
];

const TelaSelecaoAgendas = ({ onConfirm }: { onConfirm?: (agendasSelecionadas: string[]) => void }) => {
  const [selecionadas, setSelecionadas] = useState<string[]>([]);

  const alternarAgenda = (nome: string) => {
    setSelecionadas(prev =>
      prev.includes(nome)
        ? prev.filter(item => item !== nome)
        : [...prev, nome]
    );
  };

  const handleConfirmar = () => {
    if (onConfirm) onConfirm(selecionadas);
    console.log('Selecionadas:', selecionadas);
  };

  const renderItem = ({ item }: { item: string }) => {
    const selecionada = selecionadas.includes(item);
    return (
      <TouchableOpacity style={styles.item} onPress={() => alternarAgenda(item)}>
        <Ionicons
          name={selecionada ? 'checkbox' : 'square-outline'}
          size={24}
          color={selecionada ? '#198cff' : '#999'}
        />
        <Text style={styles.itemTexto}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecione as Agendas</Text>
      <FlatList
        data={agendasDisponiveis}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
      <TouchableOpacity style={styles.botao} onPress={handleConfirmar}>
        <Text style={styles.botaoTexto}>Confirmar Seleção</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6faff',
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  lista: {
    paddingBottom: 40,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  itemTexto: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    backgroundColor: '#198cff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaSelecaoAgendas;
