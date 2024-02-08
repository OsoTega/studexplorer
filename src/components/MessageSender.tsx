import React, { SetStateAction, useState } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Send } from 'lucide-react'

const MessageSender = ({sendMessage, messageList}: 
    {sendMessage: (message: string) => void,
         messageList: React.Dispatch<React.SetStateAction<{type: boolean, message: string}[]>>}) => {
    const [message, setMessage] = useState("");
  return (
    <div className='w-full flex flex-col md:flex-row space-y-2 md:space-x-2'>
        <Textarea
            placeholder="Type your message"
            className="resize-none"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            onKeyUp={(e)=>{
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

export default MessageSender