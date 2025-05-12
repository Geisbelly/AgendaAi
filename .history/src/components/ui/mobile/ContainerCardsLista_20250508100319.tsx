import React from 'react';
import { View, Text, FlatList } from 'react-native';
import ModalButton from '../../../components/ui/ButtonFigmaTeste';
import { styles } from '../../../style/style';
import CardList from '../../../components/ui/mobile/CardList';


const ConatinerCardsLista = ({ horario, appointments, setLista,selectedDate }: { horario: string, appointments: Any[], setLista:(date: any) => void, selectedDate:any }) => {
    return (
        <>
        <View style={styles.card}>
            <View style={styles.cardHorario}>
                <Text style={styles.time}>{horario}</Text>
            </View>
            <View style={styles.containerContainerCardList}>
                {appointments.map(appointment => (
                    <CardList  item={appointment} setLista={setLista} selectedDate={selectedDate}/>
                ))}
            </View>
        </View>
        </>
    );
};

export default ConatinerCardsLista;