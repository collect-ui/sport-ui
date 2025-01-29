

import { utils } from "collect-ui/dist/collect-ui.es.js"
import { App } from "antd"

/**
 * 更新store
 * @param api
 * @param storeData
 * @param options
 */
export default async function (
  action: object,
  store: any,
  rootStore: any,
  useApp: any,
): Promise<utils.result> {
  //@ts-ignore


  const paneList = store.panelList
  // 获取表单
  const [form] = store.getFormRef("shell-form")
  const shell = form.getFieldValue("shell")
  const activeList = []
  paneList.forEach((item) => {
    if (item.children.length>0) {
      // activeList.push(item.children[0].activeKey)
      item.children.forEach(subItem=>{
        activeList.push(subItem.activeKey)
      })
    }
  })
  activeList.forEach(item=>{
    const active= store.getFormRef(item)
    active[0].current.send(shell)
  })
  form.setFieldValue("shell","")

  return utils.getResult(true)
}
