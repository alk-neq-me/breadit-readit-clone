import { HTMLAttributes } from "react";

import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
}

function UserAuthForm(props: UserAuthFormProps) {
  const { className, ...rest } = props;

  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button size="sm" className="w-full">Google</Button>
    </div>
  )
}

export default UserAuthForm;
