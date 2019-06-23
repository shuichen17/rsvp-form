import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => {
    return (
        <ul className="attendee">
            {props.attendee.map((element, index) => <ListItem key={index} people={element} />)}
            </ul>
    );
};
export default List;