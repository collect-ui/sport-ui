

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
  target?: any,
): Promise<utils.result> {
  //@ts-ignore
  const [shell] = store.getFormRef(target.row.token)
  if(target.row.path=="./"){
    const path = await shell.current.getCurrentPath()
    if(path){
      target.row.setPath(path)
    }

  }
  return utils.getResult(true)
}
