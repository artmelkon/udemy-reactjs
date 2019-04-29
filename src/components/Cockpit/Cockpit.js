import React, {useEffect, useRef} from 'react';
import classes from './Cockpit.css';

const Cockpit = (props) => {
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    toggleBtnRef.current.click();

    // you can place HTTP requst
    setTimeout(() => {
      alert('Saved data to cloud!')
    }, 1000);
    return (() => {
      console.log('[Cockpet.js] cleanup useEffect')
    })
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd userEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd userEffect');
    };
  });

  const assignedClasses=[];
  let btnClass = '';
  if(props.showPersons) {
      btnClass = classes.Red;
  }

  if(props.personsLength <=2) {
    assignedClasses.push(classes.red); // classes=['red']
  }
  if(props.personsLength <=1) {
    assignedClasses.push(classes.bold); // classes=['red', 'bold']
  }

  return (
      <div className={classes.Cockpit}>
          <h3>{props.title}</h3>
          <p className={assignedClasses.join(' ')}>This really works in React</p>
          <button
            ref = {toggleBtnRef}
            className={btnClass}
            onClick={props.clicked}>Toggle Name List
          </button>
      </div>
  );
}

export default React.memo(Cockpit);