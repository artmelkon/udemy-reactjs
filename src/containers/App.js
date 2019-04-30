import React from 'react';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import classes from './App.css';
import withClass from '../hoc/withClass';
import Auxiliary from '../hoc/Auxiliary';
import AuthContext from '../context/auth-context';

class App extends React.Component {
    constructor(props) {
      super(props);
      console.log('[App.js] constructor');
    }
  state = {
    persons: [
      { id: 'idf4', name: 'Tom', age: 22 },
      { id: 'asfe3', name: 'Philipe', age: 32 },
      { id: 'op34', name: 'Samantha', age: 26 }
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nexPerson, nextState) {
    console.log('[App.js] shouldCompoinentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(
      p => { return p.id === id; }
    );

    const person = {
      ...this.state.persons[personIndex]
    };
    
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter +1 }
    });
  };

  deletePesonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    //console.log(personIndex);
    this.setState({persons: persons})
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons; 
    this.setState({showPersons: !doesShow})
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  };

  render() {
    console.log('[App.js] render');
    let userList = null;
    if (this.state.showPersons=== true) {
      userList = (
      <Persons
        persons={this.state.persons}
        clicked={this.deletePesonHandler}
        changed={this.nameChangeHandler}
        isAuthenticated={this.state.authenticated}
      />);
    }

    return (
      <Auxiliary>
        <button onClick={() => {
          this.setState({showCockpit: false });
         }}
        >Remove Cockpit</button>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
          { this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.lenght}
              clicked={this.togglePersonHandler}
            />
          ) : null }
          {userList}
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);