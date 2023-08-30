import { User } from 'next-auth'
import Image from 'next/image'
import { Avatar, AvatarFallback } from './ui/Avatar'
import { Icons } from './Icons';
import { AvatarProps } from '@radix-ui/react-avatar';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">
}

function UserAvatar(props: UserAvatarProps) {
  const { user, ...rest } = props;

  return <Avatar {...rest}>
    {user.image ? <div className='relative aspect-square w-full'>
      <Image fill src={user.image} alt='profile picture' referrerPolicy='no-referrer' />
    </div> : <AvatarFallback>
      <span className='sr-only'>{user.name}</span>
      <Icons.user className='h-4 w-4' />
    </AvatarFallback>
    }
  </Avatar>
}

export default UserAvatar
