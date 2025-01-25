// HeartbeatValue.js
import React, { useState, useEffect } from 'react';
import '../assets/css/Heartbeat.css';
import { utils } from "collect-ui/dist/collect-ui.es.js"
const HeartbeatValue = (props) => {
    const [className, setClassName] = useState('');

    const {value} = utils.transferProp(props,'heartbeat-value')
    useEffect(() => {
        setClassName('heartbeat');
        const timeoutId = setTimeout(() => {
            setClassName('');
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [value]);

    return (
        <div className={className}>
            {value}
        </div>
    );
};

export default HeartbeatValue;