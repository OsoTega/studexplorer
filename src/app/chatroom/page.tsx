"use client"
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCw } from "lucide-react";
import MessageRoom from "@/components/MessageRoom";
import MessageSender from "@/components/MessageSender";
import {io} from 'socket.io-client'
import { useEffect, useRef, useState } from "react";
import crypto from 'crypto';
import useMediaQuery from "@/hooks/use-media-query";
import GifComponent from "@/components/GifComponent";
import { useRouter } from "next/navigation";
import DesktopChatView from "@/components/DesktopChatView";
import MobileChatView from "@/components/MobileChatView";
const socket = io("https://stud-explorer.onrender.com");

export default function Home() {
    const [messageList, setMessageList] = useState<{type: boolean, message: string}[]>([]);
    const [room, setRoom] = useState("");
    const [userId, setUserId] = useState("");
    const [userTyping, setUserTyping] = useState(false);
    const router = useRouter();
    const roomRef = useRef(room);
    const [info, setInfo] = useState(false);
    const [roomHistory, setRoomHistory] = useState<any | never | unknown>([]);
    const [active, setActive] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 740px)");
    const sendMessage = (message: string)=>{
      const language = localStorage.getItem("studexplorer_language");
        socket.emit("send_message", {room, message, language: language ? language : "en"});
    }

    const onTyping = (type: string)=>{
        socket.emit(type, {room});
    }

    const requestRoom = async (id?: string) =>{
      const language = localStorage.getItem("studexplorer_language");
      const response = await fetch('https://stud-explorer.onrender.com/create-room', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room,
          language: language ? language : "en",
          rooms: roomHistory,
          id
        })
      })

      if(!response.ok){
        alert("ab")
      }

      const value = await response.json();

      return value;
      
    }

    const leaveRoom = async (exiting: boolean) =>{
      if(room.length === 0) return {success: true};
      const language = localStorage.getItem("studexplorer_language");
      const response = await fetch('https://stud-explorer.onrender.com/leave-room', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room,
          language: language ? language : "en",
          rooms: roomHistory,
          id: userId,
          exiting
        })
      })

      if(!response.ok){
        alert("ab")
      }

      const value = await response.json();

      return value;
      
    }

    useEffect(() => {
      if ("serviceWorker" in navigator) {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
          })
          .catch((error) => {
          });
      }
    }, []);



    useEffect(()=>{
      const id = crypto.randomBytes(16).toString("hex");
      requestRoom(id).then((value)=>{
        setRoom(value.roomId);
        roomRef.current = value.roomId;
        setActive(value.active);
        setRoomHistory((prev: any)=>{
          const newRoom = [...prev];
          newRoom.push(value.roomId);
          return newRoom;
        })
        setUserId(id);

        socket.emit("join_room", value.roomId);
      });
    }, [])

    useEffect(()=>{
      const sound = new Audio("/sounds/message.mp3")
      function vibrate() {
        if (!window) {
            return;
        }
    
        if (!window.navigator) {
            return;
        }
    
        if (!window.navigator.vibrate) {
            return;
        }
    
        window.navigator.vibrate(800);
    }
          const evenAction = (data: any)=>{
            sound.play();
            vibrate()
            setMessageList((prev)=>{
                const newArray = [...prev];
                newArray.push({
                    type: false,
                    message: data
                });
                return newArray;
            })
            setUserTyping(false);
        }

          const evenSubAction = (data: any)=>{
            vibrate()
            if(data === roomRef.current){
              setActive(true);
            }
        }

        const leftChatAction = (data: any)=>{
          vibrate()
          if(data === roomRef.current){
            setRoom("");
            setActive(false);
            setMessageList([]);
          }
      }

      const onUserLeftChatAction = (data: any)=>{
        setRoom("");
            setActive(false);
            setMessageList([]);
            leaveRoom(false).then((leaveResult)=>{
              if(leaveResult.success){
                setUserTyping(false);
                socket.emit("leave_room", room);
                requestRoom(userId).then((value)=>{
                  setRoom(value.roomId);
                  roomRef.current = value.roomId;
                  setActive(value.active);
                  setRoomHistory((prev: any)=>{
                    const newRoom = [...prev];
                    newRoom.push(value.roomId);
                    return newRoom;
                  })
          
                  socket.emit("join_room", value.roomId);
                });
              }
            })
    }

        const onUserChatTyping = (data: any)=>{
            setUserTyping(true);
      }

      const onUserChatNotTyping = (data: any)=>{
        setUserTyping(false);
  }

        socket.on("receive_message", evenAction)
        socket.on("joined_chat", evenSubAction)
        socket.on("left_chat", leftChatAction)
        socket.on("user_left_chat", onUserLeftChatAction)
        socket.on("user_typing", onUserChatTyping)
        socket.on("user_not_typing", onUserChatNotTyping)

        return () => {
          socket.off("receive_message", evenAction);
          socket.off("joined_chat", evenSubAction);
          socket.off("left_chat", leftChatAction);
          socket.off("user_left_chat", onUserLeftChatAction)
          socket.off("user_typing", onUserChatTyping)
          socket.off("user_not_typing", onUserChatNotTyping)
        }
    }, [socket])
  if(isDesktop){
    return (
      <DesktopChatView 
      setRoom={setRoom}
      setActive={setActive}
      setMessageList={setMessageList}
      leaveRoom={leaveRoom}
      setUserTyping={setUserTyping}
      socket={socket}
      room={room}
      userTyping={userTyping}
      roomRef={roomRef}
      requestRoom={requestRoom}
      setRoomHistory={setRoomHistory}
      info={info}
      setInfo={setInfo}
      userId={userId}
      active={active}
      messageList={messageList}
      onTyping={onTyping}
      sendMessage={sendMessage}
      />
    )
  }else{
    return(
      <MobileChatView
      setRoom={setRoom}
      setActive={setActive}
      setMessageList={setMessageList}
      leaveRoom={leaveRoom}
      setUserTyping={setUserTyping}
      socket={socket}
      room={room}
      userTyping={userTyping}
      roomRef={roomRef}
      requestRoom={requestRoom}
      setRoomHistory={setRoomHistory}
      info={info}
      setInfo={setInfo}
      userId={userId}
      active={active}
      messageList={messageList}
      onTyping={onTyping}
      sendMessage={sendMessage}
      />
    )
  }
}
