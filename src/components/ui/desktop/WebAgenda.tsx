import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, StyleSheet } from 'react-native';

const WebAgenda = () => {

  return (
    <View style={styles.container}>
      <Text>Agenda Web</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
    alignItems: 'center',
    borderRadius: 10,
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  dayColumn: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 10,
  },
  dayLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#6200ee',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  eventBlock: {
    backgroundColor: '#bb86fc',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  eventText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  eventTime: {
    color: '#f0f0f0',
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default WebAgenda;