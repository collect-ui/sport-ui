import { types, Instance, getSnapshot } from 'mobx-state-tree';

// 定义子节点模型
const ChildModel = types
    .model('Child', {
        // 任意字段
        props: types.map(types.frozen<any>()),
        // children 可以是字符串或嵌套的数组结构
        children: types.maybe(types.union(types.string, types.array(types.late(() => ChildModel)))),
    })
    .actions((self) => ({
        setProp(key: string, value: any) {
            self.props.set(key, value);
        },
    }))
    .views((self) => ({
        toJSONRecursive(node: Instance<typeof ChildModel>) {
            const snapshot = getSnapshot(node);
            const json = {
                //@ts-ignore
                ...snapshot?.props.toJSON(), // 将 props 拆开
                //@ts-ignore
                children: Array.isArray(snapshot.children) ? snapshot.children.map((child) => self.toJSONRecursive(child)) : snapshot.children, // 如果是字符串，直接返回
            };
            return json;
        },
    }))
    .actions((self) => ({
        toJSON() {
            const json = self.toJSONRecursive(self);
            return JSON.stringify(json, null, 2);
        },
    }));

// 定义根节点模型
const CoderPreviewModel = types
    .model('CoderPreview', {
        children: types.array(ChildModel),
        // 任意字段
        props: types.map(types.frozen<any>()),
    })
    .actions((self) => ({
        setProp(key: string, value: any) {
            self.props.set(key, value);
        },
        addNode(node) {
            const child = genNode(node);
            //@ts-ignore
            self.children=[...self.children, child];
        },
    }))
    .views((self) => ({

    }))
    .actions((self) => ({
        // toJSON() {
        //     // const json = self.toJSONRecursive(self);
        //     const snapshot = getSnapshot(self);
        //     const data = toJSONRecursive(snapshot)
        //     return data
        // },
    }));

function genNode({children,...rest }) {
    let childrenNew =[]
    if(Array.isArray(children)) {
        for(let i=0;i<children.length;i++) {
              let child = genNode(children[i])
            childrenNew.push(child)
        }
    }else{
        childrenNew=children
    }

    return ChildModel.create({props:rest, children:childrenNew })
}
// 导出根节点实例
export default CoderPreviewModel;