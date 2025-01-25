

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
  const { path } = action
  let pathValue = store.getValue(path)
  const parts = pathValue.split("/")
  const stack = []

  for (const part of parts) {
    if (part === "..") {
      stack.pop() // 移除栈顶元素
    } else if (part !== "." && part !== "") {
      stack.push(part) // 将非空且非`.`的部分推入栈
    }
  }
  pathValue = "/" + stack.join("/")
  store.setValue(path, pathValue)
  return utils.getResult(true)
}
