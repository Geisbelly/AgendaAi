import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import Listagem from './Listagem';
import CalendarioModos from './CalendarioModos';
import { styles } from '../../../style/style';
import { getData } from '../../../backend/cadastros/asyncStorage';

const MobileAgenda = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [lista, setLista] = useState<any[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<any[]>([]);
  const [filtList, setFiltList] = useState<any[]>([]);

  async function get() {
    const lis = await getData('@agendamentos');
    if (Array.isArray(lis)) {
      
      setLista(lis);  // Armazena como instâncias de Agendamento
    }
  }

  const init = useCallback(() => {
    // Certifique-se de que estamos mapeando corretamente as instâncias de Agendamento
    const filtered = lista.map((app: any) => ({
      ...app,
      hora_criacao: app.hora_criacao,
    }));

    setFilteredAppointments(filtered);

    setFiltList(
      filtered.filter(
        (app: any) => moment.utc(app.dt_consulta).format('YYYY-MM-DD') === moment.utc(selectedDate).format('YYYY-MM-DD')
      )
    );
  }, [lista, selectedDate]);

  useEffect(() => {
    get();
    init();
  }, []);

  useEffect(() => {
    init();
  }, [init]);

  return (
    <View style={styles.container}>
      <CalendarioModos selectedDate={selectedDate} setSelectedDate={setSelectedDate} filteredAppointment={filteredAppointments} />
      <Listagem selectedDate={selectedDate} filteredAppointment={filtList} setLista={setLista} />
    </View>
  );
};

export default MobileAgenda;
