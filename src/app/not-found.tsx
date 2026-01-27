import Link from 'next/link'


export const runtime = 'edge'

export default function NotFound() {
  return (
    <div>
      <div>Page not found</div>
      <Link href="/">Go home</Link>
    </div>
  )
}
