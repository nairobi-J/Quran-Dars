'use client'
import { useState } from "react";
export default function QuranForm({ onSubmit }){
    const [surah, setSurah] = useState('');
    const [startAyat, setStartAyat] = useState('');
    const [endAyat, setEndAyat] = useState('');

    return(
        <div className="p-4 bg-white rounded-lg shadow mt-10 text-black">
                <h2 className="text-2xl font-bold mb-4 mt-30">কুরআনের তথ্য খুঁজুন</h2>
                <div className="space-y-4">
                    <div className="block text-lg mb-1">সূরার নাম</div>
                    <input
                    type="text"
                    value={surah}
                    onChange={(e) => setSurah(e.target.value)}
                    className="w-full p-3 border-3 border-green-700 rounded text-lg" />
                </div>
                <div className="flex space-x-4">
                    <div className="flex-1"> 
                    <label className="block text-lg mb-1">শুরু আয়াত</label>
                    <input 
                        type="text"
                        value={startAyat}
                        onChange={(e) => setStartAyat(e.target.value)}
                        className="w-full p-3 border-3 border-blue-400 rounded  text-lg"
                    />
                    </div>

                    <div className="flex-1">
                        <label className="block text-lg mb-1">শেষ আয়াত</label>
                        <input 
                            type="text"
                            value={endAyat}
                            onChange={(e) => setEndAyat(e.target.value)}
                            className="w-full p-3 border-3 border-blue-400 rounded text-lg"
                        />
                    </div>
                    
                </div>
                 <button
                className="w-full bg-green-500 text-white py-3 rounded-lg text-lg hover:bg-green-400 mt-10"
                onClick={()=>onSubmit({surah, startAyat, endAyat})}>
                    তথ্য দেখুন
                </button>

               

        </div>
    )
}