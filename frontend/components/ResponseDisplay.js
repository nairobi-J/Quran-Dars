import { useState } from 'react';
import YouTube from 'react-youtube';

export default function ResponseDisplay({ response, videos }) {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [error, setError] = useState(null);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
      origin: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    },
  };

  const handleVideoClick = (videoId) => {
    setError(null);
    setPlayingVideo(playingVideo === videoId ? null : videoId);
  };

  const handleError = (event) => {
    setError('Failed to load video. Please try again.');
    setPlayingVideo(null);
  };

  return (
    <div className="mt-6 bg-white p-4 rounded-lg shadow text-black">
      <div className="prose max-w-none text-lg" dangerouslySetInnerHTML={{ __html: response }} />
      
      {videos.length > 0 && (
        <div className="mt-8 space-y-6">
          <h3 className="text-xl font-bold mb-4">সম্পর্কিত ভিডিও</h3>
          {error && <div className="text-red-500">{error}</div>}
          {videos.map((video) => (
            <div 
              key={video.id} 
              className="border rounded-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-md"
              onClick={() => handleVideoClick(video.id)}
            >
              {playingVideo === video.id ? (
                <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                  <div className="absolute inset-0">
                    <YouTube
                      videoId={video.id}
                      opts={opts}
                      onError={handleError}
                      className="w-full h-full"
                      iframeClassName="w-full h-full"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-medium">{video.title}</h4>
                    <div className="flex justify-center mt-2">
                      <button 
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full flex items-center transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoClick(video.id);
                        }}
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.7L16 10l-9.7 7.3V2.7z"/>
                        </svg>
                        Play
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}