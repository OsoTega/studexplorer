'use client'
import React, { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { LucideFolderOpenDot, Menu } from 'lucide-react'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import Image from 'next/image'

const MobileNav = () => {

    const [isMounted, setIsMounted] = useState(false);

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
                        You Hello
                    </SheetTitle>
                </SheetHeader>
                <SheetTrigger>
                        <Link href='/projects' className={buttonVariants({
                            variant: "link",
                            size: "sm",
                            className: "text-sm text-muted-foreground"
                        })}>
                            See some projects
                        </Link>
                    </SheetTrigger>
            </SheetContent>
        </Sheet>
    )
}

export default MobileNav