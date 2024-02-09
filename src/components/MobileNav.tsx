'use client'
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { LucideFolderOpenDot, Menu, RotateCw } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import Image from 'next/image'
import { useUser, UserButton } from '@clerk/nextjs'
import { ScrollArea } from './ui/scroll-area'

const MobileNav = () => {

    const [isMounted, setIsMounted] = useState(false);
    const {user, isLoaded} = useUser()

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const fee = 1;

    return (
        <Sheet>
            <SheetTrigger className='group -m-2 flex items-center p-2'>
            <Button variant="outline"><Menu/></Button>
            </SheetTrigger>
            <SheetContent className='flex w-full flex-col pr-0 sm:max-w-lg'>
                <SheetHeader className='space-y-2.5 pr-6'>
                    <SheetTitle>
                        Hello
                    </SheetTitle>
                </SheetHeader>
                   <ScrollArea>
                   {
                        isLoaded && user && (
                       <div className='flex flex-row items-center space-x-4'>
                        <UserButton afterSignOutUrl='/'/>
                        <p className='text-[14px]'>Manage your account</p>
                       </div>
                        )
                    }
                    <div className='w-full mt-4 border-t-[1px]'/>
                    <p className='mt-4 text-muted-foreground'>
                    This is an anonymous chatting system, where anyone of any language,
                    can freely chat anonymously with anyone. This system is designed by
                    a Swansea University students for Swansea students. Here are some 
                    instructions you should follow<br></br><br></br>
                    1{")"} When you{"'"}re through with a chat, click on the <RotateCw/> icon, to chat with someone else.<br></br><br></br>
                    2{")"} When the app says {'"Finding Conversation"'}, please wait patiently, you{"'"}ll get someone in time<br></br><br></br>
                    3{")"} It{"'"}s very important to select a language, so every message you receive would be converted to the language you understand. Use the option menu on this page to select a language<br></br><br></br>
                    4{")"} Please be polite with each other, anonymousity is not a license to hurt someone{"'"}s feelings
                    </p>
                    <div className='w-full mt-4 border-t-[1px]'/>
                    <div className='text-center mt-4 mb-[40px]'>
                    <p className='text-muted-foreground'>
                        This is a non-profit service to students of Swansea University, 
                        any profit made goes <br></br> back into making the service better, FEEL FREE TO DONATE,
                        AWS IS NOT CHEAP  😁😁😁
                    </p>
                    <p>
                        &copy; {new Date().getFullYear()}
                    </p>
                </div>
                   </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav