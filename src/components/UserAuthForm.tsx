"use client"

import { HTMLAttributes, useState } from "react";
import { signIn } from 'next-auth/react';

import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { Icons } from "./Icons";
import { useToast } from "@/hooks/use-toast";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
}

function UserAuthForm(props: UserAuthFormProps) {
  const { className, ...rest } = props;
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setIsLoading(true);
    // await Promise.reject(new Error("Test Error"))
    await signIn("google")
      .catch((err) => toast({
        title: "Failed Sign In",
        description: err?.message ?? "undefined error",
        variant: 'destructive'
      }))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className={cn("flex justify-center", className)} {...rest}>
      <Button 
        size="sm" 
        onClick={loginWithGoogle} 
        isLoading={isLoading} 
        className="w-full"
      >
        {isLoading ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
    </div>
  )
}

export default UserAuthForm;
