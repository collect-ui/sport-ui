import { utils } from "collect-ui/dist/collect-ui.es.js";

import React from "react";
function toJSONRecursive(tree:any){
    let  children = tree.children
    if(typeof tree.children==='object'){
        children = tree.children.map((child) => toJSONRecursive(child))
    }
    const rest = {}
    if(tree.props){

        for(let prop in tree.props){
            if(prop!=='children' && prop!=='props'){
                rest[prop]=tree.props[prop]
            }
        }

    }
    return {
        ...rest,
        children
    }
}
export default function(props){

    const {coder,...newProps}=utils.transferProp(props, "coder-preview")
    const coderTransfer = toJSONRecursive(coder)
    const CoderShow = utils.ScopedRender
    return <CoderShow {...coderTransfer} store={props.store} rootStore={props.rootStore} />

}