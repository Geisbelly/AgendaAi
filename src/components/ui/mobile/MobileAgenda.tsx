import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import Listagem from './Listagem';
import CalendarioModos from './CalendarioModos';
import { styles } from '@/style/style';
import { getData } from '@/backend/cadastros/asyncStorage';
import Agendamento from '@/models/Agendamento';

const MobileAgenda = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const [lista, setLista] = useState<Agendamento[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<Agendamento[]>([]);
  const [filtList, setFiltList] = useState<Agendamento[]>([]);

  async function get ()  {
    const lis = await getData('@agendamentos');
    if (lis){
      setLista(lis);
    }
   
  };

  const init = useCallback(() => {
    
    const filtered = lista.map((app: Agendamento) => ({
      ...app,
      hora_criacao: app.hora_criacao || '00:00',
    }));
    setFilteredAppointments(filtered);

    setFiltList(
      filtered.filter(
        (app: Agendamento) =>
          moment.utc(app.dt_consulta).format('YYYY-MM-DD') === moment.utc(selectedDate).format('YYYY-MM-DD')
      )
    );
  
  }, [lista, selectedDate, setLista]);

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
