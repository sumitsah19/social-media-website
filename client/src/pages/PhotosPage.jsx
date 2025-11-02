import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { galleriesAPI } from '../lib/api';

export default function PhotosPage() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState({ open: false, image: null, index: 0 });

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const data = await galleriesAPI.getAll({ pageSize: 20 });
        setGalleries(data.galleries);
      } catch (error) {
        console.error('Error fetching galleries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  const openLightbox = (image, index) => {
    setLightbox({ open: true, image, index });
  };

  const closeLightbox = () => {
    setLightbox({ open: false, image: null, index: 0 });
  };

  return (
    <>
      <Helmet>
        <title>Photos & Galleries - EntertainIndia</title>
        <meta name="description" content="Browse celebrity photos, event galleries, and exclusive pictures from Bollywood and Hollywood." />
      </Helmet>

      <div className="bg-primary-600 text-white py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-heading font-bold">📷 Photos & Galleries</h1>
          <p className="text-primary-100 mt-2">Celebrity photos and exclusive galleries</p>
        </div>
      </div>

      <div className="container-custom py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="skeleton h-64 rounded-lg" />
            ))}
          </div>
        ) : galleries.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleries.map((gallery) =>
              gallery.images?.map((img, idx) => (
                <div
                  key={`${gallery.id}-${idx}`}
                  className="group cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => openLightbox(img, idx)}
                >
                  {img.image?.data && (
                    <img
                      src={img.image.data.attributes.url}
                      alt={img.alt || gallery.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  )}
                  {img.caption && (
                    <p className="text-sm text-gray-600 mt-2">{img.caption}</p>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No photos available.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox.open && lightbox.image && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
          >
            ×
          </button>
          <div className="max-w-4xl w-full">
            {lightbox.image.image?.data && (
              <>
                <img
                  src={lightbox.image.image.data.attributes.url}
                  alt={lightbox.image.alt}
                  className="w-full h-auto rounded-lg"
                />
                {lightbox.image.caption && (
                  <p className="text-white text-center mt-4">{lightbox.image.caption}</p>
                )}
                {lightbox.image.credit && (
                  <p className="text-gray-400 text-center text-sm mt-2">
                    Credit: {lightbox.image.credit}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
