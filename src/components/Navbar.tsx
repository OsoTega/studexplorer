"use client"
import React from 'react'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import { Button } from './ui/button'
import { HelpCircle, RotateCw } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import Link from 'next/link'
import useMediaQuery from '@/hooks/use-media-query'
import MobileNav from './MobileNav'

const Navbar = () => {
  const {user, isLoaded} = useUser()
  const isDesktop = useMediaQuery("(min-width: 740px)");
  if(isDesktop){
    return(
      <div className='w-full flex flex-row pt-4 justify-between'>
        <div>
            <Image src="/StudExplorer-logos_black.png" 
            width={50} height={50} alt='logo'/>
        </div>
        <div className='flex flex-row space-x-10'>
          {
            isLoaded && user && (
              <UserButton afterSignOutUrl='/'/>
            )
          }
          <AlertDialog>
          <AlertDialogTrigger asChild>
          <Button variant="outline"><HelpCircle/></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Welcome to StudExplorer</AlertDialogTitle>
              <AlertDialogDescription>
                This is an anonymous chatting system, where anyone of any language,
                can freely chat anonymously with anyone. This system is designed by
                a Swansea University students for Swansea students. Here are some 
                instructions you should follow<br></br><br></br>
                1{")"} When you{"'"}re through with a chat, click on the <RotateCw/> icon, to chat with someone else.<br></br><br></br>
                2{")"} When the app says {'"Finding Conversation"'}, please wait patiently, you{"'"}ll get someone in time<br></br><br></br>
                3{")"} It{"'"}s very important to select a language, so every message you receive would be converted to the language you understand. Use the option menu on this page to select a language<br></br><br></br>
                4{")"} Please be polite with each other, anonymousity is not a license to hurt someone{"'"}s feelings
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Ok</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        </div>
    </div>
    )
  }
}

export default Navbar