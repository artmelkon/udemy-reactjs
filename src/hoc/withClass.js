import React from 'react';

const withClass = (WrappedComponent, className) => { //function body Higher Order Component
    //<div className={props.classes}>{props.children}</div>
    return props => (
        <div className = {className}>
            <WrappedComponent {...props} />
        </div>
    );
};

export default withClass;