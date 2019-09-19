import React, { useState } from 'react';
import Radium, { StyleRoot } from 'radium';
import Person from "./Person/Person";
import './App.css';



const app = props => {
    const [personState, setPersonState] = useState({
        persons: [
            { id: 101, name: 'Kate', age: 28 },
            { id: 102, name: 'Peter', age: 30 },
            { id: 103, name: 'Richard', age: 25 },
        ]
    });

    const [showPersons, setShowPersons] = useState(false);

    const togglePersonHandler = () => {
        setShowPersons(!showPersons);
    };

    const nameChangedHandler = (event, id) => {
        const personIndex = personState.persons.findIndex(p => p.id === id);
        const person = {
            ...personState.persons[personIndex]
        };

        person.name = event.target.value;

        const persons = [...personState.persons];
        persons[personIndex] = person;

        setPersonState({persons});
    };

    const deletePersonHandler = (personIndex) => {
        const persons = [...personState.persons];
        persons.splice(personIndex, 1);
        setPersonState({persons});
    };

    const style = {
        backgroundColor: 'green',
        color: 'white',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'lightgreen',
            color: 'black'
        }
    };

    let persons = null;
    if (showPersons) {
        persons = (
            <div>
                {personState.persons.map((person, index) => {
                    return <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        click={() => deletePersonHandler(index)}
                        changed={(event) => nameChangedHandler(event, person.id)} />
                })}
            </div>
        );

        style.backgroundColor = 'red';
        style[':hover'] = {
            backgroundColor: 'salmon',
            color: 'black'
        };
    }

    const classes = [];
    if (personState.persons.length <= 2) {
        classes.push('red');
    }

    if (personState.persons.length <= 1) {
        classes.push('bold');
    }

    return (
        <StyleRoot>
            <div className="App">
                <h2>React App</h2>
                <p className={classes.join(' ')}>This is really working!</p>
                <button
                    style={style}
                    onClick={togglePersonHandler}>
                    Toggle Persons
                </button>
                {persons}
            </div>
        </StyleRoot>
    );
};

export default Radium(app);
