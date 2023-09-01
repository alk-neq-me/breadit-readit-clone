import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubreadditSubscriptionValidator } from "@/lib/validators/subreaddit";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { subreadditId } = SubreadditSubscriptionValidator.parse(body)

    const subscriptionExists = await db.subscription.findFirst({
      where: {
        subredditId: subreadditId,
        userId: session.user.id
      }
    })

    if (subscriptionExists) return new Response("You are already subscribed to this subreddit", { status: 400 })

    await db.subscription.create({
      data: {
        subredditId: subreadditId,
        userId: session.user.id
      }
    })

    return new Response(subreadditId)
  } catch (err) {
    if (err instanceof ZodError) {
      return new Response("Invalid request data passed", { status: 422 })
    }

    return new Response("Could not subscribe, please try again later", { status: 500 })
  }
}

