import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ModalButton from '../../../components/ui/ButtonFigmaTeste';
import { styles } from '../../../style/style';
import ConatinerCardsLista from '../../../components/ui/mobile/ContainerCardsLista';
import { Ionicons } from '@expo/vector-icons';
import {styles_form} from '../../../style/style';

const Listagem = ({ selectedDate, filteredAppointment, setLista }: { selectedDate: string, filteredAppointment: any[], setLista: (date:  any) => void }) => {
    const groupedAppointments = filteredAppointment.reduce((acc, appointment) => {
        if (!acc[appointment.horario]) {
            acc[appointment.horario] = [];
        }
        acc[appointment.horario].push(appointment);
        return acc;
    }, {} as Record<string, any[]>);

    const sortedAppointments = Object.entries(groupedAppointments)
        .sort(([timeA], [timeB]) => {
            const dateA = new Date(`1970-01-01T${timeA}:00Z`).getTime();
            const dateB = new Date(`1970-01-01T${timeB}:00Z`).getTime();
            return dateA - dateB;
        });

    return (
        <View style={styles.appointmentsContainer}>
            <View style={styles.top}>
                <Text style={styles.title}>Agendamentos</Text>
                <View style={styles.containeButtonsCalendario}>
                    <ModalButton buttonText="Agendar" icone="add" cor="#fff" setLista={setLista} selectedDate={selectedDate} />
                </View>
            </View>
            { sortedAppointments.length>0 ?
           ( <FlatList
                data={sortedAppointments}
                keyExtractor={([time]) => time}
                extraData={selectedDate}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: [horario, appointments] }) => (
                    <ConatinerCardsLista key={horario} horario={horario} appointments={appointments as any} setLista={setLista} selectedDate={selectedDate} />
                )}
            />):(
                <View style={styles_form.container}>
      <Ionicons name="calendar" size={50} color="rgba(25, 140, 255, 0.3)" />
      <Text style={styles_form.noAppointmentsText}>Nenhum agendamento</Text>
    </View>
            )}
        </View>
    );
};



export default Listagem;