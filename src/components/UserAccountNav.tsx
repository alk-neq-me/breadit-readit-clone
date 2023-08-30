import { User } from 'next-auth'

interface UserAccountNavProps {
  user: Pick<User, "name" | "image" | "email">
}

function UserAccountNav(props: UserAccountNavProps) {
  const {} = props;

  return (
    <div>UserAccountNav</div>
  )
}

export default UserAccountNav
