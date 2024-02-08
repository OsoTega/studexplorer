import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import useMediaQuery from "@/hooks/use-media-query"
import { useState } from "react"
import languages from "@/lib/languages"
 
type Status = {
  value: string
  label: string
}
 
export function ResponsiveSelect({languages}: {languages: any}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedLanguage, setSelectedLanguage] = useState("Language")
 
  if (isDesktop) {
    return (
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
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[310px] justify-start">
          {selectedLanguage}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedLanguage={setSelectedLanguage} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
 
function StatusList({
  setOpen,
  setSelectedLanguage,
}: {
  setOpen: (open: boolean) => void
  setSelectedLanguage: (status: string) => void
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter languages..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {languages.map((language: any, index: number) => (
            <CommandItem
              key={index}
              value={language.language}
              onSelect={(value) => {
                setSelectedLanguage(
                  value
                )
                setOpen(false)
                localStorage.setItem("studexplorer_language", language.code);
              }}
            >
              {language.language}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}