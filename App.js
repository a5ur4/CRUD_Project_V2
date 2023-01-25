import { useState } from 'react';
import { Pressable, Text, TextInput, TouchableOpacity, View, Keyboard, Vibration, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ref, set, update, onValue, remove } from 'firebase/database';
import { db } from './src/components/config';

import styles from './src/components/style/style';

export default function App() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [usernameList, setUsernameList] = useState([])

  // Verification function

  function verfication() {
    setErrorMessage("Este campo é obrigatório*")
    Vibration.vibrate()
  }

  // Create function

  //const newKey = push(child(ref(Database), 'users')).key

  function create () {
    if ((username, email, cpf, telefone) == ''){
      verfication()
    } else {
      var user = username
      set(ref(db, 'users/' + username /*mudar username para cpf pode ser uma melhor opção*/), {
        Username: username,
        Email: email,
        CPF: cpf,
        Telefone: telefone,
      }).then(() => {
        // Data saved sucessfully
        alert(username + ' seu usuário foi cadastrado')
    })
    .catch((error) => {
          // The write failed
          alert(error)
        })
      setErrorMessage('')
      setUsernameList ((arr) => [...arr, {id:cpf, usuario:user}])
  }}

  // Update function

  function update_func () {
    if ((username) == ''){
      verfication()
    } else {
      update(ref(db, 'users/' + username), {
        Username: username,
        Email: email,
        CPF: cpf,
        Telefone: telefone,
      }).then(() => {
        // Data saved sucessfully
        alert(username + ' seu usuário foi atualizado')
    })
        .catch((error) => {
          // The write failed
          alert(error)
        })
        setErrorMessage('')
      }}

  // Read Data

  function readData() {
    if ((username) == ''){
      verfication()
    } else {
    const starCountRef = ref(db, 'users/' + username)
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
        setEmail(data.Email)
        setCpf(data.CPF)
        setTelefone(data.Telefone)
    });
  }}

  // Delete Data

  function deleteData() {
    if ((username) == ''){
      verfication()
    } else {
    remove(ref(db, 'users/' + username))
    alert(username + ' removido')
    }}

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={Keyboard.dismiss} style={styles.PressableContainer}>
        <View style={styles.Title}>
          <Text style={styles.TextHead}>Cadastro Cliente</Text>
          <View style={styles.LineHead_1}></View>
          <View style={styles.LineHead_2}></View>
        </View>
        <View style={styles.InputBox}>
          <Text style={styles.LabelText}>Nome:</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
          style={styles.Input}
          value={username}
          onChangeText={(username)=> {
            setUsername(username)
          }}
          placeholder='Insira seu nome aqui...'
          placeholderTextColor= "#1E5128"
          />

          <Text style={styles.LabelText}>Email:</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
          style={styles.Input}
          value={email}
          onChangeText={(email)=> {
            setEmail(email)
          }}
          placeholder='Insira seu Email aqui...'
          placeholderTextColor= "#1E5128"
          />

          <Text style={styles.LabelText}>CPF:</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
          style={styles.Input}
          value={cpf}
          onChangeText={(cpf)=> {
            setCpf(cpf)
          }}
          placeholder='Insira seu CPF aqui...'
          placeholderTextColor= "#1E5128"
          keyboardType='numeric'
          />

          <Text style={styles.LabelText}>Telefone:</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
          style={styles.Input}
          value={telefone}
          onChangeText={(telefone)=> {
            setTelefone(telefone)
          }}
          placeholder='Insira seu telefone aqui...'
          placeholderTextColor= "#1E5128"
          keyboardType='numeric'
          />
        </View>
        <View>
          <TouchableOpacity 
          onPress={create}
          style={styles.Button}
          >
            <Text style={styles.ButtonText}>Cadastrar usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={update_func}
          style={styles.Button}
          >
            <Text style={styles.ButtonText}>Alterar usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={readData}
          style={styles.Button}
          >
            <Text style={styles.ButtonText}>Mostrar apenas um usuário</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={deleteData}
          style={styles.Button}
          >
            <Text style={styles.ButtonText}>Deletar usuário</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      <View style={styles.LineHead_2}></View>
      <View style={styles.LineHead_1}></View>
      <FlatList
      style={styles.FlatList}
      data={usernameList.reverse()}
      renderItem={({item}) => {
        return (
          <Text>
            <Text style={styles.ListText}>{item.usuario} foi cadastrado</Text>
          </Text>
        )
      }}
      >
      </FlatList>
    </SafeAreaView>
  );
}
