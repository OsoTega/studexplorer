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

export default function Home() {
    const router = useRouter();
  return (
   <div className="w-full h-[500px] mt-[80px] md:mt-[140px] flex flex-col space-y-8 justify-center items-center">
    <h1 className="text-[28px] font-bold">Select your language</h1>
    <p className="text-muted-foreground">This would influence the interpretation of messages you receive</p>
      <Select onValueChange={(e)=>{
        localStorage.setItem("studexplorer_language", e);
      }}>
            <SelectTrigger className="w-[310px]">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectLabel>Select a Language</SelectLabel>
                {languages.map((language: any, index: number)=>(
                    <SelectItem key={index} value={language.code}>{language.language}</SelectItem>
                ))}
                </SelectGroup>
            </SelectContent>
            </Select>
        <Button
        onClick={()=>{
            router.push('/chatroom')
        }}
        >Start Chatting</Button>
   </div>
  );
}
