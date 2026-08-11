'use client';

import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from 'next/link';
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import {authClient} from "@/lib/auth-client";

export default function Home() {

    const router = useRouter();
    const [form, setForm] = useState({email: "", password: ""});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setError(null);
        setLoading(true);

        const {error} = await authClient.signIn.email({
            email: form.email,
            password: form.password
        })

        setLoading(false);

        if (error) {
            setError(error.message ?? 'Credenciales inválidas');
            return;
        }

        router.push('/web');

    }

    return (
        <div
            className={'flex flex-1 w-full h-screen justify-center items-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800'}>
            <Card size={"default"} role={"form"}
                  className={'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm shadow-2xl max-w-md w-full mx-4'}>
                <CardHeader className={'flex flex-col gap-6 pb-6 border-b border-slate-700/30'}>
                    <div>
                        <h1 className={'text-3xl font-bold text-white mb-2'}>Bienvenido</h1>
                        <p className={'text-slate-300 text-sm'}>Ingresa con tus credenciales para continuar</p>
                    </div>
                </CardHeader>
                <CardContent className={'pt-6'}>
                    <form onSubmit={handleSubmit} className={'space-y-5'}>
                        <div className={'space-y-2'}>
                            <label htmlFor="email" className={'text-sm font-medium text-slate-200 block'}>Correo
                                Electrónico</label>
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                value={form.email}
                                onChange={(e) => setForm({...form, email: e.target.value})}
                                required
                                className={'w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200'}
                            />
                        </div>
                        <div className={'space-y-2'}>
                            <label htmlFor="password"
                                   className={'text-sm font-medium text-slate-200 block'}>Contraseña</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={(e) => setForm({...form, password: e.target.value})}
                                required
                                className={'w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200'}
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm">{error}</p>}

                        <Button role={"button"} type={"submit"} size={"default"} disabled={loading}
                                className={'w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-lg hover:shadow-blue-500/20'}>
                            {loading ? "Ingresando..." : "Iniciar Sesión"}
                        </Button>

                    </form>
                </CardContent>
                <CardFooter className={'flex flex-col gap-4 pt-4'}>
                    <div className={'text-center text-sm'}>
                        <span className={'text-white'}>¿No tienes cuenta? </span>
                        <Link
                            href="/registro"
                            className={'text-blue-700 hover:text-blue-300 font-medium transition-colors duration-200'}
                        >
                            Registrarte
                        </Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
