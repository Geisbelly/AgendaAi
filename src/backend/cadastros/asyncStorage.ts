import Agendamento from '@/models/Agendamento';
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveData = async (chave: string, novoValor: any) => {
    try {
      await AsyncStorage.setItem(chave, JSON.stringify([novoValor]));
      
      const savedValue = await AsyncStorage.getItem(chave);
      if (savedValue) {
        console.log('Salvo com sucesso!');
        return savedValue;
      } else {
        console.error('Falha ao salvar.');
        return false;
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      return false;
    }
  };
  

  const getData = async (chave: string) => {
    try {
      const data = await AsyncStorage.getItem(chave);
      
      if (data) {
        console.log(data)
        return JSON.parse(data); 
      }
      return null; 
    } catch (error) {
      console.error('Erro ao obter dados:', error);
      return null;
    }
  };
  
const removeData = async (chave: string) => {
  try {
    await AsyncStorage.removeItem(chave);
    const value = await AsyncStorage.getItem(chave);
    if (value === null) {
      console.log('Removido com sucesso!');
      return true;
    } else {
      console.error('Falha ao remover.');
      return false;
    }
  } catch (error) {
    console.error('Erro ao remover:', error);
    return false;
  }
};

const editData = async (chave: string, id: Number, novoValor: any) => {
    try {
      // Recupera os dados existentes do AsyncStorage
      const existingData = await AsyncStorage.getItem(chave);
      let updatedData;
  
      if (existingData) {
        // Se já houver dados, converta de volta para JSON
        const parsedData = JSON.parse(existingData);
  
        // Encontrar o item pelo ID e atualizar o valor
        updatedData = parsedData.map((item: Agendamento) => 
          item.id === id ? { ...item, ...novoValor } : item
        );
  
      } else {
        // Se não houver dados, apenas use o novo valor
        updatedData = [novoValor]; // Caso o novo valor seja o único, armazene como array
      }
  
      // Armazena os dados combinados de volta no AsyncStorage
      await AsyncStorage.setItem(chave, JSON.stringify(updatedData));
  
      console.log('Valor atualizado com sucesso!');
      return updatedData;
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      return false;
    }
  };

const updateData = async ( chave: string, novoValor: any) => {
    try {
      // Recupera os dados existentes do AsyncStorage
      const existingData = await AsyncStorage.getItem(chave);
  
      let updatedData;
  
      if (existingData) {
        // Se já houver dados, converta de volta para JSON
        const parsedData = JSON.parse(existingData);
  
        // Combine o novo valor com os dados existentes
        updatedData = [...parsedData, novoValor]; // Exemplo de combinação com um array, adicione o novo valor ao final
      } else {
        // Se não houver dados, apenas use o novo valor
        updatedData = [novoValor]; // Caso o novo valor seja o único, armazene como array
      }
  
      // Armazena os dados combinados de volta no AsyncStorage
      await AsyncStorage.setItem(chave, JSON.stringify(updatedData));
  
      console.log('Valor atualizado com sucesso!');
      return updatedData;
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      return false;
    }
  };
  

const mergeData = async (chave: string, valor: any) => {
  try {
    await AsyncStorage.mergeItem(chave, JSON.stringify(valor));
    const mergedValue = await AsyncStorage.getItem(chave);
    if (mergedValue) {
      console.log('Merge realizado com sucesso!');
      return true;
    } else {
      console.error('Falha ao realizar merge.');
      return false;
    }
  } catch (error) {
    console.error('Erro ao fazer merge:', error);
    return false;
  }
};

export { updateData, removeData, getData, saveData, mergeData, editData };
