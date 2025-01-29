

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
  let history = store.getFormRef("history")
  // history[0].current.write("hello world")
  const ssh = history[0]
  const rowData = store.historyLogList
  const times = "2"
  play(ssh,rowData,times)
  return utils.getResult(true)
}
function sleep(ms: number | undefined){
  return  new Promise((resolve)=>{
    setTimeout(resolve,ms)
  })
}

const play=async (ssh,rowData,times)=>{
  ssh?.current?.reset()

  for(let i=0;i<rowData.length;i++){
    let {data,create_time} = rowData[i]
    // @ts-ignore
    ssh?.current?.write(data)
    let p = (i+1)*100/rowData.length
    // setPercent(parseInt(p+""))
    if(i+1<rowData.length){
      let next = rowData[i+1]
      let ms = (next["create_time"]-create_time)/(1000*1000)
      if(ms >3000){
        ms=3000
      }

      // @ts-ignore
      let wait = ms/parseInt(times)
      await sleep(wait)
    }

  }
  ssh?.current?.write("\n\n\t结束!!!")

}