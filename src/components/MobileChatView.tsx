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
import Image from 'next/image'
import { useRouter } from "next/navigation";
import { Socket } from 'socket.io-client';
import { ResponsiveChatType } from '@/types/utils';
import { useUser, UserButton } from '@clerk/nextjs';
import MobileNav from './MobileNav';
import Link from 'next/link';


const MobileChatView = ({ 
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
    const {user, isLoaded} = useUser()
  return (
    <>
    <div className='w-full border-b-[1px] pl-2 pr-2 fixed bg-white top-0 left-0 pb-2 flex flex-row pt-2 items-center justify-between'>
          <div>
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
          </div>
            {/* {
              isLoaded && user && (
                <UserButton afterSignOutUrl='/'/>
              )
            } */}
            <Link href="/" className='cursor-pointer'>
              <Image src="/StudExplorer-logos_black.png" 
              width={50} height={50} alt='logo'/>
            </Link>
            <MobileNav/>
      </div>
    <div className="w-full h-fit mt-[40px] pl-2 pr-2 fixed top-0 left-0 flex flex-col space-y-8 justify-center items-center">
     <div className="w-full pt-8 pb-8">
     {
          room.trim().length > 0 && (
            <div className="flex flex-row items-center justify-between">
            <Button variant="outline" className="rounded-full">
                {
                  "chat_"+room.substring(0, 5)+"..."
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
    </div>
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
    </>
  )
}

export default MobileChatView