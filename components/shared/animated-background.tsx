export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Large moving gradient orbs */}
      <div 
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl animate-float-slow"
        style={{ animationDelay: '0s' }}
      />
      <div 
        className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-primary/15 via-transparent to-transparent blur-3xl animate-float"
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl animate-float-slow"
        style={{ animationDelay: '4s' }}
      />

      {/* Subtle accent lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/2 h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute top-3/4 right-1/4 h-px w-1/2 bg-gradient-to-r from-primary via-transparent to-transparent" />
      </div>
    </div>
  );
}
