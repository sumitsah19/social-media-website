import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { videosAPI } from '../lib/api';
import { getYouTubeId } from '../lib/helpers';

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await videosAPI.getAll({ pageSize: 24 });
        setVideos(data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const getEmbedUrl = (url) => {
    const youtubeId = getYouTubeId(url);
    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}`;
    }
    // Handle Vimeo
    if (url.includes('vimeo.com')) {
      const vimeoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
    return url;
  };

  return (
    <>
      <Helmet>
        <title>Videos - EntertainIndia</title>
        <meta name="description" content="Watch latest entertainment videos, interviews, trailers, and exclusive content." />
      </Helmet>

      <div className="bg-primary-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-heading font-bold">📹 Videos</h1>
          <p className="text-primary-100 mt-2">Exclusive videos, interviews, and trailers</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-lg" />
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="card overflow-hidden cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative h-48 bg-gray-900">
                  {video.posterImage ? (
                    <img
                      src={video.posterImage.url}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <span className="text-6xl">▶️</span>
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-5xl group-hover:scale-110 transition-transform">
                      ▶️
                    </span>
                  </div>
                  {video.duration && (
                    <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2">{video.title}</h3>
                  {video.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mt-2">{video.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No videos available.</p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            >
              ×
            </button>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={getEmbedUrl(selectedVideo.embedUrl)}
                title={selectedVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-4 text-white">
              <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
              {selectedVideo.description && (
                <p className="text-gray-300 mt-2">{selectedVideo.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
