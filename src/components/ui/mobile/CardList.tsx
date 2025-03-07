import React, {useState} from 'react';
import { View, Text,  TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {styles} from '../../../style/style';
import ScheduleModal from '../../../components/ui/FormAgendamento';
import Agendamento from '../../../models/Agendamento';

const CardList = ({item, setLista, selectedDate}: {item:Agendamento, setLista:(data: any)=>void, selectedDate:any}) => {
    const [isVisible, setIsVisible] = useState(false);
    
      const toggleModal = () => {
        setIsVisible(!isVisible);
      };
    

  return (
        <>
            <TouchableOpacity onPress={toggleModal} style={styles.card}>

                <View style={styles.cardContent}>
                    <Text style={styles.type}>{item.tipo}</Text>
                    <Text style={styles.plan}>{item.profissional}</Text>
                    <View style={styles.profile}>
                    <Image source={{ uri: `https://api.dicebear.com/6.x/avataaars/png?seed=${item.cliente}` }} style={styles.avatar} />
                    <Text style={styles.name}>{item.cliente}</Text>
                    <Ionicons name="checkmark-circle" size={18} color='rgba(165, 189, 212, 0.5)' />
                    </View>
                </View>
            </TouchableOpacity>
            <ScheduleModal visible={isVisible} onClose={toggleModal} item={item} Title='Editar Agendamento' setLista={setLista} selectedDate={selectedDate}/>
        </>

  );
};



export default CardList;
