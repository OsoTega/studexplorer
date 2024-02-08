"use client"
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button";
import { DoorOpen, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import languages from '@/lib/languages'
import { ResponsiveSelect } from "@/components/ResponsiveSelect";

export default function Home() {
    const router = useRouter();
  return (
   <div className="w-full h-[500px] mt-[80px] md:mt-[140px] flex flex-col space-y-8 justify-center items-center">
    <h1 className="text-[28px] font-bold">Select your language</h1>
    <p className="text-muted-foreground text-center md:text-start ">This would influence the interpretation of messages you receive</p>
      <ResponsiveSelect languages={languages}/>
        <Button
        onClick={()=>{
            router.push('/chatroom')
        }}
        >Start Chatting</Button>
   </div>
  );
}
