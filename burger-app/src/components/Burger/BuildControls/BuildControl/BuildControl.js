import React from 'react'
import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.labels}</div>
        <button  disabled={props.disabled}  className={classes.Less} onClick={props.removed}> Less</button>
        <button className={classes.More} onClick={props.added}>More</button>

    </div>
);

export default buildControl;