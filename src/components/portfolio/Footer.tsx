import BrandMark from '@/components/ethereal/BrandMark'
import { site } from '@/content/portfolio'


const Footer = () => (
  <footer className="relative px-6 pb-14 pt-4">
    <div className="mx-auto max-w-6xl">
      <div className="mx-auto mb-10 h-px w-full max-w-3xl bg-gradient-to-r from-transparent via-aurora-violet/40 to-transparent" />
      <div className="flex flex-col items-center justify-between gap-6 text-sm text-fog/80 md:flex-row">
        <div className="flex items-center gap-3">
          <BrandMark size={24} withHalo={false} />
          <span className="font-serif tracking-wide">{site.name}</span>
        </div>
        <p>&copy; {new Date().getFullYear()} {site.owner}. All rights reserved.</p>
        <a
          href="#home"
          className="rounded-full border border-mist/10 px-4 py-1.5 text-mist hover:bg-mist/[0.05] transition-colors"
        >
          ↑ Back to top
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
