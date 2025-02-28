import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ModalButton from '@/components/ui/ButtonFigmaTeste';
import { styles } from '@/style/style';
import ConatinerCardsLista from '@/components/ui/mobile/ContainerCardsLista';
import Agendamento from '@/models/Agendamento';

const Listagem = ({ selectedDate, filteredAppointment }: { selectedDate: string, filteredAppointment: Agendamento[] }) => {
    const groupedAppointments = filteredAppointment.reduce((acc, appointment) => {
        if (!acc[appointment.horario]) {
            acc[appointment.horario] = [];
        }
        acc[appointment.horario].push(appointment);
        return acc;
    }, {} as Record<string, Agendamento[]>);

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
                    <ModalButton buttonText="Agendar" icone="add" cor="#fff" />
                </View>
            </View>
            <FlatList
                data={sortedAppointments}
                keyExtractor={([time]) => time}
                extraData={selectedDate}
                style={styles.list}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: [horario, appointments] }) => (
                    <ConatinerCardsLista key={horario} horario={horario} appointments={appointments} />
                )}
            />
        </View>
    );
};

export default Listagem;