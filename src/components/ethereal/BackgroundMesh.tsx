const BackgroundMesh = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 -z-50 bg-void"
  >
    <div className="absolute inset-0 bg-ethereal-mesh opacity-90" />
    <div
      className="absolute inset-0 opacity-70 bg-[length:200%_200%] animate-aurora-shift"
      style={{
        backgroundImage:
          'radial-gradient(1200px 700px at 30% 20%, rgba(123,92,255,0.28), transparent 60%), radial-gradient(900px 600px at 80% 70%, rgba(255,123,200,0.22), transparent 65%), radial-gradient(900px 600px at 10% 80%, rgba(111,230,255,0.18), transparent 65%)',
      }}
    />
    <div
      className="absolute inset-0 mix-blend-soft-light opacity-[0.18]"
      style={{
        backgroundImage:
          'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'160\' height=\'160\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'2\' stitchTiles=\'stitch\'/><feColorMatrix values=\'0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.35 0\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")',
      }}
    />
  </div>
)

export default BackgroundMesh
