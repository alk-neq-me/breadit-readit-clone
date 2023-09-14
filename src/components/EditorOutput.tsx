import dynamic from "next/dynamic"
import Image from 'next/image'

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default, {
    ssr: false
  }
)

interface EditorOutputProps {
  content: any
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: '1.25'
  }
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer
}

function EditorOutput(props: EditorOutputProps) {
  const { content } = props

  return <Output data={content} style={style} clasName="text-sm" renderers={renderers}
  />
}

function CustomCodeRenderer({ data }: any) {
  const src = data.file.url
  return <div className="bg-gray-800 rounded-md p-4">
    <code className="text-gray-100 text-sm">{data.code}</code>
  </div>
}

function CustomImageRenderer({ data }: any) {
  const src = data.file.url
  return <div className="relative w-full min-h-[15rem]">
    <Image alt="image" className="object-contain" fill src={src} />
  </div>
}

export default EditorOutput
