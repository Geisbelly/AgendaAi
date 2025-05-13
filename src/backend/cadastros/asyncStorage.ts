
import {Calendario} from '../../models/Calendario'
import AsyncStorage from '@react-native-async-storage/async-storage';


const saveData = async (chave: string, novoValor: any) => {
  try {
      let objeto;
      if (chave === '@agendamentos') {
          const obj = new Calendario(
              novoValor.cliente,
              novoValor.tipo,
              novoValor.dt_consulta,
              novoValor.horario,
              novoValor.profissional,
              novoValor.color,
              novoValor.status
          );

          objeto = {
              id: obj.id
             
          };
      } else {
          objeto = novoValor;
      }

      // Recupera os dados existentes
      const existingData = await AsyncStorage.getItem(chave);
      const parsedData = existingData ? JSON.parse(existingData) : [];

      // Adiciona o novo objeto à lista existente
      const updatedData = [...parsedData, objeto];

      // Salva os dados atualizados no AsyncStorage
      await AsyncStorage.setItem(chave, JSON.stringify(updatedData));

      console.log('Salvo com sucesso!');
      return updatedData;
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

const removeItem = async (chave: string, id: number) => {
  try {
    // Recupera os dados existentes do AsyncStorage
    const existingData = await AsyncStorage.getItem(chave);

    if (existingData) {
      // Se houver dados, converte de volta para JSON
      const parsedData = JSON.parse(existingData);

      // Filtra os dados para remover o item com o id fornecido
      const updatedData = parsedData.filter((item: any) => item.id !== id);

      // Armazena os dados atualizados de volta no AsyncStorage
      await AsyncStorage.setItem(chave, JSON.stringify(updatedData));

      // Verifica se o item foi removido
      const value = await AsyncStorage.getItem(chave);
      const dataAfterRemoval = value ? JSON.parse(value) : [];
      const itemRemoved = !dataAfterRemoval.some((item: any) => item.id === id);

      if (itemRemoved) {
        console.log('Item removido com sucesso!');
        return true;
      } else {
        console.error('Falha ao remover o item.');
        return false;
      }
    } else {
      console.error('Nenhum dado encontrado para remover.');
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
        updatedData = parsedData.map((item: Calendario) => 
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

export { updateData, removeData, getData, saveData, mergeData, editData,removeItem };
