import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ModalButton from '@/components/ui/ButtonFigmaTeste';
import { styles } from '@/style/style';
import CardList from '@/components/ui/mobile/CardList';
import Agendamento from '@/models/Agendamento';

const ConatinerCardsLista = ({ horario, appointments, setLista }: { horario: string, appointments: Agendamento[], setLista:(date: any) => void }) => {
    return (
        <>
        <View style={styles.card}>
            <View style={styles.cardHorario}>
                <Text style={styles.time}>{horario}</Text>
            </View>
            <View style={styles.containerContainerCardList}>
                {appointments.map(appointment => (
                    <CardList  item={appointment} setLista={setLista} />
                ))}
            </View>
        </View>
        </>
    );
};

export default ConatinerCardsLista;