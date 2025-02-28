import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import moment from 'moment';
import Listagem from './Listagem';
import CalendarioModos from './CalendarioModos';
import { styles } from '@/style/style';
import agendamentos_lista from '../../../../assets/static/agendamentoExemplo';

const MobileAgenda = () => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  const filteredAppointments = agendamentos_lista
    .map(app => ({
      ...app,
      hora_criacao: app.hora_criacao || '00:00',
    }));
  
  const filtList = filteredAppointments.filter(app => moment.utc(app.dt_consulta).format('YYYY-MM-DD') === moment.utc(selectedDate).format('YYYY-MM-DD'))

  useEffect(() => {
    
  }, [agendamentos_lista]);

  return (
    <View style={styles.container}>
      <CalendarioModos selectedDate={selectedDate} setSelectedDate={setSelectedDate} filteredAppointment={filteredAppointments} />
      <Listagem selectedDate={selectedDate} filteredAppointment={filtList} />
    </View>
  );
};

export default MobileAgenda;
