'use client'

import { useEffect, useState } from 'react'
import GlowText from '@/components/ethereal/GlowText'
import { content as seed, type PortfolioContent, type Service, type Testimonial, type Work } from '@/content/portfolio'


const DRAFT_KEY = 'ethereal-admin-draft'
const AUTH_KEY = 'ethereal-admin-auth'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'ethereal'

const emptyWork: Work = { title: '', summary: '', tags: [] }
const emptyService: Service = { title: '', description: '', icon: 'spark' }
const emptyTestimonial: Testimonial = { quote: '', author: '', role: '' }

const iconOptions = [ 'spark', 'orbit', 'prism', 'weave' ]

const cloneSeed = (): PortfolioContent => JSON.parse(JSON.stringify(seed))

type TabKey = 'site' | 'about' | 'services' | 'work' | 'testimonials'

const tabs: { key: TabKey; label: string }[] = [
  { key: 'site', label: 'Site' },
  { key: 'about', label: 'About' },
  { key: 'services', label: 'Services' },
  { key: 'work', label: 'Work' },
  { key: 'testimonials', label: 'Voices' },
]

const fieldCls =
  'w-full rounded-xl border border-mist/10 bg-void/40 px-4 py-2.5 text-mist placeholder-fog/50 outline-none focus:border-aurora-violet/60 focus:shadow-glow text-sm'

const labelCls = 'block mb-2 text-xs uppercase tracking-[0.3em] text-fog/80'

const sectionCardCls = 'frost aurora-border rounded-2xl p-5 space-y-4'

