import MiniCreatePost from "@/components/MiniCreatePost"
import PostFeed from "@/components/PostFeed"
import { INFINITY_SCROLLING_PAGINATION_RESULT } from "@/config"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"

interface PageProps {
  params: {
    slug: string
  }
}

async function page(props: PageProps) {
  const { params } = props
  const session = await getAuthSession()
  const subreaddit = await db.subreddit.findFirst({
    where: {
      name: params.slug,
    },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          subreddit: true
        },
        take: INFINITY_SCROLLING_PAGINATION_RESULT
        // take: 10
      },
    }
  })

  if (!subreaddit) return notFound()

  return (
    <>
      <h1 className="font-bold text-3xl md:text-4xl h-14">
        r/{subreaddit.name}
      </h1>
      <MiniCreatePost session={session} />
      <PostFeed 
        // @ts-ignore
        initialPosts={subreaddit.posts} 
        subredditName={subreaddit.name} 
      />
    </>
  )
}

export default page
