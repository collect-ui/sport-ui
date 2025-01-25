import { types, getRoot, applySnapshot } from "mobx-state-tree"
import { v4 as uuidv4 } from "uuid"

const Content = types
  .model("content", {
    token: types.identifier, // 使用 identifier 作为唯一标识符
    title: types.string,
    path: types.string,
    // 添加 parent 属性
    parent: types.maybe(types.reference(types.late(() => SubGroup))),
  })
  .actions((self) => {
    return {
      setPath: (path) => {
        self.path = path
      },
    }
  })

const SubGroup = types
  .model("sub-group", {
    id: types.identifier, // 使用 identifier 作为唯一标识符
    order: types.number,
    description: types.string,
    activeKey: types.string,
    content: types.array(Content),
    // 添加 parent 属性
      //@ts-ignore
    parent: types.maybe(types.reference(types.late(() => Panel))),
  })
  .actions((self) => {
    return {
      addChildren(content) {
        content.parent = self // 设置 content 的 parent 属性
          //@ts-ignore
        self.content = [...self.content, content]
      },
      setActiveKey(activeKey) {
        self.activeKey = activeKey
      },
      removeByKey(token) {
        const index = self.content.findIndex((item) => item.token === token)
        if (index >= 0) {
          self.content.splice(index, 1)
        }
      },
    }
  })

const Panel = types
  .model("group", {
    id: types.identifier, // 使用 identifier 作为唯一标识符
    order: types.number,
    description: types.string,
    children: types.array(SubGroup),
  })
  .actions((self) => {
    return {
      addChildren(subPanel) {
        subPanel.parent = self // 设置 subPanel 的 parent 属性
        self.children.push(subPanel)
      },
      // 如果 tab 被清空了，关闭分组
      checkNoneTab() {
        const children = self.children.filter((item) => item.content.length > 0)
          //@ts-ignore
        self.children = [...children]
      },
      removeById(id) {
        const index = self.children.findIndex((item) => item.id === id)
        if (index >= 0) {
          self.children.splice(index, 1)
        }
      },
      // 初始化 parent 属性
      initialize() {
        self.children.forEach((subGroup) => {
          subGroup.parent = self
          subGroup.content.forEach((content) => {
            content.parent = subGroup
          })
        })
      },
    }
  })

const PanelList = types.array(Panel)
export const ContentReference = types.array(
  types.maybe(types.reference(types.late(() => Content))),
)
export default PanelList
