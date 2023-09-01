import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubreadditValidator } from "@/lib/validators/subreaddit";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) return new Response("Unauthorized", { status: 401 })

    const body = await req.json()
    const { name } = SubreadditValidator.parse(body)

    const subreadditExists = await db.subreddit.findFirst({
      where: {
        name
      }
    })
    if (subreadditExists) return new Response("Subreaddit already exists", { status: 409 })

    const subreddit = await db.subreddit.create({
      data: {
        name,
        creatorId: session.user.id
      }
    })

    await db.subscription.create({
      data: {
        userId: session.user.id,
        subredditId: subreddit.id
      }
    })

    return new Response(subreddit.name)
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response(err.message, { status: 422 })
    }

    return new Response("Could not create subreddit", { status: 500 })
  }
}
