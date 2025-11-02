import { useState } from 'react';
import { SOCIAL_SHARE } from '../../lib/constants';
import { copyToClipboard } from '../../lib/helpers';

export default function ShareBar({ url, title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareButtons = [
    {
      name: 'Facebook',
      icon: '📘',
      url: SOCIAL_SHARE.facebook(url),
      color: 'hover:bg-blue-600',
    },
    {
      name: 'Twitter',
      icon: '🐦',
      url: SOCIAL_SHARE.twitter(url, title),
      color: 'hover:bg-sky-500',
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: SOCIAL_SHARE.whatsapp(url, title),
      color: 'hover:bg-green-600',
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      url: SOCIAL_SHARE.linkedin(url),
      color: 'hover:bg-blue-700',
    },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-medium text-gray-700">Share:</span>
      
      {shareButtons.map((button) => (
        <a
          key={button.name}
          href={button.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 ${button.color} hover:text-white transition-colors duration-200`}
          title={`Share on ${button.name}`}
          aria-label={`Share on ${button.name}`}
        >
          <span className="text-xl">{button.icon}</span>
        </a>
      ))}

      <button
        onClick={handleCopy}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-600 hover:text-white transition-colors duration-200"
        title="Copy link"
        aria-label="Copy link"
      >
        {copied ? '✓' : '🔗'}
      </button>

      {copied && (
        <span className="text-sm text-green-600 font-medium">
          Link copied!
        </span>
      )}
    </div>
  );
}
