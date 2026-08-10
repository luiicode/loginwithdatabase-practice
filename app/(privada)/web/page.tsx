const products = [
    {
        name: "Laptop Pro",
        description: "Rendimiento rápido para trabajo, estudio y creación de contenido.",
        price: "$1,299",
    },
    {
        name: "Auriculares X",
        description: "Sonido envolvente con cancelación de ruido y batería de larga duración.",
        price: "$199",
    },
    {
        name: "Smartwatch Nova",
        description: "Salud, deporte y notificaciones al alcance de tu muñeca.",
        price: "$249",
    },
]

export default function WebPage() {
    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">
            <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
                <div className="mb-10 max-w-2xl">
                    <p className="mb-4 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-300">
                        Tienda de tecnología
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        Descubre los mejores productos para tu día a día
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-slate-300">
                        Explora una selección sencilla de dispositivos modernos con diseño elegante,
                        alto rendimiento y funciones pensadas para facilitar tu rutina.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {products.map((product) => (
                        <article
                            key={product.name}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-cyan-950/20 backdrop-blur"
                        >
                            <div className="mb-4 h-12 w-12 rounded-xl bg-cyan-400/15" />
                            <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                {product.description}
                            </p>
                            <p className="mt-6 text-lg font-bold text-cyan-300">{product.price}</p>
                        </article>
                    ))}
                </div>

                <div className="mt-12 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-6">
                    <h2 className="text-2xl font-semibold text-white">Tecnología para todos</h2>
                    <p className="mt-2 max-w-3xl text-slate-300">
                        Encuentra laptops, accesorios y wearables en una experiencia visual simple,
                        limpia y moderna.
                    </p>
                </div>
            </section>
        </main>
    )
}