
'use client'
import { useState } from 'react';
import QuranForm from '../components/QuranForm'
import ResponseDisplay from '../components/ResponseDisplay'
import axios from 'axios';
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export default function Home() {
  const[response, setResponse] = useState('');
  const [videos, setVideos] = useState([]);

const handleSubmit = async ({ surah, startAyat, endAyat }:{surah: string, startAyat:string, endAyat:string}) => {
  try {
    // Add full backend URL (replace with your actual backend URL)
    const res = await axios.post(`http://localhost:5000/api/gemini`, { 
      surah, 
      startAyat, 
      endAyat 
    });
    
    setResponse(res.data.response);
    
    // Also fetch videos
    const videoRes = await axios.get(
      `http://localhost:5000/api/youtube?query=সূরা ${surah}`
    );
    setVideos(videoRes.data.videos);
    
  } catch (error) {
    console.error("API Error:", error);
    alert("একটি সমস্যা হয়েছে, আবার চেষ্টা করুন");
  }
}



  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto">
         <h1 className="text-3xl font-bold text-center my-6 text-green-700">কুরআনের সহজ ব্যাখ্যা</h1>
          <QuranForm onSubmit={handleSubmit} />
          {response && <ResponseDisplay response={response} videos={videos} /> }
      </div>
    
    </div>
  );
}
