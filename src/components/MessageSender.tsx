import React, { SetStateAction, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const MessageSender = ({sendMessage, messageList, onTyping, isMobile}: 
    {sendMessage: (message: string) => void,
         messageList: React.Dispatch<React.SetStateAction<{type: boolean, message: string}[]>>,
         onTyping: (type: string) => void,
         isMobile?: boolean,
        }) => {
    const [message, setMessage] = useState("");
  if(isMobile){
    return (
        <div className='w-full bg-white fixed left-0 bottom-0 h-fit border-t-[1px] pl-2 pr-2 pb-2 pt-2 items-center flex flex-row space-x-2'>
            <Textarea
                placeholder="Type your message"
                className={"resize-none text-[16px]"}
                rows={1}
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                onKeyDown={(e)=>{
                    onTyping("typing");
                }}
                onKeyUp={(e)=>{
                    if(message === ""){
                        onTyping("not_typing");
                    }
                    if(e.key === "Enter"){
                        if(message.trim().length > 1)
                        {
                            sendMessage(message);
                        messageList((prev)=>{
                            const newArray = [...prev];
                            newArray.push({
                                type: true,
                                message
                            });
                            return newArray
                        })
                        setMessage("");
                        }
                    }
                }}
            />
            <Button onClick={()=>{
                if(message.trim().length < 1) return
                sendMessage(message);
                messageList((prev)=>{
                    const newArray = [...prev];
                    newArray.push({
                        type: true,
                        message
                    });
                    return newArray
                })
                setMessage("");
            }} disabled={message.trim().length < 1}>
                <Send/>
            </Button>
        </div>
      ) 
  }else{
    return (
        <div className='w-full flex flex-row space-y-2 md:space-x-2'>
            <Textarea
                placeholder="Type your message"
                className={"resize-none"}
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                onKeyDown={(e)=>{
                    onTyping("typing");
                }}
                onKeyUp={(e)=>{
                    if(message === ""){
                        onTyping("not_typing");
                    }
                    if(e.key === "Enter"){
                        if(message.trim().length > 1)
                        {
                            sendMessage(message);
                        messageList((prev)=>{
                            const newArray = [...prev];
                            newArray.push({
                                type: true,
                                message
                            });
                            return newArray
                        })
                        setMessage("");
                        }
                    }
                }}
            />
            <Button onClick={()=>{
                if(message.trim().length < 1) return
                sendMessage(message);
                messageList((prev)=>{
                    const newArray = [...prev];
                    newArray.push({
                        type: true,
                        message
                    });
                    return newArray
                })
                setMessage("");
            }} disabled={message.trim().length < 1}>
                <Send/>
            </Button>
        </div>
      )
  }
}

export default MessageSender