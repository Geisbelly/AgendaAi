import React, { useState } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {styles_form} from '@/style/style';
import ScheduleModal from '@/components/ui/FormAgendamento';

import "react-datepicker/dist/react-datepicker.css";

interface ModalButtonProps {
  buttonText: string;
  icone?: string; 
  cor?: string;  
  background?: string;  
}

const ModalButton = ({ buttonText, icone, cor, background }: ModalButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={styles_form.container}>
      <TouchableOpacity style={styles_form.openButton} onPress={toggleModal}>
        <Text style={styles_form.openButtonText}>{buttonText}</Text>
        {icone && <Ionicons name={icone as keyof typeof Ionicons.glyphMap} size={20} color={cor} />}
      </TouchableOpacity>
      <ScheduleModal visible={isVisible} onClose={toggleModal} />
    </View>
  );
};


export default ModalButton;
