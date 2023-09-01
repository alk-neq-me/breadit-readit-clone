interface PageProps {
  params: {
    slug: string
  }
}

function page(props: PageProps) {
  const { params } = props
  const name = params.slug

  return (
    <div>Subreaddit | {name}</div>
  )
}

export default page
