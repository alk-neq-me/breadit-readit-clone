"use client"

import { usePathname, useRouter } from "next/navigation"
import { Session } from 'next-auth'
import UserAvatar from "./UserAvatar"
import { Input } from "./ui/Input"
import { Button } from "./ui/Button"
import { ImageIcon, Link2 } from "lucide-react"

interface MiniCreatePostProps {
  session: Session | null
}

function MiniCreatePost(props: MiniCreatePostProps) {
  const { session } = props
  const router = useRouter()
  const pathname = usePathname()

  return <li className="overflow-hidden rounded-md bg-white shadow">
    <div className="hfull px-6 py-4 sm:flex sm:justify-between gap-6">
      <div className="relative">
        <UserAvatar user={{
          name: session?.user?.name || null,
          image: session?.user?.image || null
        }} />
        <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white"></span>
      </div>

      <Input 
        readOnly
        onClick={() => router.push(pathname + "/submit")}
        placeholder="Create post"
      />

      <Button
        onClick={() => router.push(pathname + "/submit")}
        variant="ghost"
      >
        <ImageIcon className="text-zinc-600" />
      </Button>

      <Button
        onClick={() => router.push(pathname + "/submit")}
        variant="ghost"
      >
        <Link2 className="text-zinc-600" />
      </Button>
    </div>
  </li>
}

export default MiniCreatePost
