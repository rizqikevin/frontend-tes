export default function MediaGrid() {
  const items = Array(8).fill(0); // Dummy

  return (
    <div className="grid grid-cols-4 gap-4 mt-4">
      {items.map((_, idx) => (
        <div
          key={idx}
          className="bg-dashboard-accent rounded-md overflow-hidden h-60 relative"
        >
          {idx === 7 ? (
            <div className="p-4 text-white text-sm">
              "Halo Sobat HMW, kami menginformasikan untuk kalian pengguna jalan
              tol..."
              <div className="mt-2 text-blue-400 text-xs">🔗 Link</div>
            </div>
          ) : (
            <img
              src="https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif"
              alt="static"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  );
}
