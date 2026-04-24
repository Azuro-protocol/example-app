import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Admin · Ethereal',
  robots: { index: false, follow: false },
}

const AdminLayout = ({ children }: { children: React.ReactNode }) => <>{children}</>

export default AdminLayout
