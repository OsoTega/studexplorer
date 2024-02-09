import React from 'react'
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
  import GifComponent from "@/components/GifComponent";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCw } from "lucide-react";
import MessageRoom from "@/components/MessageRoom";
import MessageSender from "@/components/MessageSender";
import { useRouter } from "next/navigation";
import { Socket } from 'socket.io-client';
import { ResponsiveChatType } from '@/types/utils';

const DesktopChatView = ({
    setRoom, 
    setActive,
    setMessageList,
    leaveRoom,
    setUserTyping,
    socket,
    room,
    userTyping,
    roomRef,
    requestRoom,
    setRoomHistory,
    info,
    setInfo,
    userId,
    active,
    messageList,
    onTyping,
    sendMessage
}: ResponsiveChatType) => {
    const router = useRouter();
  return (
    <div className="w-full h-[500px] mt-[140px] md:mt-[140px] flex flex-col space-y-8 justify-center items-center">
    <Button onClick={()=>{
      setRoom("");
      setActive(false);
      setMessageList([]);
      leaveRoom().then((leaveResult)=>{
        if(leaveResult.success){
          setUserTyping(false);
          socket.emit("leave_room", room);
          router.replace("/");
        }
      })
    }} className="self-start" variant="outline">
    <ArrowLeft/>
    </Button>
     <Card className="w-[350px] md:w-[450px]">
      <CardContent className="pt-8 pb-8">
        {
          room.trim().length > 0 && (
            <div className="flex flex-row items-center justify-between">
            <Button variant="outline" className="rounded-full">
                {
                  "chat_"+room
                }
            </Button>
            {userTyping && (
              <p className="text-muted-foreground text-[12px]">Typing...</p>
            )}
            <Button onClick={()=>{
              setRoom("");
              setActive(false);
              setMessageList([]);
              leaveRoom().then((leaveResult)=>{
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
            }} variant="ghost">
                <RotateCw/>
            </Button>
            </div>
          ) 
        }
        <MessageRoom messages={messageList}/>
        <MessageSender onTyping={onTyping} sendMessage={sendMessage} messageList={setMessageList}/>
      </CardContent>
    </Card>
    <Dialog open={/*room === "" || active === false*/ false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Finding Conversation</DialogTitle>
          <DialogDescription>
            Please wait while we find you a conversation
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <GifComponent/>
          <p className="text-center">Searching for a conversation </p>
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
          }}>Acknowledge</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
   </div>
  )
}

export default DesktopChatView