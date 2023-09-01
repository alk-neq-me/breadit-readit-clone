"use client"

import React, { startTransition } from 'react'
import { Button } from './ui/Button'
import { useMutation } from '@tanstack/react-query'
import { SubscribeToSubreadditPayload } from '@/lib/validators/subreaddit'
import axios, { AxiosError } from 'axios'
import { useCustomToast } from '@/hooks/use-custom-toast'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

interface SubscribeLeaveToggleProps {
  subreadditId: string
  subredditName: string
  isSubscribed: boolean
}

function SubscribeLeaveToggle(props: SubscribeLeaveToggleProps) {
  const { subreadditId, subredditName, isSubscribed } = props
  const router = useRouter()

  const { loginToast } = useCustomToast()

  const {
    mutate: subscribe,
    isLoading: isSubLoading
  } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubreadditPayload = {
        subreadditId
      }
      const { data } = await axios.post<string>("/api/subreaddit/subscribe", payload)
      return data
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: "There was an problem",
        description: "Something went wrong, please try agin",
        variant: "destructive"
      })
    },

    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      return toast({
        title: "Subscribed",
        description: `You are now subscribed r/${subredditName}`
      })
    }
  })

  const {
    mutate: unsubscribe,
    isLoading: isUnsubLoading
  } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubreadditPayload = {
        subreadditId
      }
      const { data } = await axios.post<string>("/api/subreaddit/unsubscribe", payload)
      return data
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: "There was an problem",
        description: "Something went wrong, please try agin",
        variant: "destructive"
      })
    },

    onSuccess: () => {
      startTransition(() => {
        router.refresh()
      })

      return toast({
        title: "UnSubscribed",
        description: `You are now unsubscribed r/${subredditName}`
      })
    }
  })

  return isSubscribed ? 
    <Button 
      isLoading={isUnsubLoading}
      className='w-full mt-1 mb-4'
      onClick={() => unsubscribe()}
    >Leave Community</Button> : 
    <Button 
      isLoading={isSubLoading}
      className='w-full mt-1 mb-4'
      onClick={() => subscribe()}
    >Join to post</Button>
}

export default SubscribeLeaveToggle
