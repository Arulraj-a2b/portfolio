import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main id="main" className="container-x min-h-[80svh] flex items-center justify-center">
      <div className="glass max-w-[520px] w-full p-10 text-center">
        <p className="mono text-[12px] tracking-[0.2em] uppercase text-accent-2">404</p>
        <h1 className="mt-3 text-[34px] font-bold">That page drifted away</h1>
        <p className="mt-3 text-muted">The link is wrong or the page moved. The whole portfolio lives on one page.</p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/">Back home</ButtonLink>
        </div>
      </div>
    </main>
  );
}
