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
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    todos: [],
    inputed: "",
    isPressed: false
  };

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
    let todos = this.state.todos
    todos.splice(index, 1)
    this.setState({
      todos: todos
    });
  }

  pressing = (item) => {
    this.setState({

    })
  };

  render() {
    return (
      <View style={styles.container}>
      <View style={styles.paddingInput}>
        <TextInput
          style={styles.TextInput}
          placeholder="Add"
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
            <Text style={[
              item.complete
              ? {backgroundColor: "#ffae00"}:{backgroundColor: "#ff0000"}, styles.listitem
            ]}
            onPress={() =>{

              let todos = this.state.todos
              alert(todos[index].task)
              todos[index].complete = !todos[index].complete
              this.setState({
                todos: todos
              })
            }

            }>{item.task}</Text>
            <Button style={styles.buttdel} title="X" onPress={() => this.delTodo(index)}/>
           </View>
         }
         />

       </View>


      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ListTodos:{
    backgroundColor: '#ffae00',
  },
  buttdel:{
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
    zIndex: 990,
  },

  TextInput: {
    fontSize: 18,
  },

  listitem: {
    width: "100%",
    padding: 12,
    fontSize: 18,
    marginBottom: 2
  },
  listContent:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
