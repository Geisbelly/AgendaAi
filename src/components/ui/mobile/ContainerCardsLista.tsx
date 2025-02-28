import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ModalButton from '@/components/ui/ButtonFigmaTeste';
import { styles } from '@/style/style';
import CardList from '@/components/ui/mobile/CardList';
import Agendamento from '@/models/Agendamento';

const ConatinerCardsLista = ({ horario, appointments }: { horario: string, appointments: Agendamento[] }) => {
    return (
        <>
        <View style={styles.card}>
            <View style={styles.cardHorario}>
                <Text style={styles.time}>{horario}</Text>
            </View>
            <View style={styles.containerContainerCardList}>
                {appointments.map(appointment => (
                    <CardList key={appointment.id} {...appointment} />
                ))}
            </View>
        </View>
        </>
    );
};

export default ConatinerCardsLista;