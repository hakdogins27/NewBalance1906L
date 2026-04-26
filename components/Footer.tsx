'use client'

export default function Footer() {
  return (
    <footer className="w-full bg-black relative z-10">
      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent" />

      {/* Pre-footer CTA strip */}
      <div className="bg-brand-primary/8 border-b border-brand-primary/15 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <span className="font-mono text-[8px] tracking-[0.4em] uppercase text-brand-primary/60 block">
              Available Now
            </span>
            <p className="font-display text-3xl md:text-4xl italic text-white">
              The 1906L is here.
            </p>
          </div>
          <div className="flex items-center gap-8 shrink-0">
            <a
              href="#"
              className="group flex items-center gap-4 font-mono text-[10px] tracking-[0.3em] uppercase text-brand-primary hover:text-white transition-colors duration-300"
            >
              <span className="w-6 h-px bg-brand-primary group-hover:w-10 transition-all duration-400" />
              Explore Now
            </a>
            <a
              href="#"
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 hover:text-white/60 transition-colors duration-300"
            >
              Stockists
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-display text-xl text-white">Stay in the Archive.</p>
            <p className="font-body text-white/35 text-sm">
              Early access, new drops, and behind-the-build stories.
            </p>
          </div>
          <form
            className="flex items-stretch gap-0 w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 md:w-64 bg-white/5 border border-white/10 border-r-0 text-white placeholder-white/20 font-mono text-xs tracking-wide px-5 py-3.5 outline-none focus:border-brand-primary/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-brand-primary hover:bg-brand-hover text-black font-mono text-[9px] tracking-[0.3em] uppercase px-6 py-3.5 transition-colors duration-300 shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-brand-primary/50">
                  New Balance
                </span>
                <span className="w-px h-3 bg-white/15" />
                <span className="font-display text-2xl font-bold tracking-tighter text-white">
                  1906L
                </span>
              </div>
              <p className="font-display italic text-white/30 text-sm max-w-[200px] leading-relaxed">
                Anatomy of a Classic.
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-16 gap-y-4">
              {[
                { 
                  group: 'Collection', 
                  links: [
                    { name: 'Overview', href: '#' },
                    { name: 'Anatomy', href: '#anatomy' },
                    { name: 'Specifications', href: '#specs' }
                  ] 
                },
                { group: 'Brand', links: [{ name: 'Our Story', href: '#story' }, { name: 'Heritage', href: '#' }, { name: 'Innovation', href: '#' }] },
                { group: 'Connect', links: [{ name: 'Instagram', href: '#' }, { name: 'X / Twitter', href: '#' }, { name: 'TikTok', href: '#' }] },
              ].map(({ group, links }) => (
                <div key={group} className="space-y-4">
                  <span className="font-mono text-[8px] tracking-[0.35em] uppercase text-white/25 block">
                    {group}
                  </span>
                  {links.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="block font-body text-sm text-white/40 hover:text-white/80 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/15">
              © 2026 New Balance Athletics, Inc. — 1906L Archive Series
            </span>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Use', 'Cookie Settings'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-mono text-[8px] tracking-[0.2em] uppercase text-white/15 hover:text-white/40 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
