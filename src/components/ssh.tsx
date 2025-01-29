import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef, useState,
} from "react"
import "xterm/css/xterm.css" // 一定要记得引入css
import { message } from "antd"
import { Terminal } from "xterm"
import { WebLinksAddon } from "xterm-addon-web-links"
import { FitAddon } from "xterm-addon-fit"
import { utils } from "collect-ui/dist/collect-ui.es.js"

export interface TerminalProps {
  token: string
  fit: Function
  focus: Function
  send: Function
  write: Function
  reset: Function
}

const SSHTerminal: React.ForwardRefRenderFunction<TerminalProps, any> = (
  props,
  ref,
) => {
  const divRef: any = useRef(null)
  let socket: any = null
  const {refName,...newProps} = utils.transferProp(props, "ssh")
  useImperativeHandle(
    ref,
    () => ({
      fit() {
        fitAddon.fit()
        resize()
      },
      focus() {
        terminal.focus()
      },
      send(data: string) {
        sendData(data + "\r")
      },
      write(data: string) {
        terminal.write(data)
      },
      reset() {
        terminal.reset()
      },
      getCurrentPath() {
        return new Promise((resolve, reject) => {
          let data = {
            type: "pwd",
            data: ""
          };
          socket.send(JSON.stringify(data));

          // 设置超时（1秒）
          const timeout = setTimeout(() => {
            reject(new Error("获取路径超时"));
            socket.removeEventListener("message", messageHandler); // 移除监听器
          }, 1000);

          // 定义监听器函数
          const messageHandler = (msg) => {
            let data = msg.data;
            if (data.indexOf("<<<PWD_START>>>") >= 0 && data.indexOf("<<<PWD_END>>>") >= 0) {
              const startMarker = "<<<PWD_START>>>";
              const endMarker = "<<<PWD_END>>>";
              const input = data.replace("echo '<<<PWD_START>>>'; pwd; echo '<<<PWD_END>>>';", "");

              const lastStartIndex = input.lastIndexOf(startMarker);
              const lastEndIndex = input.lastIndexOf(endMarker);

              if (lastStartIndex !== -1 && lastEndIndex !== -1 && lastStartIndex < lastEndIndex) {
                const result = input
                    .slice(lastStartIndex + startMarker.length, lastEndIndex)
                    .trim();
                console.log(result); // 输出: /root

                clearTimeout(timeout); // 清除超时
                socket.removeEventListener("message", messageHandler); // 移除监听器
                resolve(result); // 返回路径
              } else {
                console.log("未找到标记或标记位置不正确");
                clearTimeout(timeout); // 清除超时
                socket.removeEventListener("message", messageHandler); // 移除监听器
                reject(new Error("未找到标记或标记位置不正确"));
              }
            }
          };

          // 绑定监听器
          socket.addEventListener("message", messageHandler);
        });
      },
      token: newProps.token,
    }),
    [newProps.token],
  )

  const fitAddon = new FitAddon()
  const terminal = new Terminal({
    cursorBlink: true, // 光标闪烁
  })

  const sendData = (dataInput: string) => {
    let data = {
      type: "text",
      data: dataInput,
    }
    socket.send(JSON.stringify(data))
  }

  const resize = () => {
    if (socket?.readyState !== 1) {
      return
    }
    let data = {
      type: "resize",
      cols: terminal.cols,
      rows: terminal.rows,
    }
    socket?.send(JSON.stringify(data))
  }

  const initTerminal = () => {
    const { token } = newProps
    if (token) {
      let host = window.location.host
      socket = new WebSocket(`ws://${host}/template_data/ws/${token}`)
      terminal.writeln("\n\n\n")
      terminal.writeln("\t====================================")
      terminal.writeln("\t|                                  |")
      terminal.writeln("\t|                                  |")
      terminal.writeln("\t|                                  |")
      terminal.writeln("\t|            正在登陆中...         |")
      terminal.writeln("\t|                                  |")
      terminal.writeln("\t|                                  |")
      terminal.writeln("\t|                                  |")
      terminal.writeln("\t====================================\n\n\n")
      socket.onopen = () => {
        terminal.clear()
        resize()
        console.log("connection success")
      }
      socket.onerror = () => {
        terminal.writeln("\n\n\t连接出错!!!")
        message.error("连接出错")
      }
      socket.onmessage = (msg: { data: string | Uint8Array }) => {
        // let data = msg.data
        // terminal.write(data)
        let data = msg.data
        //@ts-ignore
        if(data.indexOf("<<<PWD_START>>>")>=0 && data.indexOf("<<<PWD_END>>>")>=0){
          // 定义开始和结束标记
          const startMarker = "<<<PWD_START>>>";
          const endMarker = "<<<PWD_END>>>";
          //@ts-ignore
          const input = data.replace("echo '<<<PWD_START>>>'; pwd; echo '<<<PWD_END>>>';","")
// 找到最后出现的开始标记和结束标记的位置
          const lastStartIndex = input.lastIndexOf(startMarker);
          const lastEndIndex = input.lastIndexOf(endMarker);

// 截取标记之间的内容
          if (lastStartIndex !== -1 && lastEndIndex !== -1 && lastStartIndex < lastEndIndex) {
            const result = input
                .slice(lastStartIndex + startMarker.length, lastEndIndex)
                .trim();
            console.log(result); // 输出: /root
            // setPath(result)
          } else {
            console.log("未找到标记或标记位置不正确");
          }
        }else{
          terminal.write(data)
        }
      }
      socket.onclose = () => {
        terminal.write("\n\n连接已经关闭...")
        console.log("连接结束")
      }
    }

    const webLinksAddon = new WebLinksAddon()
    terminal.loadAddon(webLinksAddon)
    terminal.loadAddon(fitAddon)
    terminal.open(divRef.current)
    if (token) {
      terminal.onData((key) => {
        sendData(key)
      })
    }

    fitAddon.fit()

    return () => {
      console.log("finish")
      socket?.close()
      socket = null
    }
  }

  useEffect(() => {
    if (socket) {
      socket.close()
    }
    // if (refName){
    //   const store = props.store
    //   store.setFormRef(refName,divRef)
    // }

    return initTerminal()
  }, [newProps.token])

  useEffect(() => {
    const handleResize = () => {
      fitAddon.fit()
      resize()
    }

    // 使用 ResizeObserver 监听 divRef 的大小变化
    const resizeObserver = new ResizeObserver(debounce(handleResize, 50))
    resizeObserver.observe(divRef.current)

    // 清理 ResizeObserver
    return () => {
      resizeObserver.disconnect()
    }
  }, [fitAddon])

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        height: "100%",
        background: "#000",
      }}
      ref={divRef}
    />
  )
}
// 防抖函数
function debounce(func, wait) {
  let timeout
  return function (...args) {
    //@ts-ignore
    const context = this
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(context, args), wait)
  }
}
export default forwardRef(SSHTerminal)
