import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/Task';
import { useState } from 'react';

export default function App() {

  const [task, setTask] = useState()
  const [taskItems, setTaskItems] = useState([])

  // setTask('drink sparkling water')

  const handleAddTask = () =>{
    Keyboard.dismiss()
    setTaskItems([...taskItems, task])
    setTask(null)
    // setTaskItems([])
    // console.log(taskItems);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index, 1)
    setTaskItems(itemsCopy)
  }

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {/*This is where the task will go*/}
          {
            taskItems.map((tasks, index)=> <TouchableOpacity key={index} onPress = {() => completeTask(index)}>
              <Task text={tasks}/>
            </TouchableOpacity>)
          }
        </View>
      </View>
      {/* Create the add Task  */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style = {styles.writeTaskWrapper}
      >
        <TextInput 
          style = {styles.input}
          placeholder = {'Create a Task'}
          value = {task}
          onChangeText = {task => setTask(task)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style = {styles.addWrapper}>
            <Text style = {styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop : 80,
    paddingHoriontal: 20,
    // paddingLeft: 10
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
    marginRight: 10,
  },
  items: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  writeTaskWrapper:{
    position : 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input:{
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 60,
    backgroundColor: '#FFF',
    width: 250,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    paddingLeft: 20,
  },
  addWrapper:{
    width : 60,
    height : 60,
    backgroundColor : '#E8C4C4',
    borderRadius : 60,
    justifyContent : 'center',
    alignItems : 'center',
  },
  addText:{

  },
});
