import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative pt-20 pb-16 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 animate-reveal">
                        <Sparkles className="h-4 w-4 text-indigo-400" />
                        <span className="text-xs font-semibold tracking-wide uppercase text-indigo-300">
                            Powered by AI Engineering
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 animate-reveal" style={{ animationDelay: '0.1s' }}>
                        <span className="block text-white">Engineering the Future of</span>
                        <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                            Menu Profitability
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-10 animate-reveal" style={{ animationDelay: '0.2s' }}>
                        Transform your sales data into actionable intelligence using the Kasavana & Smith Matrix. Identify your winners, optimize your losers, and maximize your restaurant's bottom line.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-reveal" style={{ animationDelay: '0.3s' }}>
                        <a href="#upload" className="group relative px-8 py-4 bg-indigo-600 rounded-2xl font-bold text-white transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                            <span className="relative flex items-center gap-2">
                                Start Analysis <ArrowRight className="h-5 w-5" />
                            </span>
                        </a>
                        <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-gray-300 transition-all hover:bg-white/10 hover:border-white/20">
                            How it Works
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl animate-glow" />
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-glow" style={{ animationDelay: '2s' }} />
        </div>
    );
};

export default Hero;
