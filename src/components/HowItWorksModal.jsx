import React from 'react';
import { X, Database, Calculator, Lightbulb, TrendingUp, Target, Zap, ChefHat } from 'lucide-react';

const HowItWorksModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const steps = [
        {
            icon: Database,
            title: "Data Ingestion",
            description: "Upload your raw sales data. Our AI automatically maps your column headers and cleans the data for high-precision processing.",
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            icon: Calculator,
            title: "Financial Engineering",
            description: "We apply the Kasavana & Smith Matrix, calculating the 'Contribution Margin' and 'Sales Volume' for every single dish on your menu.",
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
        {
            icon: Lightbulb,
            title: "Strategic Insights",
            description: "The AI categorizes items into four quadrants and generates plain-English recommendations on how to optimize your menu for maximum profit.",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
        }
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-[#030712]/80 backdrop-blur-md animate-reveal"
                onClick={onClose}
            />

            <div className="glass-card w-full max-w-2xl rounded-[2.5rem] border border-white/10 p-8 md:p-12 relative z-10 animate-float shadow-2xl">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 p-2 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-all"
                >
                    <X size={24} />
                </button>

                <div className="flex items-center gap-4 mb-10">
                    <div className="bg-indigo-500/10 p-3 rounded-2xl">
                        <ChefHat className="h-6 w-6 text-indigo-400" />
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight">The Analysis Process</h2>
                </div>

                <div className="space-y-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="flex gap-6 group">
                            <div className={`shrink-0 w-14 h-14 rounded-2xl ${step.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                                <step.icon className={`h-7 w-7 ${step.color}`} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black text-sm uppercase tracking-widest hover:scale-[1.05] active:scale-[0.95] transition-all shadow-lg shadow-indigo-500/20"
                    >
                        Got it, Chef
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksModal;
