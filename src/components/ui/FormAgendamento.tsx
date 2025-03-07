import React, { useState, useEffect, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { styles_form } from '../../style/style';
import Agendamento from '../../models/Agendamento';
import  SelectCountryScreen  from './Combobox';
import { getData, saveData, updateData, editData } from '../../backend/cadastros/asyncStorage';


const ScheduleModal = ({ visible, onClose, item, Title, setLista, selectedDate }: { visible: boolean, onClose: () => void, item?: Agendamento, Title?: string, setLista: (date: string | false | any[]) => void, selectedDate:any }) => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm();
  const [data, setData] = useState(new Date());
  const [hora, setHora] = useState(new Date());  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (item) {
      setValue('cliente', item.cliente || '');
      setValue('tipo', item.tipo || '');
      setValue('horario', item.horario || '');
      setValue('profissional', item.profissional || '');
      setValue('color', item.color || '#000000');
      setId(item.id);
      setValue('id', item.id);
      setValue('status', item.status);
      setValue('dt_consulta', item.dt_consulta || '');
      setData(item.dt_consulta ? new Date(item.dt_consulta).setDate(new Date(item.dt_consulta).getDate() + 1): selectedDate );
      setHora(item.horario ? moment(item.horario, 'HH:mm').toDate() : new Date());
    }
  }, [item, setValue]);

  const onSubmit = useCallback(async (formData: any) => {
    const body = {
      id: id ?? undefined,
      cliente: formData.cliente,
      profissional: formData.profissional,
      tipo: formData.tipo,
      color: formData.color,
      dt_consulta: moment(data).format('YYYY-MM-DD'),
      horario: moment(hora).format('HH:mm'),
      dt_criacao: moment().format('YYYY-MM-DD'),
      hora_criacao: moment().format('HH:mm:ss'),
      status: formData.status,
    };


    if (id !== null) {
      const value = await editData('@agendamentos', id, body);
      setLista(value);
    } else {
      const existingData = await getData('@agendamentos');
      const value = existingData ? await updateData('@agendamentos', body) : await saveData('@agendamentos', body);
      setLista(value);
    }

    setValue('cliente',   '');
      setValue('tipo', '');
      setValue('horario', '');
      setValue('profissional', '');
      setValue('color', '#000000');
      setId(0);
      setValue('id', '');
      setValue('status', '');
      setData( selectedDate);
      setHora( new Date());

   
    onClose();
  }, [id, data, hora, setLista, onClose, setValue]);

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <TouchableOpacity style={styles_form.modalBackground} activeOpacity={1} onPress={onClose}>
        <View style={styles_form.schedule} onStartShouldSetResponder={() => true}>
          <Text style={styles_form.title}>{Title ?? "Novo Agendamento"}</Text>

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

            <View style={styles_form.labelow}>
              <View>
                <Text style={styles_form.label}>Tipo</Text>
                <Controller
              control={control}
              name="tipo"
              defaultValue="Marcado"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <SelectCountryScreen modo={'tipo'} value={value} onChangeText={onChange}/>
              )}
            />
               
                
              </View>
              <View>
                <Text style={styles_form.label}>Status</Text>
                <Controller
                control={control}
                name="status"
                defaultValue="Online"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                <SelectCountryScreen modo={'status'} value={value} onChangeText={onChange}/>
                )}
              />
               
              </View>
           </View>
           {errors.tipo && <Text style={styles_form.error}>Campo obrigatório</Text>}
           {errors.status && <Text style={styles_form.error}>Campo obrigatório</Text>}
           

            <Text style={styles_form.label}>Data da Consulta</Text>
            <View style={styles_form.dateTimeContainer}>
              <TouchableOpacity style={[styles_form.input, styles_form.dateInput]} onPress={() => setShowDatePicker(true)}>
                <Text style={styles_form.textDataHora}>{moment(data).format('DD/MM/YYYY')}</Text>
              </TouchableOpacity>
              
              {showDatePicker && (
                <DateTimePicker
                  value={new Date(data)}
                  mode="date"
                  display="default"
                  accentColor='#1E88E5'
                  onChange={(event, selectedD) => {
                    setShowDatePicker(false);
                    if (selectedD) setData(selectedD);
                  }}
                />
              )}
            </View>

            <Text style={styles_form.label}>Horário</Text>
            <View style={styles_form.dateTimeContainer}>
              <TouchableOpacity style={[styles_form.input, styles_form.timeInput]} onPress={() => setShowTimePicker(true)}>
                <Text style={styles_form.textDataHora}>{moment(hora).format('HH:mm')}</Text>
              </TouchableOpacity>

              {showTimePicker && (
                <DateTimePicker
                  value={hora}
                  mode="time"
                  display="default"
                  onChange={(event, selectedTime) => {
                    setShowTimePicker(false);
                    if (selectedTime) setHora(selectedTime);
                  }}
                />
              )}
            </View>
            <Text style={styles_form.label}>Cor</Text>
            <Controller
              control={control}
              name="color"
              defaultValue="#000000"
              render={({ field: { onChange, value } }) => (
                <TextInput style={styles_form.input} value={value} onChangeText={onChange} />
              )}
            />

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
