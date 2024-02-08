'use client'
import { Loader2, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'

interface VerifyEmailProps {
    token: string
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
   
    if (false) {
        return (<div className='flex flex-col items-center gap-2'>
            <XCircle className='h-8 w-8 text-red-600' />
            <h3 className='font-semibold text-xl'>There was an issue</h3>
            <p className='text-muted-foreground text-sm'>
                This token is not valid or might be expired.
                Please try again
            </p>
        </div>)
    }

    if (true) {
        return (
            <div className='flex h-full flex-col items-center justify-center'>
                <div className='relative mb-4 h-[200px] w-[200px] md:h-[200px] md:w-[200px] text-muted-foreground'>
                    <Image src="/3.png" fill alt="the email was sent" />
                </div>
                <h3 className='font-semibold text-2xl'>You&apos;re all set</h3>
                <p className='text-muted-foreground text-center mt-1'>Thank you for verifying your email.</p>
                <Link href='/sign-in' className={buttonVariants({ className: "mt-4" })}>Sign in</Link>
            </div>
        )
    }

    if (false) {
        return (<div className='flex flex-col items-center gap-2'>
            <Loader2 className=' animate-spin h-8 w-8 text-zinc-300' />
            <h3 className='font-semibold text-xl'>Verifying...</h3>
            <p className='text-muted-foreground text-sm'>
                This won&apos;t take long.
            </p>
        </div>)
    }
}

export default VerifyEmail