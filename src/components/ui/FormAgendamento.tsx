import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';

import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { styles_form } from '@/style/style';
import Agendamento from '@/models/Agendamento';

const ScheduleModal = ({ visible, onClose, item, Title }: { visible: boolean, onClose: () => void, item?: Agendamento, Title?:string }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (item) {
      setValue('cliente', item.cliente || '');
      setValue('tipo', item.tipo || '');
      setValue('horario', item.horario || '');
      setValue('profissional', item.profissional || '');
      setValue('color', item.color || '#000000'); 
      setData(item.dt_consulta ? new Date(item.dt_consulta) : new Date());
      setHora(item.horario ? moment(item.horario, 'HH:mm').toDate() : new Date());
    }
  }, [item, setValue]);

  const onSubmit = (formData: any) => {
    console.log({
      ...formData,
      dt_consulta: moment(data).format('YYYY-MM-DD'),
      horario: moment(hora).format('HH:mm'),
      dt_criacao: moment().format('YYYY-MM-DD'),
      hora_criacao: moment().format('HH:mm:ss'),
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
       <TouchableOpacity style={styles_form.modalBackground} activeOpacity={1} onPress={onClose} >
        <View style={styles_form.schedule} onStartShouldSetResponder={() => true}>
          <Text style={styles_form.title}>{Title ? Title : "Novo Agendamento"}</Text>

          <View style={styles_form.form}>
            <Text style={styles_form.label}>Cliente</Text>
            <Controller
              control={control}
              name="cliente"
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput style={styles_form.input} value={value} onChangeText={onChange} />
              )}
            />
            {errors.cliente && <Text style={styles_form.error}>Campo obrigatório</Text>}

            <Text style={styles_form.label}>Tipo</Text>
            <Controller
              control={control}
              name="tipo"
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput style={styles_form.input} value={value} onChangeText={onChange} />
              )}
            />
            {errors.tipo && <Text style={styles_form.error}>Campo obrigatório</Text>}

            <Text style={styles_form.label}>Profissional</Text>
            <Controller
              control={control}
              name="profissional"
              defaultValue=""
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextInput style={styles_form.input} value={value} onChangeText={onChange} />
              )}
            />
            {errors.profissional && <Text style={styles_form.error}>Campo obrigatório</Text>}

            <Text style={styles_form.label}>Cor</Text>
            <Controller
              control={control}
              name="color"
              defaultValue="#000000"
              render={({ field: { onChange, value } }) => (
                <TextInput style={styles_form.input} value={value} onChangeText={onChange} />
              )}
            />

            <Text style={styles_form.label}>Data da Consulta</Text>
            <View style={styles_form.dateTimeContainer}>
              <TouchableOpacity style={[styles_form.input, styles_form.dateInput]} onPress={() => setShowDatePicker(true)}>
                <Text style={styles_form.textDataHora}>{moment(data).format('DD/MM/YYYY')}</Text>
              </TouchableOpacity>
              
              {
                showDatePicker && (
                  <DateTimePicker
                    value={data}
                    mode="date"
                    display="default"
                    accentColor='#1E88E5'
                    onChange={(event, selectedDate) => {
                      setShowDatePicker(false);
                      if (selectedDate) setData(selectedDate);
                    }}
                  />
                
              )}
            </View>

            <Text style={styles_form.label}>Horário</Text>
            <View style={styles_form.dateTimeContainer}>
              <TouchableOpacity style={[styles_form.input, styles_form.timeInput]} onPress={() => setShowTimePicker(true)}>
                <Text style={styles_form.textDataHora}>{moment(hora).format('HH:mm')}</Text>
              </TouchableOpacity>

              { 
                showTimePicker && (
                  <DateTimePicker
                    value={hora}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                      setShowTimePicker(false);
                      if (selectedTime) setHora(selectedTime);
                    }}
                  />
                )
              }
            </View>

            <TouchableOpacity style={styles_form.button} onPress={handleSubmit(onSubmit)}>
              <Text style={styles_form.buttonText}>AGENDAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default ScheduleModal;
