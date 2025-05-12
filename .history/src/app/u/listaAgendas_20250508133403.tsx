import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendario } from '@/models/Calendario';
import { AuthService } from '@/backend/services/session';

interface Props {
  onConfirmar: (selecionadas: string[]) => void;
}

const TelaSelecaoAgendas: React.FC<Props> = ({
  onConfirmar,
}) => {
  const [selecionadas, setSelecionadas] = useState<string[]>([]);
  const [agendasDisponiveis, setAgendaDisponivel] = useState<Calendario[]>([]);

  useEffect(()=>{
    AuthService.getTemporariAgenda().then((agendas: Calendario[]) => {
      setAgendaDisponivel(agendas);
    });
  },[])

  const toggleAgenda = (id: string) => {
    setSelecionadas(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: { id: string; nome: string } }) => {
    const marcado = selecionadas.includes(item.id);
    return (
      <TouchableOpacity style={styles.card} onPress={() => toggleAgenda(item.id)}>
        <Ionicons
          name={marcado ? 'checkbox' : 'square-outline'}
          size={24}
          color={marcado ? '#198cff' : '#aaa'}
        />
        <Text style={styles.cardTexto}>{item.nome}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <MaterialCommunityIcons name="calendar-multiselect" size={42} color="#198cff" />
        <Text style={styles.titulo}>Selecione as Agendas</Text>
        <Text style={styles.subtitulo}>Você pode escolher mais de uma opção</Text>
      </View>

      <FlatList
        data={agendasDisponiveis.map(agenda => ({ id: agenda.id, nome: agenda.nome || 'Sem Nome' }))}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={[styles.botao, selecionadas.length === 0 && styles.botaoDesativado]}
        onPress={() => onConfirmar(selecionadas)}
        disabled={selecionadas.length === 0}
      >
        <Text style={styles.botaoTexto}>Confirmar Seleção</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f9ff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  topo: {
    alignItems: 'center',
    marginBottom: 25,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '600',
    color: '#222',
    marginTop: 10,
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  lista: {
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTexto: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  botao: {
    backgroundColor: '#198cff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  botaoDesativado: {
    backgroundColor: '#a0cfff',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TelaSelecaoAgendas;
