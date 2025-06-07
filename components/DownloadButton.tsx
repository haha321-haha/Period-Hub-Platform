'use client';

import { Download } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface DownloadButtonProps {
  filename: string;
  className?: string;
}

export default function DownloadButton({ filename, className = '' }: DownloadButtonProps) {
  const t = useTranslations('downloads');
  const locale = useLocale();

  const handleDownload = () => {
    // Determine the correct filename based on locale
    let actualFilename = filename;

    // If it's English locale and the file doesn't already have -en suffix, add it
    if (locale === 'en' && !filename.includes('-en')) {
      // Handle both .html and .pdf files
      if (filename.includes('.html')) {
        actualFilename = filename.replace('.html', '-en.html');
      } else if (filename.includes('.pdf')) {
        actualFilename = filename.replace('.pdf', '-en.pdf');
      }
    }

    // Open the document in a new tab
    window.open(`/downloads/${actualFilename}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-medium rounded-lg hover:from-pink-700 hover:to-purple-700 transition-colors duration-200 ${className}`}
    >
      <Download className="w-4 h-4 mr-2" />
      {t('common.download')}
    </button>
  );
}
