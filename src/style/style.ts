import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    cardHorario:{
        padding:5, 
        paddingRight:30, 
        alignItems:'center', 
        justifyContent:'center',
        marginRight:10, 
        height:'auto', 
        borderColor:'#f0f0f0',
        borderRightWidth:1
    },
  
    top: { 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      height: 45, 
      marginTop: 8, 
      paddingBottom: 15, 
      borderBottomColor: '#A8C0DE', 
      borderBottomWidth: 0.2 
    },

    title: { 
        fontSize: 22, 
        fontWeight: '700', 
        color:'rgba(21, 128, 235, 0.8)'
    },

    calendarContainer: { 
        width: '100%' 
    },

    monthCalendar: { 
        height:'auto' 
    },

    weekCalendar: { 
        height: 'auto' 
    },

    heardCalendario: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    containeTextCalendario: { 
        paddingRight: 5, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },

    containeButtonsCalendario: { 
        alignItems: 'center' 
    },

    monthSelector: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: '#1E88E5', 
        textAlign: 'center', 
        marginBottom: 2 
    },

    weekView: { 
        marginVertical: 15,
        paddingTop: 5 
    },

    weekNavigation: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop:15,
    
    },

    weekList: { 
        flexGrow: 0, 
 
    },

    weekDay: {
      paddingVertical: 4,
      margin: 2,
      backgroundColor: '#fff',
      borderRadius: 10,
      width: 48,
      height: 80,
      alignItems: 'center',
    },

    selectedDay: { 
        backgroundColor: '#1E88E5' 
    },

    weekDayText: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        color: 'rgba(11, 95, 179, 0.5)' 
    },

    selectedDayText: { 
        color: '#fff' 
    },

    weekDayName: { 
        fontSize: 12, 
        color: '#0063C7', 
        marginTop: 4, 
        marginBottom: 6 
    },

    appointmentsBadge: {
      backgroundColor: '#1E88E5',
      borderRadius: 10,
      paddingVertical: 2,
      paddingHorizontal: 6,
      marginTop: 4,
    },
    appointmentsText: { 
        color: '#fff', 
        fontSize: 12 
    },

    appointmentsContainer: { 
        flex: 1, 
        marginTop: 10 
    },
    
    card: { 
        flexDirection: 'row', 
        backgroundColor: '#fff', 
        padding: 8, 
        borderRadius: 10, 
        marginVertical: 0 ,
        gap: 0,

    },

    containerContainerCardList:{
      height: 'auto',
      width: '75%',
    },

    list:{
      
    },
    
    time: { 
        fontWeight: 'bold', 
        fontSize: 16, 
        color: 'rgba(16, 109, 202, 0.8)' 
    },
    
    cardContent: { 
        marginLeft: 10, 
        flex: 1 ,
        paddingHorizontal: 18,
        paddingVertical: 15, 
        borderRadius: 10, 
        boxShadow: '0px 10px 15px -10px rgba(20, 46, 194, 0.1)'
    },
    
    type: { 
        fontWeight: 'bold', 
        fontSize: 14, 
        color:'rgba(21, 128, 235, 0.9)'
    },
    
    plan: { 
        fontSize: 12, 
        color: '#A8C0DE' 
    },
    
    profile: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 5 
    },
    
    avatar: { 
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        marginRight: 8 
    },
    
    name: { 
        flex: 1, 
        fontSize: 14, 
        color:'rgba(18, 89, 160, 0.6)'
    },
    
    container: { 
        flex: 1, 
        backgroundColor: '#fff', 
        padding: 20, 
        paddingTop: 45 
    },
    
    dayContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
      
    scheduledDotSelect: {
        width: 'auto',
        height: 'auto',
        minWidth:18,
        minHeight:16,
        borderRadius: 7,
        backgroundColor: '#fff',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    scheduledDot: {
        width: 'auto',
        height: 'auto',
        minWidth:18,
        minHeight:16,
        borderRadius: 7,
        backgroundColor: 'rgba(165, 189, 212, 0.5)',
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    scheduledDotText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '900',
    },

    scheduledDotTextSelect: {
        color: '#1E88E5',
        fontSize: 12,
        fontWeight: '900',
    },
    toggleContainer: {
      flexDirection: "row",
      height: 30,
      backgroundColor: "#EAF3F9",
      borderRadius: 25,
      padding: 4,
      width: 150,
      alignSelf: "center",
      shadowColor: "#025AC0",
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      justifyContent: "space-evenly",
    },
    option: {
      flex: 1,
      paddingHorizontal: 10,
      justifyContent: "center",
      borderRadius: 20,
      alignItems: "center",
  
    },
    activeOption: {
      backgroundColor: 'rgba(25, 140, 255, 0.5)',
      justifyContent: "center",
   
    },
    optionText: {
    textAlign: "center",
      fontSize: 14,
      fontWeight: "bold",
      color: "#A8C0DE", // Cinza para opção inativaa
    },
    activeOptionText: {
        textAlign: "center",
      color: "#fff", // Azul escuro para opção ativa
    },
    
 
  });

  const styles_form = StyleSheet.create({
    labelow:{
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    noAppointmentsText: {
      fontSize: 18,
      color: 'rgba(25, 140, 255, 0.3)',
      marginTop: 10,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    openButton: {
      backgroundColor: 'rgba(25, 140, 255, 0.5)',
      paddingVertical: 5,
      height: 32,
      paddingHorizontal: 10,
      borderRadius: 10,
      alignSelf: 'flex-end',
      flexDirection: 'row', // Para alinhar o texto com o ícone
      alignItems: 'center',
    },
    openButtonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
      marginRight: 5, // Espaço entre o texto e o ícone
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dateTimeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',  // Ajusta o espaçamento entre os componentes
      alignItems: 'center',
  
    },
    dateInput: {
      flex: 1, // Para garantir que o botão de data ocupe o espaço disponível
      marginRight: 10, // Adiciona um pequeno espaçamento à direita entre o campo de data e o de hora
    },
    textDataHora:{
      color:'#7D8FB3',
    },
    timeInput: {
      flex: 1, // Para garantir que o botão de hora ocupe o espaço disponível
    },
    schedule: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 12,
      width: '80%',
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 10,
      color:'rgba(25, 140, 255, 0.8)'
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 20,
    },
    form: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '700',
      marginBottom: 5,
      color:'#7D8FB3'
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 12,
      borderRadius: 6,
      justifyContent: 'center',
      color:'#7D8FB3'
    },
    button: {
      backgroundColor: '#1E88E5',
      paddingVertical: 10,
      borderRadius: 6,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: '700',
      fontSize: 16,
    },
    error:{
      color: 'red',
      fontSize: 12,
      marginBottom: 5
    }
  });

const style = StyleSheet.create({
    heardCalendario: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 10,
      backgroundColor: '#f5f5f5',
    },
    containeTextCalendario: {
      padding: 10,
      borderRadius: 5,
    },
    monthSelector: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1E88E5',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      width: 300,
      alignItems: 'center',
    },
    modalText: {
      fontSize: 16,
      paddingVertical: 10,
      color: '#333',
      textAlign: 'center',
    },
    selectedText: {
      fontWeight: 'bold',
      color: '#1E88E5',
    },
    closeModal: {
      marginTop: 10,
      fontSize: 16,
      color: '#1E88E5',
      fontWeight: 'bold',
    },
  });

export  {styles, styles_form, style};