import React from 'react';
import {
  Image,
  Platform,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default class Todo extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      todos: [],
      inputed: "",
      isPressed: false,
      count: 0
    };
  }



  addtodo = () => {

    if(this.state.inputed.trim().length > 0){
      let todo = {task: this.state.inputed, complete: true}
      this.setState({
        todos: this.state.todos.concat(todo),
        inputed: ""
      });
    }
  }

  delTodo = (index) => {
    let todos = this.state.todos.slice()
    let count = 0;
    if(!todos[index].complete){
      count = this.state.count-1
    }else if(todos[index].complete){
      count = this.state.count
    }

    todos.splice(index, 1)

    this.setState({

      todos: todos,
      count: count
    });


  }
  render() {
    let todos = this.state.todos.slice()
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.counterAll}>All: {todos.length}</Text>
          <Text style={styles.counterNon}>NonComplete: {todos.length - this.state.count}</Text>
        </View>
        <View style={styles.paddingInput}>
          <TextInput
            style={styles.TextInput}
            placeholder="Add a task"
            value={this.state.inputed}
            onChangeText={(text) => this.setState({inputed: text})}
            onSubmitEditing={this.addtodo}
           />
        </View>

          <View style={styles.container}>
           <FlatList
             style={styles.list}
             data={this.state.todos}
             renderItem={({item, index}) =>

             <View style={styles.listContent}>

              <Text

                onPress={() => {
                    let todos = this.state.todos.slice()
                    if(todos[index].complete){
                      todos[index].complete = false;
                      this.state.count += 1;
                    }else{
                      todos[index].complete = true;
                      this.state.count -=1;
                    }
                    this.setState({
                      todos: todos
                    });
                  }
                }
                style={
                    item.complete ?
                      styles.complete : styles.regular
                }
              >{item.task}</Text>

                <Button style={styles.buttdel} title="X" onPress={() => this.delTodo(index)}/>
             </View>
           }
           />

         </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ListTodos:{
    flexDirection: "row",
    backgroundColor: '#ffae00',
  },
  buttdel:{
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "center",
    fontSize: 18,
    zIndex: 9999,
  },
  counterAll:{
    marginLeft: 50,
  },
  counterNon:{
    position: 'absolute',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 250,
  },
  listContent:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",

    },
  TextInput: {
    fontSize: 18,
  },
  complete: {
    width: "90%",
    padding: 12,
    fontSize: 18,
    marginBottom: 1,
    backgroundColor: '#eee',
    zIndex: -1,
    borderRadius: 50,
  },
  regular: {
    width: "90%",
    padding: 12,
    fontSize: 18,
    marginBottom: 1,
    backgroundColor: '#22ff22',
    zIndex: -1,
  },
  container: {
   flex: 1,
   paddingTop: 10
  },
  paddingInput:{
    paddingTop: 20,
    paddingLeft: 20,
    marginBottom: 20,
  },

})
