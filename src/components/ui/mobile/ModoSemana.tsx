import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LocaleConfig from '../../../../assets/static/configuracoes';
import { styles } from '@/style/style';
import moment from 'moment';
import 'moment/locale/pt-br';
import Agendamento from '@/models/Agendamento';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Importação condicional de MonthPicker


moment.locale('pt-br');

const ModoSemana = ({ selectedDate, setSelectedDate, filteredAppointment }: { selectedDate: string; setSelectedDate: (date: string) => void, filteredAppointment: Agendamento[] }) => {
  const [currentWeek, setCurrentWeek] = useState(moment(selectedDate));
  const [scheduledDays, setScheduledDays] = useState<{ [key: string]: number }>({}); 
  const [show, setShow] = useState(false);

  useEffect(() => {
    const agendamentos = filteredAppointment.filter(agendamento =>
      moment(agendamento.dt_consulta).isSameOrAfter(moment(currentWeek).startOf('isoWeek')) &&
      moment(agendamento.dt_consulta).isBefore(moment(currentWeek).endOf('isoWeek'))
    );

    const countAgendamentos = agendamentos.reduce((acc, agendamento) => {
      const date = moment.utc(agendamento.dt_consulta).format('YYYY-MM-DD'); // Garantir o formato correto
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    setScheduledDays(countAgendamentos);
  }, [currentWeek, filteredAppointment]);  

  const getCurrentWeek = () => {
    const startOfWeek = moment(currentWeek).startOf('isoWeek');
    return Array.from({ length: 7 }, (_, i) => ({
      dateString: startOfWeek.clone().add(i, 'days').format('YYYY-MM-DD'),
      day: startOfWeek.clone().add(i, 'days').date(),
    }));
  };

  const handleWeekNavigation = (direction: any) => {
    setCurrentWeek(prev => moment(prev).add(direction, 'weeks'));
  };

  return (
    <>
      <View style={styles.weekView}>
        <View>
          <View style={styles.heardCalendario}>
            <TouchableOpacity onPress={() => setShow(true)} style={styles.containeTextCalendario}>
              <Text style={styles.monthSelector}>
                {moment(currentWeek).format('MMMM [de] YYYY').replace(/^\w/, (c) => c.toUpperCase())}
              </Text>
              
            </TouchableOpacity>
            {show && (
              <DatePicker
              onChange={(newDate: Date | null) => {
                console.log(newDate);
                setShow(false);
                setCurrentWeek(moment.utc(newDate));
                
              }}
             
              value={currentWeek.toDate().toUTCString()}
              customInput={<button onClick={() => setShow(false)}>Cancelar</button>}
        
  
       
              />
            )}

          </View>
        </View>
        <View style={styles.weekNavigation}>
          <TouchableOpacity onPress={() => handleWeekNavigation(-1)}>
            <Ionicons name="chevron-back" size={24} color="#A8C0DE" />
          </TouchableOpacity>
          <FlatList
            horizontal
            data={getCurrentWeek()}
            keyExtractor={(item) => item.dateString}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.weekDay, item.dateString === selectedDate && styles.selectedDay]}
                onPress={() => setSelectedDate(item.dateString)}
              >
                <View style={styles.dayContainer}>
                  <Text style={[styles.weekDayName, item.dateString === selectedDate && styles.selectedDayText]}>
                    {LocaleConfig.locales['pt-br'].dayNamesShort[moment(item.dateString).isoWeekday() % 7]}
                  </Text>
                  <Text style={[styles.weekDayText, item.dateString === selectedDate && styles.selectedDayText]}>
                    {item.day}
                  </Text>
                  {scheduledDays[item.dateString] && (
                    <View style={[styles.scheduledDot, item.dateString === selectedDate && styles.scheduledDotSelect]}>
                      <Text style={[styles.scheduledDotText, item.dateString === selectedDate && styles.scheduledDotTextSelect]}>
                        {scheduledDays[item.dateString]}
                      </Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.weekList}
            showsHorizontalScrollIndicator={false}
          />
          <TouchableOpacity onPress={() => handleWeekNavigation(1)}>
            <Ionicons name="chevron-forward" size={24} color="#A8C0DE" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ModoSemana;
