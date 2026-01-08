import React, { useState } from 'react';
import { Home, TrendingUp, MapPin, Phone, ExternalLink, ChevronDown, ChevronUp, CheckSquare, Square, Building, Wrench, Calculator, FileText, Users, RotateCcw, Edit3, Save } from 'lucide-react';

export default function DutchessInvestmentReport() {
    const [activeSection, setActiveSection] = useState('summary');
    const [expandedCards, setExpandedCards] = useState({});
    const [checklist, setChecklist] = useState({});
    const [isEditingReno, setIsEditingReno] = useState(false);

    const defaultRenoCosts = {
        hp_hvac: 24000, hp_electrical: 7820, hp_panels: 6000, hp_plumbing: 4888, hp_waterHeaters: 3000,
        hp_roof: 15000, hp_foundation: 5000, hp_windows: 7200, hp_siding: 8000, hp_doors: 3600,
        hp_kitchens: 50000, hp_bathrooms: 30000, hp_flooring: 15640, hp_drywall: 5865, hp_painting: 3910, hp_trim: 5000, hp_fixtures: 3000,
        hp_permits: 3000, hp_architect: 5000, hp_cleanup: 3500,
        st_hvac: 24000, st_electrical: 10336, st_panels: 6000, st_plumbing: 6460, st_waterHeaters: 3000,
        st_roof: 0, st_foundation: 5000, st_windows: 9000, st_siding: 8000, st_doors: 4800,
        st_kitchens: 50000, st_bathrooms: 30000, st_flooring: 20672, st_drywall: 7752, st_painting: 5168, st_trim: 5000, st_fixtures: 3000,
        st_permits: 3000, st_architect: 5000, st_cleanup: 3500,
        contingencyPct: 15,
    };

    const [renoCosts, setRenoCosts] = useState(defaultRenoCosts);
    const resetRenoCosts = () => setRenoCosts(defaultRenoCosts);
    const updateRenoCost = (key, value) => setRenoCosts(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));

    const calcHydeParkBase = () => renoCosts.hp_hvac + renoCosts.hp_electrical + renoCosts.hp_panels + renoCosts.hp_plumbing + renoCosts.hp_waterHeaters + renoCosts.hp_roof + renoCosts.hp_foundation + renoCosts.hp_windows + renoCosts.hp_siding + renoCosts.hp_doors + renoCosts.hp_kitchens + renoCosts.hp_bathrooms + renoCosts.hp_flooring + renoCosts.hp_drywall + renoCosts.hp_painting + renoCosts.hp_trim + renoCosts.hp_fixtures + renoCosts.hp_permits + renoCosts.hp_architect + renoCosts.hp_cleanup;
    const calcHydeParkTotal = () => calcHydeParkBase() * (1 + renoCosts.contingencyPct / 100);

    const calcStaatsburgBase = () => renoCosts.st_hvac + renoCosts.st_electrical + renoCosts.st_panels + renoCosts.st_plumbing + renoCosts.st_waterHeaters + renoCosts.st_roof + renoCosts.st_foundation + renoCosts.st_windows + renoCosts.st_siding + renoCosts.st_doors + renoCosts.st_kitchens + renoCosts.st_bathrooms + renoCosts.st_flooring + renoCosts.st_drywall + renoCosts.st_painting + renoCosts.st_trim + renoCosts.st_fixtures + renoCosts.st_permits + renoCosts.st_architect + renoCosts.st_cleanup;
    const calcStaatsburgTotal = () => calcStaatsburgBase() * (1 + renoCosts.contingencyPct / 100);

    const formatCurrency = (num) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
    const toggleCard = (id) => setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
    const toggleCheck = (id) => setChecklist(prev => ({ ...prev, [id]: !prev[id] }));

    const sections = [
        { id: 'summary', label: 'Summary', icon: FileText },
        { id: 'properties', label: 'Properties', icon: Home },
        { id: 'market', label: 'Market', icon: TrendingUp },
        { id: 'renovation', label: 'Renovation', icon: Wrench },
        { id: 'roi', label: 'ROI', icon: Calculator },
        { id: 'quadplex', label: 'Quadplex', icon: Building },
        { id: 'contacts', label: 'Contacts', icon: Users },
    ];

    const dueDiligenceItems = [
        { id: 'zoning', label: 'Verify zoning classification' },
        { id: 'duplex', label: 'Confirm legal duplex status' },
        { id: 'liens', label: 'Check for liens' },
        { id: 'violations', label: 'Check code violations' },
        { id: 'flood', label: 'Research flood zone' },
        { id: 'inspection', label: 'Property inspection' },
        { id: 'lead', label: 'Lead paint testing' },
        { id: 'title', label: 'Title search' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-6 px-4">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-1">Dutchess County Investment Analysis</h1>
                    <p className="text-blue-200 text-sm">Two-Property Portfolio • January 2026</p>
                </div>
            </div>

            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-2">
                    <div className="flex overflow-x-auto gap-1 py-2">
                        {sections.map(section => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`flex items-center gap-1 px-3 py-2 rounded-lg whitespace-nowrap transition text-xs ${activeSection === section.id ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <section.icon className="w-3 h-3" />
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-6">

                {activeSection === 'summary' && (
                    <div className="space-y-4">
                        <div className="bg-white rounded-xl shadow p-5">
                            <h2 className="text-xl font-bold text-gray-900 mb-3">Executive Summary</h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Analysis of two duplex properties in Dutchess County, NY for acquisition and renovation.
                            </p>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="text-left p-2 font-semibold">Metric</th>
                                            <th className="text-left p-2 font-semibold">Hyde Park</th>
                                            <th className="text-left p-2 font-semibold">Staatsburg</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                        <tr><td className="p-2 text-gray-600">Asking</td><td className="p-2">$174,900</td><td className="p-2">$205,000</td></tr>
                                        <tr><td className="p-2 text-gray-600">Sq Ft</td><td className="p-2">1,955</td><td className="p-2">2,584</td></tr>
                                        <tr><td className="p-2 text-gray-600">$/Sq Ft</td><td className="p-2">$89</td><td className="p-2 text-green-600 font-bold">$79</td></tr>
                                        <tr><td className="p-2 text-gray-600">Renovation</td><td className="p-2 text-blue-600">{formatCurrency(calcHydeParkTotal())}</td><td className="p-2 text-green-600">{formatCurrency(calcStaatsburgTotal())}</td></tr>
                                        <tr><td className="p-2 text-gray-600">All-In</td><td className="p-2 font-bold">{formatCurrency(174900 + calcHydeParkTotal() + 11247)}</td><td className="p-2 font-bold">{formatCurrency(205000 + calcStaatsburgTotal() + 13150)}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
                            <h3 className="font-bold text-gray-800 mb-3">⚖️ Strategic Options</h3>

                            <div className="space-y-3">
                                <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-blue-500">
                                    <h4 className="font-bold text-gray-900 text-sm">Option A: Single Property Focus</h4>
                                    <ul className="text-xs text-gray-600 mt-1 space-y-1">
                                        <li>• <strong>Staatsburg:</strong> Higher rent potential, quadplex upside, scalable.</li>
                                        <li>• <strong>Hyde Park:</strong> Lower entry cost, high visibility, standard rental.</li>
                                    </ul>
                                </div>

                                <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-500">
                                    <h4 className="font-bold text-gray-900 text-sm">Option B: Portfolio Approach</h4>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Acquire both. Renovate Hyde Park first to generate cash flow, then fund Staatsburg renovation. Target combined value $1.2M+.
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-orange-500">
                                    <h4 className="font-bold text-gray-900 text-sm">Option C: Wholesale / Flip</h4>
                                    <p className="text-xs text-gray-600 mt-1">
                                        Acquire one or both for light cosmetic renovation and resale. Lower long-term return but faster capital recycling (15-20% margin).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'properties' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Property Details</h2>

                        {[{
                            id: 'hyde', address: "4335 Albany Post Rd", location: "Hyde Park, NY", type: "Duplex", price: "$174,900",
                            sqft: "1,955", beds: "4", baths: "2", image: "https://photos.zillowstatic.com/fp/3610c5c681d407dfb1d45ae2f7e25911-p_c.jpg",
                            url: "https://www.howardhanna.com/Property/Detail/4335-Albany-Post-Road-Hyde-Park-NY-12538/UlsterCountyNY/20254606",
                            condition: "All major systems need replacement. Complete interior renovation required."
                        }, {
                            id: 'staats', address: "61 Old Post Rd", location: "Staatsburg, NY", type: "Duplex - FSBO", price: "$205,000",
                            sqft: "2,584", beds: "5", baths: "2", phone: "8453309165",
                            image: "https://photos.zillowstatic.com/fp/44f5afba64f7e58e8804d489fab9affe-cc_ft_960.jpg",
                            url: "https://www.zillow.com/homedetails/61-Old-Post-Rd-Staatsburg-NY-12580/30110345_zpid/",
                            condition: "Complete renovation needed. Roof replaced 2018. Possible lead/asbestos."
                        }].map(p => (
                            <div key={p.id} className="bg-white rounded-xl shadow overflow-hidden">
                                <img src={p.image} alt={p.address} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-gray-900">{p.address}</h3>
                                            <p className="text-gray-500 text-sm flex items-center"><MapPin className="w-3 h-3 mr-1" />{p.location}</p>
                                        </div>
                                        <span className="bg-green-600 text-white px-2 py-1 rounded text-sm font-bold">{p.price}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                        <div className="bg-gray-50 p-2 rounded text-center text-sm"><div className="font-bold">{p.sqft}</div><div className="text-xs text-gray-500">Sq Ft</div></div>
                                        <div className="bg-gray-50 p-2 rounded text-center text-sm"><div className="font-bold">{p.beds}/{p.baths}</div><div className="text-xs text-gray-500">Bed/Bath</div></div>
                                        <div className="bg-gray-50 p-2 rounded text-center text-sm"><div className="font-bold">2</div><div className="text-xs text-gray-500">Units</div></div>
                                    </div>
                                    <button onClick={() => toggleCard(p.id)} className="w-full flex items-center justify-center gap-1 py-2 text-blue-600 text-sm">
                                        {expandedCards[p.id] ? 'Less' : 'Details'} {expandedCards[p.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                    </button>
                                    {expandedCards[p.id] && (
                                        <div className="pt-3 border-t mt-2 space-y-3">
                                            <p className="text-sm text-gray-600">{p.condition}</p>
                                            <div className="flex gap-2">
                                                <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1 bg-blue-600 text-white py-2 rounded-lg text-sm">
                                                    View Listing <ExternalLink className="w-3 h-3" />
                                                </a>
                                                {p.phone && <a href={`tel:${p.phone}`} className="bg-green-600 text-white px-4 py-2 rounded-lg"><Phone className="w-4 h-4" /></a>}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === 'market' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Market Analysis</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl shadow p-5">
                                <h3 className="font-bold mb-3">Key Indicators</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between p-2 bg-blue-50 rounded"><span>HUD FMR (2-BR)</span><span className="font-bold text-blue-600">$1,907/mo</span></div>
                                    <div className="flex justify-between p-2 bg-green-50 rounded"><span>Vacancy Rate</span><span className="font-bold text-green-600">~2%</span></div>
                                    <div className="flex justify-between p-2 bg-purple-50 rounded"><span>Rent Growth (5yr)</span><span className="font-bold text-purple-600">+30%</span></div>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow p-5">
                                <h3 className="font-bold mb-3">Projected Rents</h3>
                                <div className="space-y-3">
                                    <div className="p-3 bg-gray-50 rounded"><div className="text-xs text-gray-500">Hyde Park</div><div className="text-xl font-bold">$3,400-$3,800/mo</div></div>
                                    <div className="p-3 bg-green-50 rounded border border-green-200"><div className="text-xs text-green-600">Staatsburg</div><div className="text-xl font-bold text-green-700">$3,800-$4,200/mo</div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'renovation' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Renovation Calculator</h2>
                            <div className="flex gap-2">
                                <button onClick={() => setIsEditingReno(!isEditingReno)} className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${isEditingReno ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
                                    {isEditingReno ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />} {isEditingReno ? 'Done' : 'Edit'}
                                </button>
                                <button onClick={resetRenoCosts} className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded text-sm"><RotateCcw className="w-3 h-3" /> Reset</button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow p-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Contingency</span>
                                {isEditingReno ? (
                                    <input type="number" value={renoCosts.contingencyPct} onChange={(e) => updateRenoCost('contingencyPct', e.target.value)} className="w-16 p-1 border rounded text-right" />
                                ) : <span className="font-bold text-blue-600">{renoCosts.contingencyPct}%</span>}
                            </div>
                        </div>

                        {[
                            { name: 'Hyde Park', prefix: 'hp', total: calcHydeParkTotal, base: calcHydeParkBase, color: 'blue' },
                            { name: 'Staatsburg', prefix: 'st', total: calcStaatsburgTotal, base: calcStaatsburgBase, color: 'green' }
                        ].map(prop => (
                            <div key={prop.prefix} className="bg-white rounded-xl shadow p-4">
                                <h3 className="font-bold mb-3">{prop.name}</h3>
                                <div className="space-y-1 text-sm">
                                    {[
                                        { key: `${prop.prefix}_hvac`, label: 'HVAC' },
                                        { key: `${prop.prefix}_electrical`, label: 'Electrical' },
                                        { key: `${prop.prefix}_plumbing`, label: 'Plumbing' },
                                        { key: `${prop.prefix}_roof`, label: 'Roof' },
                                        { key: `${prop.prefix}_kitchens`, label: 'Kitchens (x2)' },
                                        { key: `${prop.prefix}_bathrooms`, label: 'Bathrooms (x2)' },
                                        { key: `${prop.prefix}_flooring`, label: 'Flooring' },
                                    ].map(item => (
                                        <div key={item.key} className="flex justify-between p-2 bg-gray-50 rounded">
                                            <span>{item.label}</span>
                                            {isEditingReno ? (
                                                <input type="number" value={renoCosts[item.key]} onChange={(e) => updateRenoCost(item.key, e.target.value)} className="w-24 p-1 border rounded text-right text-xs" />
                                            ) : <span>{formatCurrency(renoCosts[item.key])}</span>}
                                        </div>
                                    ))}
                                </div>
                                <div className={`mt-3 p-3 bg-${prop.color}-600 text-white rounded-lg flex justify-between font-bold`}>
                                    <span>Total</span><span>{formatCurrency(prop.total())}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeSection === 'roi' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">ROI Analysis</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { name: 'Hyde Park', acq: 174900, reno: calcHydeParkTotal(), rent: 3600, color: 'blue' },
                                { name: 'Staatsburg', acq: 205000, reno: calcStaatsburgTotal(), rent: 4000, color: 'green' }
                            ].map(p => {
                                const total = p.acq + p.reno + 12000;
                                const noi = p.rent * 12 * 0.6;
                                const cap = (noi / total) * 100;
                                return (
                                    <div key={p.name} className={`bg-white rounded-xl shadow p-5 ${p.color === 'green' ? 'border-2 border-green-200' : ''}`}>
                                        <h3 className={`font-bold mb-3 ${p.color === 'green' ? 'text-green-700' : ''}`}>{p.name}</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between"><span>Acquisition</span><span>{formatCurrency(p.acq)}</span></div>
                                            <div className="flex justify-between"><span>Renovation</span><span>{formatCurrency(p.reno)}</span></div>
                                            <div className="flex justify-between font-bold border-t pt-2"><span>Total All-In</span><span>{formatCurrency(total)}</span></div>
                                            <div className="flex justify-between"><span>Monthly Rent</span><span>{formatCurrency(p.rent)}</span></div>
                                            <div className="flex justify-between"><span>Annual NOI</span><span>{formatCurrency(noi)}</span></div>
                                            <div className={`flex justify-between font-bold text-${p.color}-600`}><span>Cap Rate</span><span>{cap.toFixed(1)}%</span></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {activeSection === 'quadplex' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Quadplex Conversion</h2>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                            <h3 className="font-bold text-yellow-800 mb-2">⚠️ Requirements</h3>
                            <ul className="text-sm text-yellow-700 space-y-1">
                                <li>• Variance from Planning & Zoning</li>
                                <li>• 2-hour fire-rated walls</li>
                                <li>• Separate utility meters</li>
                                <li>• 4-8 parking spaces</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5">
                            <h3 className="font-bold mb-3">Additional Costs</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between p-2 bg-gray-50 rounded"><span>2 Kitchens</span><span>$40K-$60K</span></div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded"><span>2 Bathrooms</span><span>$20K-$40K</span></div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded"><span>Fire Walls + HVAC</span><span>$24K-$43K</span></div>
                                <div className="flex justify-between p-2 bg-gray-50 rounded"><span>Sprinklers + Other</span><span>$45K-$88K</span></div>
                                <div className="flex justify-between p-3 bg-purple-100 rounded font-bold"><span>Total Additional</span><span>$129K-$231K</span></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5">
                            <h3 className="font-bold mb-3">ROI Comparison</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead><tr className="bg-gray-50"><th className="p-2 text-left">Scenario</th><th className="p-2 text-right">Investment</th><th className="p-2 text-right">Rent</th><th className="p-2 text-right">Cap</th></tr></thead>
                                    <tbody>
                                        <tr><td className="p-2">Duplex</td><td className="p-2 text-right">$459K</td><td className="p-2 text-right">$4,000</td><td className="p-2 text-right">6.3%</td></tr>
                                        <tr className="bg-green-50"><td className="p-2 font-medium">Quadplex</td><td className="p-2 text-right">$588K</td><td className="p-2 text-right">$7,500</td><td className="p-2 text-right font-bold text-green-600">9.2%</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {activeSection === 'contacts' && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Contacts & Due Diligence</h2>
                        <div className="bg-white rounded-xl shadow p-5">
                            <h3 className="font-bold mb-3">Municipal</h3>
                            <div className="space-y-2 text-sm">
                                <div className="p-2 bg-gray-50 rounded"><div className="font-medium">Hyde Park Town Hall</div><div className="text-gray-500">(845) 229-5111</div></div>
                                <div className="p-2 bg-gray-50 rounded"><div className="font-medium">Planning & Zoning</div><div className="text-gray-500">(845) 229-0316</div></div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5">
                            <h3 className="font-bold mb-3">Online Resources</h3>
                            <div className="space-y-2">
                                {[
                                    { label: 'Hyde Park Tax Search', url: 'https://egov.basgov.com/hydepark/' },
                                    { label: 'Dutchess County GIS', url: 'https://gis.dutchessny.gov/parcelaccess/' },
                                ].map(r => (
                                    <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer" className="flex justify-between items-center p-2 bg-blue-50 rounded hover:bg-blue-100 text-sm">
                                        {r.label} <ExternalLink className="w-3 h-3 text-blue-600" />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow p-5">
                            <h3 className="font-bold mb-3">Due Diligence Checklist</h3>
                            <div className="space-y-2">
                                {dueDiligenceItems.map(item => (
                                    <button key={item.id} onClick={() => toggleCheck(item.id)} className="w-full flex items-center gap-2 p-2 bg-gray-50 rounded hover:bg-gray-100 text-sm text-left">
                                        {checklist[item.id] ? <CheckSquare className="w-4 h-4 text-green-600" /> : <Square className="w-4 h-4 text-gray-400" />}
                                        <span className={checklist[item.id] ? 'line-through text-gray-400' : ''}>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-gray-800 text-gray-400 py-4 px-4 mt-6">
                <div className="max-w-4xl mx-auto text-center text-xs">
                    <p>Investment analysis purposes only. Consult professionals before decisions.</p>
                </div>
            </div>
        </div>
    );
}
