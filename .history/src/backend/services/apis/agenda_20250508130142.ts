import moment from 'moment';

export default class XanoApiAgenda{
  private static url = 'https://xltw-api6-8lww.b2.xano.io/api:5ONttZdQ'

  public static postData = async (formData: any) => {
    
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
  public static  getCalendarios = async (token: string) => {
    try {
      const uri = this.url+'/calendar?page=1&perPage=100'
      const response = await fetch(serv, {
        method: 'POST',
        headers: {
            'Authorization': ContratoExecucaoApi.authorization,
        },
        body: JSON.stringify(requestData), // Convertendo os dados para JSON
    });
      console.log(response);
      
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
  public static deleteData = async (endpoint: string) => {
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
  public static updateData = async (endpoint: string, formData: any) => {
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

}
