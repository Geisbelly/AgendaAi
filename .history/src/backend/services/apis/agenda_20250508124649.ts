import moment from 'moment';

export default Xano
// Método POST
const postData = async (formData: any) => {
  const url = 'https://xltw-api6-8lww.b2.xano.io/api:5ONttZdQ'
  const dataToSend = {
    ...formData,
    dt_consulta: moment(formData.dt_consulta).format('YYYY-MM-DD'),
    horario: moment(formData.horario).format('HH:mm'),
    dt_criacao: moment().format('YYYY-MM-DD'),
    hora_criacao: moment().format('HH:mm:ss'),
  };

  try {
    const response = await fetch('?page=1&perPage=100', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log('Agendamento salvo com sucesso!', responseData);
      return response.ok
    } else {
      console.error('Erro ao salvar agendamento', response.statusText);
      return null
    }
  } catch (error) {
    console.error('Erro de rede ao salvar agendamento:', error);
  }
};

// Método GET
const getCalendarios = async (token: string) => {
  try {
    const uri = url
    const response = await fetch(`${ur}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar dados');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

// Método DELETE
const deleteData = async (endpoint: string) => {
  try {
    const response = await fetch(`https://suaapi.com${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir dados');
    }

    const responseData = await response.json();
    console.log('Dado excluído com sucesso!', responseData);
    return responseData;
  } catch (error) {
    console.error('Erro ao excluir dados:', error);
    throw error;
  }
};

// Método PUT
const updateData = async (endpoint: string, formData: any) => {
  try {
    const response = await fetch(`https://suaapi.com${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar dados');
    }

    const responseData = await response.json();
    console.log('Dado atualizado com sucesso!', responseData);
    return responseData;
  } catch (error) {
    console.error('Erro ao atualizar dados:', error);
    throw error;
  }
};

export { getData, postData, deleteData, updateData };
