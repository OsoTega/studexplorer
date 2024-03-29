import React, { useEffect, useRef } from 'react'
import createDOMPurify from 'dompurify';
import {JSDOM} from 'jsdom';
import DOMPurify from 'dompurify';
import {useTransition, animated} from '@react-spring/web'


const ReceiveMessage = ({linkify, message}: {linkify: (text: string) => string, message: string})=>{
    const transition = useTransition(message, {
        from: {
            x: -100,
            y: 80,
            opacity: 0
        },
        enter: {
            x: 0,
            y: 0,
            opacity: 1
        },
        leave: {}
    })
    return (
        <div className='w-full mt-4 flex flex-row justify-between'>
            {
                transition((style, item)=> item ? (
                    <animated.div style={style} className='bg-[#f4f4f5] rounded-md max-w-[70%] whitespace-normal text-wrap text-[#18181b] p-2'>
                    <p className='w-full break-words text-wrap whitespace-normal' dangerouslySetInnerHTML={{ __html: linkify(message) }}/>
                    </animated.div>
                ): <div/>)
            }
            <div/>
        </div>
    );
}

const SendMessage = ({linkify, message}: {linkify: (text: string) => string, message: string})=>{
    const transition = useTransition(message, {
        from: {
            x: 100,
            y: 80,
            opacity: 0
        },
        enter: {
            x: 0,
            y: 0,
            opacity: 1
        },
        leave: {}
    })
    return (
        <div className='w-full mt-4 flex flex-row justify-between'>
            <div/>
            {
                transition((style, item)=> item ? (
                    <animated.div style={style} className='bg-[#18181b] rounded-md max-w-[70%] whitespace-normal text-wrap text-[white] p-2'>
                        <p className='w-full break-words text-wrap' dangerouslySetInnerHTML={{ __html: linkify(message) }}/>
                    </animated.div>
                ): <div/>)
            }
        </div>
    );
}

const Message = ({type, message}: {type: boolean, message: string})=>{
    const linkify = (text: string)=>{
        const urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        // extract your url by urlRegex something like
        //@ts-ignore
        const urls = text.match(urlRegex)
        text = DOMPurify.sanitize(text);
        //@ts-ignore
        for(let i = 0; i < urls?.length; i++){
            //@ts-ignore
            const url = urls[i];
            const replaceText = text.replace(url, `<a class="text-[#5890ed]" target="_blank" href='${url}'>${url}</a>`)
            text = replaceText;
        }
        return text;
      }
    if(type){
        return (
            <SendMessage linkify={linkify} message={message}/>
        );
    }else{
        return (
            <ReceiveMessage linkify={linkify} message={message}/>
        );
    }
}

const MessageRoom = ({messages, isMobile}: {messages: {type: boolean, message: string}[], isMobile?: boolean}) => {
    const divRef = useRef();
    const scrollToElement = () => {
        const {current} = divRef
         if (current !== null && current !== undefined){
            //@ts-ignore
           current.scrollIntoView({behavior: "smooth"})
         }
      }
    useEffect(scrollToElement, [messages])
  if(isMobile){
    return (
        <div className='w-full overflow-y-auto pt-12 pb-24 pl-5 pr-5'>
            {messages.map((message, index)=>(
                <Message key={index} type={message.type} message={message.message}/>
            ))}
            <div className='mt-4' ref={divRef as any} />
        </div>
      )
  }else{
    return (
        <div className='w-full h-[400px] overflow-y-auto pl-5 pr-5'>
            {messages.map((message, index)=>(
                <Message key={index} type={message.type} message={message.message}/>
            ))}
            <div className='mt-4' ref={divRef as any} />
        </div>
      )
  }
}

export default MessageRoom