import { Socket } from "socket.io-client"

export interface ResponsiveChatType{
    setRoom: React.Dispatch<React.SetStateAction<string>>
    setActive: React.Dispatch<React.SetStateAction<boolean>>
    setMessageList: React.Dispatch<React.SetStateAction<{type: boolean, message: string}[]>>
    leaveRoom: () => Promise<any>
    setUserTyping: React.Dispatch<React.SetStateAction<boolean>>
    socket: Socket
    room: string
    userTyping: boolean
    roomRef: React.MutableRefObject<string>
    requestRoom: (id?: string) => Promise<any>
    setRoomHistory: React.Dispatch<React.SetStateAction<any[] | never[] | unknown[]>>
    info: boolean
    setInfo: React.Dispatch<React.SetStateAction<boolean>>
    userId: string
    active: boolean
    messageList: {type: boolean, message: string}[]
    onTyping: (type: string) => void
    sendMessage: (message: string) => void
}