import React from 'react';
import { X, Star, ShoppingBag, DollarSign, AlertCircle, TrendingUp, HelpCircle } from 'lucide-react';

const ResourcesModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const terms = [
        {
            title: "Stars",
            subtitle: "High Popularity • High Profit",
            icon: Star,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            description: "Your best performers. Customers love them and they provide high margins. Protect their quality and keep them in prime menu positions."
        },
        {
            title: "Plowhorses",
            subtitle: "High Popularity • Low Profit",
            icon: ShoppingBag,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            description: "Fan favorites that aren't very profitable. The goal is to either increase the price slightly or find ways to lower the ingredient cost."
        },
        {
            title: "Puzzles",
            subtitle: "Low Popularity • High Profit",
            icon: DollarSign,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            description: "High-margin items that just don't sell often. They might need a better name, a menu illustration, or a recommendation from staff."
        },
        {
            title: "Dogs",
            subtitle: "Low Popularity • Low Profit",
            icon: AlertCircle,
            color: "text-rose-400",
            bg: "bg-rose-500/10",
            description: "Items that neither sell well nor make much money. Usually best removed or completely redesigned into something new."
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md animate-reveal"
                onClick={onClose}
            />

            <div className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] border border-white/10 p-8 md:p-12 relative z-10 animate-float shadow-2xl custom-scrollbar">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-2 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                >
                    <X size={24} />
                </button>

                <div className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-purple-500/10 p-3 rounded-2xl">
                            <HelpCircle className="h-6 w-6 text-purple-400" />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Terminology Guide</h2>
                    </div>
                    <p className="text-gray-400 font-medium">Understanding the Kasavana & Smith Menu Engineering Matrix.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {terms.map((term, idx) => (
                        <div key={idx} className="glass-card p-8 rounded-3xl border border-white/5 bg-white/[0.01]">
                            <div className="flex items-center gap-4 mb-6">
                                <div className={`w-12 h-12 rounded-xl ${term.bg} flex items-center justify-center`}>
                                    <term.icon className={`h-6 w-6 ${term.color}`} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{term.title}</h3>
                                    <p className={`text-[10px] font-black uppercase tracking-widest ${term.color}`}>
                                        {term.subtitle}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">
                                {term.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 p-8 border border-indigo-500/20 bg-indigo-500/5 rounded-3xl">
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp className="h-5 w-5 text-indigo-400" />
                        <h4 className="text-lg font-bold text-white">Manager's Action Plan</h4>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Use these classifications to adjust your menu layout. Typically, placing <strong>Stars</strong> in the 'top-right' of a physical menu and highlighting <strong>Puzzles</strong> with callouts can increase overall house profitability by up to 15%.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ResourcesModal;
