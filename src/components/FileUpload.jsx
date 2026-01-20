import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { Upload, Activity, Sparkles } from 'lucide-react';

const FileUpload = ({ onDataReceived }) => {
    const [file, setFile] = useState(null);
    const [availableColumns, setAvailableColumns] = useState([]);
    const [colItem, setColItem] = useState('');
    const [colCost, setColCost] = useState('');
    const [colPrice, setColPrice] = useState('');
    const [colQty, setColQty] = useState('');
    const [duration, setDuration] = useState(30);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);

            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

            // Handle Excel files (.xlsx, .xls)
            if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });

                    // Get first sheet
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];

                    // Convert to JSON to get headers
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    if (jsonData && jsonData.length > 0) {
                        const headers = jsonData[0].filter(h => h && h.toString().trim() !== '');
                        setAvailableColumns(headers);

                        // Auto-select if exact matches found
                        if (headers.includes('Menu Item')) setColItem('Menu Item');
                        if (headers.includes('Cost')) setColCost('Cost');
                        if (headers.includes('Price')) setColPrice('Price');
                        if (headers.includes('Sold Qty')) setColQty('Sold Qty');
                    }
                };
                reader.readAsArrayBuffer(selectedFile);
            }
            // Handle CSV files
            else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const csvText = event.target.result;

                    // Parse the text content
                    Papa.parse(csvText, {
                        skipEmptyLines: true,
                        complete: (results) => {
                            if (results.data && results.data.length > 0) {
                                const headers = results.data[0].filter(h => h && h.trim() !== '');
                                setAvailableColumns(headers);

                                // Auto-select if exact matches found
                                if (headers.includes('Menu Item')) setColItem('Menu Item');
                                if (headers.includes('Cost')) setColCost('Cost');
                                if (headers.includes('Price')) setColPrice('Price');
                                if (headers.includes('Sold Qty')) setColQty('Sold Qty');
                            }
                        }
                    });
                };

                // Read as text with UTF-8 encoding
                reader.readAsText(selectedFile, 'UTF-8');
            }
        }
    };

    const handleDemoData = () => {
        const demoCSV = `Menu Item,Cost,Price,Sold Qty
Truffle Burger,4.50,16.00,120
Cheese Pizza,3.00,12.00,350
Lobster Ravioli,9.00,28.00,15
Caesar Salad,2.50,11.00,45
Soda,0.20,3.00,500
Wagyu Steak,25.00,65.00,40
Fried Calamari,5.00,14.00,90
Vegan Wrap,3.50,10.00,25`;

        // Create a Blob from the demo CSV
        const blob = new Blob([demoCSV], { type: 'text/csv' });
        const demoFile = new File([blob], 'demo_menu.csv', { type: 'text/csv' });

        setFile(demoFile);

        // Parse to get headers
        Papa.parse(demoFile, {
            preview: 10,
            complete: (results) => {
                if (results.data && results.data.length > 0) {
                    const headers = results.data[0];
                    setAvailableColumns(headers);

                    // Set column mappings
                    const itemCol = 'Menu Item';
                    const costCol = 'Cost';
                    const priceCol = 'Price';
                    const qtyCol = 'Sold Qty';

                    setColItem(itemCol);
                    setColCost(costCol);
                    setColPrice(priceCol);
                    setColQty(qtyCol);

                    // Auto-trigger analysis with explicit column mappings
                    setTimeout(() => {
                        handleAnalyzeWithColumns(demoFile, itemCol, costCol, priceCol, qtyCol);
                    }, 500);
                }
            }
        });
    };

    const handleAnalyzeWithColumns = async (fileToAnalyze, item, cost, price, qty) => {
        if (!fileToAnalyze) {
            alert("Please select a file first.");
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', fileToAnalyze);
        formData.append('col_item', item);
        formData.append('col_cost', cost);
        formData.append('col_price', price);
        formData.append('col_qty', qty);
        formData.append('duration', duration);

        try {
            const response = await axios.post('https://menu-matrix-api-406598298206.us-central1.run.app/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Analysis Result:', response.data);
            if (onDataReceived) {
                onDataReceived(response.data);
            }
        } catch (error) {
            console.error('Error analyzing menu:', error);
            alert('Error analyzing menu. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyzeWithFile = async (fileToAnalyze = file) => {
        if (!fileToAnalyze) {
            alert("Please select a file first.");
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('file', fileToAnalyze);
            formData.append('col_item', colItem);
            formData.append('col_cost', colCost);
            formData.append('col_price', colPrice);
            formData.append('col_qty', colQty);
            formData.append('duration', duration);

            const response = await axios.post('https://menu-matrix-api-406598298206.us-central1.run.app/analyze', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Analysis Result:', response.data);
            if (onDataReceived) {
                onDataReceived(response.data);
            }
        } catch (error) {
            console.error('Error analyzing menu:', error);
            alert('Error analyzing menu. Check console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnalyze = () => handleAnalyzeWithFile();

    return (
        <div className="max-w-2xl mx-auto">
            <div className="glass-card rounded-[2.5rem] p-10 relative overflow-hidden group">
                {/* Shine Effect */}
                <div className="absolute top-0 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shine pointer-events-none" />

                <div className="flex items-center space-x-4 mb-4">
                    <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                        <Activity className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">
                            Upload Sales Data
                        </h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Supported: .csv, .xlsx, .xls
                        </p>
                    </div>
                </div>

                <div className="space-y-8 relative z-10 mt-8">
                    {/* File Input */}
                    <div className="relative">
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            className="sr-only"
                            onChange={handleFileChange}
                        />
                        <label
                            htmlFor="file-upload"
                            className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-3xl transition-all duration-500 cursor-pointer ${file
                                ? 'border-indigo-500/50 bg-indigo-500/5'
                                : 'border-white/10 bg-white/[0.02] hover:border-indigo-400/50 hover:bg-white/[0.05]'
                                }`}
                        >
                            <div className={`p-5 rounded-2xl mb-5 transition-all duration-500 ${file ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-500/40 scale-110' : 'bg-white/5 text-gray-500'
                                }`}>
                                <Upload className="h-10 w-10" />
                            </div>
                            <p className="text-lg font-bold text-white">
                                {file ? file.name : "Drop your file here"}
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                or click to browse local files
                            </p>
                        </label>
                    </div>

                    {!file && (
                        <>
                            <div className="flex items-center space-x-4">
                                <div className="h-px flex-1 bg-white/5"></div>
                                <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">OR</span>
                                <div className="h-px flex-1 bg-white/5"></div>
                            </div>

                            <button
                                onClick={handleDemoData}
                                disabled={loading}
                                className="w-full py-5 px-6 rounded-2xl text-sm font-bold text-gray-300 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 flex items-center justify-center space-x-3 disabled:opacity-50"
                            >
                                <Sparkles className="h-5 w-5 text-indigo-400" />
                                <span>Try with Demo Dataset</span>
                            </button>
                        </>
                    )}

                    {/* Column Mapping - shown only after file selection */}
                    {file && availableColumns.length > 0 && (
                        <div className="space-y-6 animate-reveal">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Menu Item Column</label>
                                    <select
                                        value={colItem}
                                        onChange={(e) => setColItem(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer hover:bg-white/[0.05]"
                                    >
                                        <option value="" className="bg-gray-900">Select column...</option>
                                        {availableColumns.map((col, idx) => (
                                            <option key={idx} value={col} className="bg-gray-900">{col}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Cost Column</label>
                                    <select
                                        value={colCost}
                                        onChange={(e) => setColCost(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer hover:bg-white/[0.05]"
                                    >
                                        <option value="" className="bg-gray-900">Select column...</option>
                                        {availableColumns.map((col, idx) => (
                                            <option key={idx} value={col} className="bg-gray-900">{col}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Price Column</label>
                                    <select
                                        value={colPrice}
                                        onChange={(e) => setColPrice(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer hover:bg-white/[0.05]"
                                    >
                                        <option value="" className="bg-gray-900">Select column...</option>
                                        {availableColumns.map((col, idx) => (
                                            <option key={idx} value={col} className="bg-gray-900">{col}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Quantity Column</label>
                                    <select
                                        value={colQty}
                                        onChange={(e) => setColQty(e.target.value)}
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer hover:bg-white/[0.05]"
                                    >
                                        <option value="" className="bg-gray-900">Select column...</option>
                                        {availableColumns.map((col, idx) => (
                                            <option key={idx} value={col} className="bg-gray-900">{col}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2 pt-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Data Duration (Days)</label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all hover:bg-white/[0.05]"
                                />
                            </div>

                            <button
                                onClick={handleAnalyze}
                                disabled={loading}
                                className={`w-full py-5 px-6 rounded-2xl text-base font-black text-white shadow-2xl transition-all duration-500 overflow-hidden relative group ${loading
                                    ? 'bg-indigo-900/50 cursor-wait'
                                    : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98]'
                                    }`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-3">
                                        <Activity className="h-5 w-5 animate-pulse text-indigo-200" />
                                        <span>AI is processing matrix...</span>
                                    </div>
                                ) : (
                                    <span className="flex items-center justify-center gap-3">
                                        Deep Analysis <Sparkles className="h-5 w-5" />
                                    </span>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
