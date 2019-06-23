import React from 'react';

const ListItem = (props) => {
    return (
        <li>
            <span>{props.people.firstName}&nbsp;{props.people.lastName}</span>
            </li>
    );
};
export default ListItem;