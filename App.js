import { useState } from 'react';
import { StyleSheet, Pressable, Text, TextInput, TouchableOpacity, View, Keyboard, Vibration } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { child, Database, getDatabase, ref, set, update, onValue, remove } from 'firebase/database';
import { db } from './src/config';

export default function App() {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [telefone, setTelefone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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
    alert('usuário removido')
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191A19',
    alignItems: 'center',
    justifyContent: 'center',
  },

  PressableContainer: {
    alignItems: 'center'
  },

  Title: {
    alignItems: 'center',
    top: -20 
  },  

  TextHead: {
    color: "#4E9F3D",
    fontSize:20,
    fontWeight:'bold'
  },

  LineHead_1: {
    padding: 5,
    width: 250,
    borderBottomColor: '#4E9F3D',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  LineHead_2: {
    padding: 5,
    width: 300,
    borderBottomColor: '#4E9F3D',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  LabelText:{
    color: '#4E9F3D',
    fontSize: 15,
    marginLeft: 10,
    marginTop: 20
  },

  errorMessage: {
    color: 'red',
    fontSize: 12,
    paddingLeft: 10,
    marginBottom: -10,
  },

  Input: {
    borderColor: '#4E9F3D',
    borderWidth:1,
    marginTop: 15,
    height: 40,
    width: 350,
    borderRadius: 30,
    color: '#4E9F3D',
    paddingLeft: 20
  },

  Button: {
    backgroundColor: '#4E9F3D',
    borderRadius: 30,
    height: 40,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  ButtonText: {
    fontSize: 15
  }
});
