export function Footer() {
  return (
    <footer className="w-full px-6 md:px-8 flex flex-col md:flex-row justify-between items-center bg-black/40 border-t border-white/5 relative z-10 py-6">
      <div className="font-mono text-[10px] text-on-surface-variant tracking-widest opacity-60">
        © 2026 SHOUNAK BHALERAO // BUILD_ID: 89X-FF2
      </div>
      <div className="flex gap-8 mt-4 md:mt-0">
        <a
          className="font-mono text-[10px] text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-widest"
          href="mailto:shounakbhalerao777@gmail.com"
        >
          Email
        </a>
        <a
          className="font-mono text-[10px] text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-widest"
          href="https://github.com/Shounaks"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          className="font-mono text-[10px] text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-widest"
          href="https://linkedin.com/in/shounak-bhalerao"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
