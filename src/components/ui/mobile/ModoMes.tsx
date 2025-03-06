import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { styles } from '@/style/style';
import moment from 'moment';
import 'moment/locale/pt-br';
import Agendamento from '@/models/Agendamento';
import MonthPicker from 'react-native-month-year-picker';

moment.locale('pt-br');

interface MyObject {
  [key: string]: any;
}

const ModoMes = ({ selectedDate, setSelectedDate, filteredAppointment }: { selectedDate: string; setSelectedDate: (date: string) => void, filteredAppointment: Agendamento[] }) => {
  const [currentWeek, setCurrentWeek] = useState(moment(selectedDate));
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Filtrando os agendamentos para o mês atual
    const agendamentos = filteredAppointment.filter(agendamento =>
      moment(agendamento.dt_consulta).isSameOrAfter(moment(currentWeek).startOf('month')) &&
      moment(agendamento.dt_consulta).isBefore(moment(currentWeek).endOf('month'))
    );

    // Agrupar os agendamentos pelas cores
    const newMarkedDates = agendamentos.reduce((acc: MyObject, agendamento) => {
      const date = moment.utc(agendamento.dt_consulta).format('YYYY-MM-DD'); // Usando o formato 'YYYY-MM-DD'
      const dot = { key: agendamento.profissional, color: agendamento.color };

      if (!acc[date]) {
        acc[date] = { marked: true, dots: [] };
      }

      // Adicionar a bolinha apenas se a cor ainda não tiver sido adicionada
      const existingDot = acc[date].dots.some((dotItem: any) => dotItem.color === agendamento.color);
      if (!existingDot) {
        acc[date].dots.push(dot); // Adiciona a bolinha única por cor
      }

      return acc;
    }, {});

    // Marcar o dia selecionado com cor diferente
    newMarkedDates[selectedDate] = {
      selected: true,
      selectedColor: '#1E88E5',
      marked: true,
      dots: (newMarkedDates[selectedDate]?.dots || [])
    };

    setMarkedDates(newMarkedDates);
  }, [currentWeek, selectedDate, filteredAppointment]);

  const handleDayPress = (day: any) => setSelectedDate(day.dateString);

  const handleMonthChange = (month: any) => {
    setCurrentWeek(moment({ year: month.year, month: month.month - 1, day: 1 }));
  };

  return (
    <>
      <Calendar
        key={currentWeek.format('YYYY-MM')}
        current={currentWeek.format('YYYY-MM-DD')}
        onDayPress={handleDayPress}
        onMonthChange={handleMonthChange}
        hideArrows={false}
        markingType={'multi-dot'}
        markedDates={markedDates} // Passando a estrutura corretamente
        renderHeader={(date: Date) => (
          <View>
            <View style={styles.heardCalendario}>
              <TouchableOpacity onPress={() => setShow(true)} style={styles.containeTextCalendario}>
                <Text style={styles.monthSelector}>
                  {moment(currentWeek).format('MMMM [de] YYYY').replace(/^\w/, (c) => c.toUpperCase())}
                </Text>
              </TouchableOpacity>
              {show && (
                <MonthPicker
                  onChange={(event, newDate) => {
                    setShow(false);
                    setCurrentWeek(moment(newDate));
                  }}
                  value={currentWeek.toDate()}
                  cancelButton='Cancelar'
                  okButton='Confirmar'
                  autoTheme={false}
                  mode='short'
                />
              )}
            </View>
          </View>
        )}
        theme={{
          selectedDayBackgroundColor: '#1E88E5',
          arrowColor: '#1E88E5',
          todayTextColor: 'rgb(104, 191, 241)',
          textDayHeaderFontSize: 14,
          textDayHeaderFontWeight: 'bold',
          textSectionTitleColor: '#1E88E5',
          textSectionTitleDisabledColor: '#A8C0DE',
          dayTextColor: '#025AC0',
        }}
      />
    </>
  );
};

export default ModoMes;
