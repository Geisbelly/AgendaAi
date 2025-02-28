import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {styles} from '@/style/style';
import ModoMes from './ModoMes';
import ModoSemana from './ModoSemana';
import Agendamento from '@/models/Agendamento';
import ToggleButton from '../ButtonModosViewAgenda';

const CalendarioModos = ({ selectedDate, setSelectedDate, filteredAppointment }:{selectedDate:string, setSelectedDate: (date: string) => void, filteredAppointment:Agendamento[] }) => {

  const [viewMode, setViewMode] = useState('month');

  return (
    <>
      <View style={styles.top}>
        <Text style={styles.title}>Agenda</Text>
        {/* <View style={styles.containeButtonsCalendario}>
          <TouchableOpacity onPress={() => setViewMode(viewMode === 'month' ? 'week' : 'month')}>
            <Ionicons name={viewMode === 'month' ? "calendar-outline" : "calendar"} size={30} color="#1E88E5" />
          </TouchableOpacity>
        </View> */}
       <ToggleButton selected={viewMode} onChange={(value) => setViewMode(value)} />
      </View>

      <View style={[
        styles.calendarContainer,
        viewMode === 'week' ? styles.weekCalendar : styles.monthCalendar
      ]}>
        {viewMode === 'month' ? (
         <ModoMes selectedDate={selectedDate} setSelectedDate={setSelectedDate} filteredAppointment={filteredAppointment} />
        ) : (
         <ModoSemana selectedDate={selectedDate} setSelectedDate={setSelectedDate} filteredAppointment={filteredAppointment}/>
        )}
      </View>

     
    </>
  );
};


export default CalendarioModos;
