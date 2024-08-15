import { useCallback, useEffect, useRef, useState } from 'react'

function WebsocketControl() {
  // websocket 狀態
  const [isWsOpen, setIsWsOpen] = useState(false)
  // 一開始須先具有ws參數，一開始context抓不到
  const ws = useRef<WebSocket|null>(null);
  // 防呆機制 - 防止 use effect 呼叫兩次
  const foolProofing = useRef<boolean>(true);
  // 斷線時每段時間呼叫重新連線的計時器
  const reconnectInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  // 連線 port
  const port = 'ws://localhost:5500'

  const initWebsocket = useCallback(() => {
    // 開啟 Websocket 連線
    ws.current = new WebSocket(port)
    console.log('連線中')
    // 監聽開啟
    ws.current.onopen = () => {
      console.log('己連縣')
      // 清除斷線時的計時動作
      if(reconnectInterval.current){
        clearInterval(reconnectInterval.current);
      }
      setIsWsOpen(true)
    };

    // 監聽關閉
    ws.current.onclose = () => {
      console.log('己斷線')
      setIsWsOpen(false)
      // 斷線重連機制 
      if(!reconnectInterval.current){
        reconnectInterval.current = setInterval(()=>{
          console.log("重新嘗試時間:" + (new Date()));
          initWebsocket()
        }, 10*1000)
      }
    }

    // 監聽server傳遞訊息
    ws.current.onmessage = event => {
      console.log(event)
    };
    
    // 監聽錯誤
    // ws.current.onerror = err => {
    //   console.log('ws onerror:', err);
    // };
  },[])

  useEffect(() => {
    if(foolProofing.current === false) return
    else{
      foolProofing.current = false
      !isWsOpen && initWebsocket()
    }
  }, [isWsOpen, initWebsocket])

  return (
    <>isWsOpen:{isWsOpen?'true':'false'}</>
  )
}

export default WebsocketControl