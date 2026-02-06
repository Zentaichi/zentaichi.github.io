export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background pointer-events-none">
      {/* Large moving gradient orbs */}
      <div 
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-linear-to-br from-primary/20 via-primary/10 to-transparent blur-3xl animate-float-slow"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-linear-to-br from-primary/15 via-transparent to-transparent blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-linear-to-br from-primary/10 via-primary/5 to-transparent blur-3xl animate-float-slow"
        style={{ animationDelay: '4s' }}
      />

      {/* Subtle accent lines removed to avoid visible divider artifacts */}
    </div>
  );
}
