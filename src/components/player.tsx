import React from 'react';
import ReactPlayer from 'react-player';
import { utils } from "collect-ui/dist/collect-ui.es.js"
export default function player(props) {
    const {visible,...newProps} = utils.transferProp(props, "player")
    const show = utils.getVisible(props)
    if(!show) {
        return null
    }
    return <ReactPlayer{...newProps}/>
}