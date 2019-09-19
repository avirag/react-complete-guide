import React, { useState } from 'react';
import Person from "./Person/Person";
import classes from  './App.css';

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

    let persons = null;
    let btnClass = '';
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

        btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (personState.persons.length <= 2) {
        assignedClasses.push(classes.red);
    }

    if (personState.persons.length <= 1) {
        assignedClasses.push(classes.bold);
    }

    return (
        <div className={classes.App}>
            <h2>React App</h2>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button
                className={btnClass}
                onClick={togglePersonHandler}>
                Toggle Persons
            </button>
            {persons}
        </div>
    );
};

export default app;
