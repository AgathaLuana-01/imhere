import React, { useState } from 'react';
import { Text, TextInput, View, TouchableOpacity, FlatList, Alert } from 'react-native';
import { styles } from './styles';
import { Participant } from '../../components/Participant';



export default function Home() {
  /* [estado, funçãoQueAtualiza o estado] = useState */
  const [participants, setParticipants] = useState<string[]>([]);
  /* 
  const participants = ['Yummi', 'Lua', 'Yuki', 'Amora', 'Nora', 'Milk', 'Apollo', 'Mel', 'Sasha', 'Victor'];
  */
  const [participantName, setParticipantName] = useState('');

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert('Participante Existe', 'Já existe um participante na lista com esse nome');
    }
    /*...prevState => recupera todo o conteúdo do estado anterior ['Inclui o que tem agora'] */
    setParticipants(prevState => [...prevState, participantName]);
    setParticipantName(''); // Limpando a caixa de texto
  }

  function handleParticipantRemove(name: string) {
   // return console.log(`Nome do usuário :: ${name}`);
    /* Alert
      1. Titulo
      2. Mensagem
      3. Array [] com propriedades que definem os botões {}
     */
    Alert.alert('Remover', `Remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () => setParticipants(prevState => participants.filter(participants => participants !== name))
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ]);
    console.log(`Você clicou em remover o participante ${name}`);
  }



  return (
    <View style={styles.container} >
      <Text style={styles.eventName}>Nome Evento </Text>
      <Text style={styles.eventDate} >Quarta 07 de Fevereiro!!</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder='Nome do Parcipante'
          placeholderTextColor='#6B6B6B'
          onChangeText={setParticipantName}
          // onChangeText={event => setParticipantName(event)} //Consigo acessar o texto do contúdo atual da caixa de texto
          value={participantName}
        />

        <TouchableOpacity style={styles.button}
          onPress={handleParticipantAdd}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda?
            Adcione participantes a sua lista de participante
          </Text>
        )}
      />


    </View>
  )
}