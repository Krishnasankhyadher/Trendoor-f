import React from 'react';
import {
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TelegramShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  EmailIcon,
} from 'react-share';
import { toast } from 'react-toastify';

const ShareModal = ({ url, name, onClose }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied!");
      onClose();
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end justify-center">
      <div className="bg-white rounded-t-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Share this product</h3>
        <div className="flex justify-between items-center mb-4">
          <WhatsappShareButton url={url} title={name}><WhatsappIcon size={40} round /></WhatsappShareButton>
          <FacebookShareButton url={url}><FacebookIcon size={40} round /></FacebookShareButton>
          <TwitterShareButton url={url} title={name}><TwitterIcon size={40} round /></TwitterShareButton>
          <TelegramShareButton url={url} title={name}><TelegramIcon size={40} round /></TelegramShareButton>
          <EmailShareButton url={url} subject={name}><EmailIcon size={40} round /></EmailShareButton>
        </div>
        <button onClick={handleCopy} className="text-blue-600 text-sm underline mb-3">Copy Link</button>
        <button onClick={onClose} className="w-full py-2 mt-2 border rounded text-gray-600 hover:bg-gray-100">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ShareModal;