const AdminPage = () => {
  const [ authed, setAuthed ] = useState(false)
  const [ pw, setPw ] = useState('')
  const [ pwError, setPwError ] = useState(false)
  const [ draft, setDraft ] = useState<PortfolioContent | null>(null)
  const [ tab, setTab ] = useState<TabKey>('site')
  const [ savedFlash, setSavedFlash ] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (sessionStorage.getItem(AUTH_KEY) === '1') setAuthed(true)
    try {
      const raw = localStorage.getItem(DRAFT_KEY)
      setDraft(raw ? (JSON.parse(raw) as PortfolioContent) : cloneSeed())
    }
    catch {
      setDraft(cloneSeed())
    }
  }, [])

  useEffect(() => {
    if (!draft) return
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
    }
    catch {}
  }, [ draft ])

  const submitPw = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1')
      setAuthed(true)
      setPwError(false)
    }
    else {
      setPwError(true)
    }
  }

  const exportJson = () => {
    if (!draft) return
    const json = JSON.stringify(draft, null, 2)
    const blob = new Blob([ json ], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'portfolio.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyJson = async () => {
    if (!draft) return
    await navigator.clipboard.writeText(JSON.stringify(draft, null, 2))
    setSavedFlash(true)
    setTimeout(() => setSavedFlash(false), 1800)
  }

  const importJson = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as PortfolioContent
        setDraft(parsed)
      }
      catch {
        alert('Invalid JSON file')
      }
    }
    reader.readAsText(file)
  }

  const resetDraft = () => {
    if (!confirm('Reset all local edits back to the deployed content?')) return
    const fresh = cloneSeed()
    setDraft(fresh)
    localStorage.removeItem(DRAFT_KEY)
  }

  if (!authed) {
    return (
      <section className="flex min-h-[100dvh] items-center justify-center px-6 pt-32 pb-24">
        <form
          onSubmit={submitPw}
          className="frost aurora-border w-full max-w-md rounded-3xl p-8 space-y-5"
        >
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-aurora-cyan/80">Admin</p>
            <h1 className="mt-3 font-serif text-3xl">
              <GlowText>Gatekeeper</GlowText>
            </h1>
            <p className="mt-3 text-sm text-whisper">
              Enter the password to unlock the content editor.
            </p>
          </div>
          <label className="block">
            <span className={labelCls}>Password</span>
            <input
              autoFocus
              type="password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value)
                setPwError(false)
              }}
              className={fieldCls}
              placeholder="••••••••"
            />
          </label>
          {pwError && (
            <p className="text-xs text-aurora-pink">That password didn't open the door.</p>
          )}
          <button
            type="submit"
            className="w-full rounded-full bg-aurora-grad px-6 py-3 text-sm font-medium text-void shadow-glow transition-transform hover:scale-[1.02]"
          >
            Enter
          </button>
          <p className="text-center text-[11px] text-fog/60">
            Set <code className="text-fog">NEXT_PUBLIC_ADMIN_PASSWORD</code> in your env to override the default.
          </p>
        </form>
      </section>
    )
  }

  if (!draft) return null

  const updateSite = (patch: Partial<PortfolioContent['site']>) =>
    setDraft({ ...draft, site: { ...draft.site, ...patch } })

  const updateAbout = (patch: Partial<PortfolioContent['about']>) =>
    setDraft({ ...draft, about: { ...draft.about, ...patch } })

  return (
    <section className="relative px-6 pt-32 pb-24">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-aurora-cyan/80">Admin</p>
            <h1 className="mt-2 font-serif text-4xl sm:text-5xl">
              <GlowText>Content Atelier</GlowText>
            </h1>
            <p className="mt-3 max-w-xl text-sm text-whisper">
              Edit any part of the portfolio below. Changes are saved to this browser as drafts.
              When you're happy, <span className="text-mist">Export</span> the JSON and commit it to
              <code className="mx-1 text-fog">src/content/portfolio.json</code>to go live.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copyJson}
              className="rounded-full border border-mist/15 bg-mist/5 px-4 py-2 text-xs text-mist hover:bg-mist/10 transition-colors"
            >
              {savedFlash ? 'Copied ✷' : 'Copy JSON'}
            </button>
            <button
              type="button"
              onClick={exportJson}
              className="rounded-full bg-aurora-grad px-4 py-2 text-xs font-medium text-void shadow-glow hover:scale-[1.03] transition-transform"
            >
              Download JSON
            </button>
            <label className="cursor-pointer rounded-full border border-mist/15 bg-mist/5 px-4 py-2 text-xs text-mist hover:bg-mist/10 transition-colors">
              Import
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) importJson(file)
                  e.target.value = ''
                }}
              />
            </label>
            <button
              type="button"
              onClick={resetDraft}
              className="rounded-full border border-aurora-pink/40 px-4 py-2 text-xs text-aurora-pink hover:bg-aurora-pink/10 transition-colors"
            >
              Reset
            </button>
          </div>
        </header>

        <nav className="mb-8 flex flex-wrap gap-1 rounded-full border border-mist/10 bg-void/40 p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                tab === t.key ? 'bg-aurora-grad text-void' : 'text-fog hover:text-mist'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="space-y-6">
          {tab === 'site' && (
            <div className={sectionCardCls}>
              <div className="grid gap-4 sm:grid-cols-2">
                <label>
                  <span className={labelCls}>Brand name</span>
                  <input
                    type="text"
                    value={draft.site.name}
                    onChange={(e) => updateSite({ name: e.target.value })}
                    className={fieldCls}
                  />
                </label>
                <label>
                  <span className={labelCls}>Your name</span>
                  <input
                    type="text"
                    value={draft.site.owner}
                    onChange={(e) => updateSite({ owner: e.target.value })}
                    className={fieldCls}
                  />
                </label>
                <label>
                  <span className={labelCls}>Role</span>
                  <input
                    type="text"
                    value={draft.site.role}
                    onChange={(e) => updateSite({ role: e.target.value })}
                    className={fieldCls}
                  />
                </label>
                <label>
                  <span className={labelCls}>Location</span>
                  <input
                    type="text"
                    value={draft.site.location}
                    onChange={(e) => updateSite({ location: e.target.value })}
                    className={fieldCls}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelCls}>Hero tagline</span>
                  <input
                    type="text"
                    value={draft.site.tagline}
                    onChange={(e) => updateSite({ tagline: e.target.value })}
                    className={fieldCls}
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className={labelCls}>Hero subcopy</span>
                  <textarea
                    value={draft.site.heroLead}
                    onChange={(e) => updateSite({ heroLead: e.target.value })}
                    rows={3}
                    className={fieldCls}
                  />
                </label>
                <label>
                  <span className={labelCls}>Contact email</span>
                  <input
                    type="email"
                    value={draft.site.email}
                    onChange={(e) => updateSite({ email: e.target.value })}
                    className={fieldCls}
                  />
                </label>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className={labelCls}>Social links</span>
                  <button
                    type="button"
                    onClick={() =>
                      updateSite({
                        socials: [ ...draft.site.socials, { label: '', href: '' } ],
                      })
                    }
                    className="text-xs text-aurora-cyan hover:text-mist"
                  >
                    + Add social
                  </button>
                </div>
                <div className="space-y-2">
                  {draft.site.socials.map((s, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={s.label}
                        onChange={(e) => {
                          const next = [ ...draft.site.socials ]
                          next[i] = { ...next[i], label: e.target.value }
                          updateSite({ socials: next })
                        }}
                        placeholder="Label"
                        className={`${fieldCls} max-w-[160px]`}
                      />
                      <input
                        type="url"
                        value={s.href}
                        onChange={(e) => {
                          const next = [ ...draft.site.socials ]
                          next[i] = { ...next[i], href: e.target.value }
                          updateSite({ socials: next })
                        }}
                        placeholder="https://..."
                        className={fieldCls}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateSite({
                            socials: draft.site.socials.filter((_, j) => j !== i),
                          })
                        }
                        className="rounded-xl border border-aurora-pink/40 px-3 text-xs text-aurora-pink hover:bg-aurora-pink/10"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'about' && (
            <div className={sectionCardCls}>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className={labelCls}>Paragraphs</span>
                  <button
                    type="button"
                    onClick={() =>
                      updateAbout({ body: [ ...draft.about.body, '' ] })
                    }
                    className="text-xs text-aurora-cyan hover:text-mist"
                  >
                    + Add paragraph
                  </button>
                </div>
                <div className="space-y-3">
                  {draft.about.body.map((p, i) => (
                    <div key={i} className="flex gap-2">
                      <textarea
                        rows={3}
                        value={p}
                        onChange={(e) => {
                          const next = [ ...draft.about.body ]
                          next[i] = e.target.value
                          updateAbout({ body: next })
                        }}
                        className={fieldCls}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateAbout({
                            body: draft.about.body.filter((_, j) => j !== i),
                          })
                        }
                        className="rounded-xl border border-aurora-pink/40 px-3 text-xs text-aurora-pink hover:bg-aurora-pink/10"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className={labelCls}>Quick facts</span>
                  <button
                    type="button"
                    onClick={() =>
                      updateAbout({
                        facts: [ ...draft.about.facts, { label: '', value: '' } ],
                      })
                    }
                    className="text-xs text-aurora-cyan hover:text-mist"
                  >
                    + Add fact
                  </button>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {draft.about.facts.map((f, i) => (
                    <div key={i} className="space-y-2 rounded-2xl border border-mist/10 bg-void/40 p-3">
                      <input
                        type="text"
                        value={f.value}
                        onChange={(e) => {
                          const next = [ ...draft.about.facts ]
                          next[i] = { ...next[i], value: e.target.value }
                          updateAbout({ facts: next })
                        }}
                        placeholder="Value"
                        className={fieldCls}
                      />
                      <input
                        type="text"
                        value={f.label}
                        onChange={(e) => {
                          const next = [ ...draft.about.facts ]
                          next[i] = { ...next[i], label: e.target.value }
                          updateAbout({ facts: next })
                        }}
                        placeholder="Label"
                        className={fieldCls}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateAbout({
                            facts: draft.about.facts.filter((_, j) => j !== i),
                          })
                        }
                        className="w-full rounded-xl border border-aurora-pink/40 py-1.5 text-xs text-aurora-pink hover:bg-aurora-pink/10"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'services' && (
            <div className="space-y-4">
              {draft.services.map((s, i) => (
                <div key={i} className={sectionCardCls}>
                  <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
                    <label>
                      <span className={labelCls}>Title</span>
                      <input
                        type="text"
                        value={s.title}
                        onChange={(e) => {
                          const next = [ ...draft.services ]
                          next[i] = { ...next[i], title: e.target.value }
                          setDraft({ ...draft, services: next })
                        }}
                        className={fieldCls}
                      />
                    </label>
                    <label>
                      <span className={labelCls}>Icon</span>
                      <select
                        value={s.icon}
                        onChange={(e) => {
                          const next = [ ...draft.services ]
                          next[i] = { ...next[i], icon: e.target.value }
                          setDraft({ ...draft, services: next })
                        }}
                        className={fieldCls}
                      >
                        {iconOptions.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className={labelCls}>Description</span>
                    <textarea
                      rows={3}
                      value={s.description}
                      onChange={(e) => {
                        const next = [ ...draft.services ]
                        next[i] = { ...next[i], description: e.target.value }
                        setDraft({ ...draft, services: next })
                      }}
                      className={fieldCls}
                    />
                  </label>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          services: draft.services.filter((_, j) => j !== i),
                        })
                      }
                      className="text-xs text-aurora-pink hover:underline"
                    >
                      Remove service
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setDraft({ ...draft, services: [ ...draft.services, { ...emptyService } ] })}
                className="w-full rounded-2xl border border-dashed border-mist/20 py-4 text-sm text-fog hover:border-aurora-violet/50 hover:text-mist transition-colors"
              >
                + Add a service
              </button>
            </div>
          )}

          {tab === 'work' && (
            <div className="space-y-4">
              {draft.work.map((w, i) => (
                <div key={i} className={sectionCardCls}>
                  <label className="block">
                    <span className={labelCls}>Title</span>
                    <input
                      type="text"
                      value={w.title}
                      onChange={(e) => {
                        const next = [ ...draft.work ]
                        next[i] = { ...next[i], title: e.target.value }
                        setDraft({ ...draft, work: next })
                      }}
                      className={fieldCls}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Summary</span>
                    <textarea
                      rows={2}
                      value={w.summary}
                      onChange={(e) => {
                        const next = [ ...draft.work ]
                        next[i] = { ...next[i], summary: e.target.value }
                        setDraft({ ...draft, work: next })
                      }}
                      className={fieldCls}
                    />
                  </label>
                  <label className="block">
                    <span className={labelCls}>Tags (comma-separated)</span>
                    <input
                      type="text"
                      value={w.tags.join(', ')}
                      onChange={(e) => {
                        const next = [ ...draft.work ]
                        next[i] = {
                          ...next[i],
                          tags: e.target.value
                            .split(',')
                            .map((t) => t.trim())
                            .filter(Boolean),
                        }
                        setDraft({ ...draft, work: next })
                      }}
                      className={fieldCls}
                    />
                  </label>
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={i === 0}
                        onClick={() => {
                          const next = [ ...draft.work ]
                          ;[ next[i - 1], next[i] ] = [ next[i], next[i - 1] ]
                          setDraft({ ...draft, work: next })
                        }}
                        className="rounded-full border border-mist/10 px-3 py-1 text-xs text-fog disabled:opacity-30 hover:bg-mist/5"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={i === draft.work.length - 1}
                        onClick={() => {
                          const next = [ ...draft.work ]
                          ;[ next[i], next[i + 1] ] = [ next[i + 1], next[i] ]
                          setDraft({ ...draft, work: next })
                        }}
                        className="rounded-full border border-mist/10 px-3 py-1 text-xs text-fog disabled:opacity-30 hover:bg-mist/5"
                      >
                        ↓
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          work: draft.work.filter((_, j) => j !== i),
                        })
                      }
                      className="text-xs text-aurora-pink hover:underline"
                    >
                      Remove project
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setDraft({ ...draft, work: [ ...draft.work, { ...emptyWork, tags: [] } ] })}
                className="w-full rounded-2xl border border-dashed border-mist/20 py-4 text-sm text-fog hover:border-aurora-violet/50 hover:text-mist transition-colors"
              >
                + Add a project
              </button>
            </div>
          )}

          {tab === 'testimonials' && (
            <div className="space-y-4">
              {draft.testimonials.map((t, i) => (
                <div key={i} className={sectionCardCls}>
                  <label className="block">
                    <span className={labelCls}>Quote</span>
                    <textarea
                      rows={3}
                      value={t.quote}
                      onChange={(e) => {
                        const next = [ ...draft.testimonials ]
                        next[i] = { ...next[i], quote: e.target.value }
                        setDraft({ ...draft, testimonials: next })
                      }}
                      className={fieldCls}
                    />
                  </label>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label>
                      <span className={labelCls}>Author</span>
                      <input
                        type="text"
                        value={t.author}
                        onChange={(e) => {
                          const next = [ ...draft.testimonials ]
                          next[i] = { ...next[i], author: e.target.value }
                          setDraft({ ...draft, testimonials: next })
                        }}
                        className={fieldCls}
                      />
                    </label>
                    <label>
                      <span className={labelCls}>Role</span>
                      <input
                        type="text"
                        value={t.role}
                        onChange={(e) => {
                          const next = [ ...draft.testimonials ]
                          next[i] = { ...next[i], role: e.target.value }
                          setDraft({ ...draft, testimonials: next })
                        }}
                        className={fieldCls}
                      />
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          testimonials: draft.testimonials.filter((_, j) => j !== i),
                        })
                      }
                      className="text-xs text-aurora-pink hover:underline"
                    >
                      Remove testimonial
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setDraft({ ...draft, testimonials: [ ...draft.testimonials, { ...emptyTestimonial } ] })
                }
                className="w-full rounded-2xl border border-dashed border-mist/20 py-4 text-sm text-fog hover:border-aurora-violet/50 hover:text-mist transition-colors"
              >
                + Add a testimonial
              </button>
            </div>
          )}
        </div>

        <section className="frost mt-12 rounded-3xl p-6 text-sm text-whisper">
          <h2 className="mb-3 font-serif text-lg text-mist">Publishing</h2>
          <ol className="ml-5 list-decimal space-y-2">
            <li>Edit content above. It's saved in your browser automatically.</li>
            <li>Click <span className="text-mist">Download JSON</span> (or Copy) when ready.</li>
            <li>Replace <code className="text-fog">src/content/portfolio.json</code> in your repo with the exported file.</li>
            <li>Commit and push — Vercel redeploys and the changes go live.</li>
          </ol>
          <p className="mt-4 text-xs text-fog/70">
            Note: Vercel's serverless filesystem is read-only at runtime, so this admin can't write
            directly to the site. The export-and-commit flow is the portable, zero-backend path. If
            you'd rather edit live without committing, wire this page to Vercel KV / a database — ask
            and we'll add that.
          </p>
        </section>
      </div>
    </section>
  )
}

export default AdminPage
