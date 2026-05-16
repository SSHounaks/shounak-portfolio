import { TerminalCard } from './terminal-card';

export function ContactSection() {
  return (
    <TerminalCard title="Contact.sh" icon="terminal" variant="primary" className="flex-1">
      <div className="p-6 pb-16 font-mono flex flex-col justify-center flex-1 relative">
        <div className="space-y-1.5 text-[11px] font-mono">
          <p className="text-emerald-500/80">
            <span className="text-emerald-400">&gt;</span> BYPASSING_FIREWALL... [SUCCESS]
          </p>
          <p className="text-emerald-500/80">
            <span className="text-emerald-400">&gt;</span> ESTABLISHING_SSL_TUNNEL... [STABLE]
          </p>
          <p className="text-red-500/80">
            <span className="text-red-400">&gt;</span> TARGET_NODE:{' '}
            <a href="mailto:shounakbhalerao777@gmail.com" className="text-red-300 hover:underline underline-offset-4">
              shounakbhalerao777@gmail.com
            </a>
          </p>
          <p className="text-amber-500/80">
            <span className="text-amber-400">&gt;</span> BACKUP_LINK:{' '}
            <a href="https://linkedin.com/in/shounak-bhalerao" target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:underline underline-offset-4">
              linkedin.com/in/shounak-bhalerao
            </a>
          </p>
          <p className="text-cyan-500/80">
            <span className="text-cyan-400">&gt;</span> REPO_HOST:{' '}
            <a href="https://github.com/shounak-bhalerao" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline underline-offset-4">
              github.com/shounak-bhalerao
            </a>
          </p>
          <p className="text-purple-500/80">
            <span className="text-purple-400">&gt;</span> DIRECT_CALL:{' '}
            <span className="text-purple-300">+91-9404546800</span>
          </p>
          <p className="text-emerald-500/80">
            <span className="text-emerald-400">&gt;</span> ENCRYPTION: SHA-256
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/20 to-transparent">
          <a
            href="mailto:shounakbhalerao777@gmail.com"
            className="block w-full bg-red-500/5 text-red-500 py-2.5 rounded border border-red-500/30 font-bold text-[12px] font-mono uppercase tracking-widest hover:bg-red-500/10 hover:border-red-500/50 transition-all backdrop-blur-sm text-center cursor-pointer"
          >
            ./RUN_CONTACT_MODULE.SH
          </a>
        </div>
      </div>
    </TerminalCard>
  );
}
