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
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { DoorOpen, RotateCw } from "lucide-react";
import MessageRoom from "@/components/MessageRoom";
import MessageSender from "@/components/MessageSender";
import {io} from 'socket.io-client'
import { useEffect, useRef, useState } from "react";
import crypto from 'crypto';
import useMediaQuery from "@/hooks/use-media-query";
import GifComponent from "@/components/GifComponent";
import { DialogClose } from "@radix-ui/react-dialog";
const socket = io("https://stud-explorer.onrender.com");

export default function Home() {
    const [messageList, setMessageList] = useState<{type: boolean, message: string}[]>([]);
    const [room, setRoom] = useState("");
    const roomRef = useRef(room);
    const [info, setInfo] = useState(false);
    const [roomHistory, setRoomHistory] = useState<any | never | unknown>([]);
    const [active, setActive] = useState(false);
    const mobile = useMediaQuery("(min-width: 880px)");
    const sendMessage = (message: string)=>{
      const language = localStorage.getItem("studexplorer_language");
        socket.emit("send_message", {room, message, language: language ? language : "en"});
    }

    const requestRoom = async () =>{
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
          rooms: roomHistory
        })
      })

      if(!response.ok){
        alert("ab")
      }

      const value = await response.json();

      return value;
      
    }

    const leaveRoom = async () =>{
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
          rooms: roomHistory
        })
      })

      if(!response.ok){
        alert("ab")
      }

      const value = await response.json();

      return value;
      
    }



    useEffect(()=>{
      requestRoom().then((value)=>{
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
    }, [])

    useEffect(()=>{
          const evenAction = (data: any)=>{
            console.log(data);
            setMessageList((prev)=>{
                const newArray = [...prev];
                newArray.push({
                    type: false,
                    message: data
                });
                return newArray;
            })
        }

          const evenSubAction = (data: any)=>{
            if(data === roomRef.current){
              setActive(true);
            }
        }

        const leftChatAction = (data: any)=>{
          if(data === roomRef.current){
            setActive(false);
            setMessageList([]);
          }
      }

      const onUserLeftChatAction = (data: any)=>{
        if(data === roomRef.current){
          setInfo(true);
        }
    }

        socket.on("receive_message", evenAction)
        socket.on("joined_chat", evenSubAction)
        socket.on("left_chat", leftChatAction)
        socket.on("user_left_chat", onUserLeftChatAction)

        return () => {
          socket.off("receive_message", evenAction);
          socket.off("joined_chat", evenSubAction);
          socket.off("left_chat", leftChatAction);
          socket.off("user_left_chat", onUserLeftChatAction)
        }
    }, [socket])
  return (
   <div className="w-full h-[500px] mt-[80px] md:mt-[140px] flex flex-col space-y-8 justify-center items-center">
     <Card className="w-[350px] md:w-[450px]">
      <CardContent className="pt-8 pb-8">
        {
          room.trim().length > 0 && (
            <div className="flex flex-row justify-between">
            <Button variant="outline" className="rounded-full">
                {
                  !mobile ? "chat_"+room.substring(0, 5)+"..." : "chat_"+room
                }
            </Button>
            <Button onClick={()=>{
              setRoom("");
              setActive(false);
              setMessageList([]);
              leaveRoom().then((leaveResult)=>{
                if(leaveResult.success){
                  socket.emit("leave_room", room);
                  requestRoom().then((value)=>{
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
            }} variant="ghost">
                <RotateCw/>
            </Button>
            </div>
          ) 
        }
        <MessageRoom messages={messageList}/>
        <MessageSender sendMessage={sendMessage} messageList={setMessageList}/>
      </CardContent>
    </Card>
    <Dialog open={room === "" || active === false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Finding Conversation</DialogTitle>
          <DialogDescription>
            Please wait while we find you a conversation
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <GifComponent/>
          <p>Searching for a conversation </p>
        </div>
      </DialogContent>
    </Dialog>
    <Dialog open={info} onOpenChange={setInfo}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chat Ended</DialogTitle>
          <DialogDescription>
            It{"'"}s time to change chat
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p>
            The previous chat has come to an end, click the button to join another chat
            </p>
        </div>
        <DialogClose>
          <Button onClick={()=>{
            setRoom("");
            setActive(false);
            setMessageList([]);
            leaveRoom().then((leaveResult)=>{
              if(leaveResult.success){
                socket.emit("leave_room", room);
                requestRoom().then((value)=>{
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
          }}>Acknowledge</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
   </div>
  );
}
