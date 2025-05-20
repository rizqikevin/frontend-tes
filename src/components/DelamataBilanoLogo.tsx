import React from "react";

const DelamataBilanoLogo: React.FC = () => {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <svg
          width="36"
          height="24"
          viewBox="0 0 72 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chevron kiri */}
          <path d="M0 0L24 24L0 48H28L52 24L28 0H0Z" fill="white" />
          {/* Segi enam kanan atas */}
          <path d="M32 0L56 24H72L48 0H32Z" fill="white" />
          {/* Segi enam kanan bawah */}
          <path d="M32 48L56 24H72L48 48H32Z" fill="white" />
        </svg>
      </div>
      <div className="text-white font-bold leading-tight">
        <div className="text-lg">Delamata Bilano</div>
        <div className="text-xs uppercase tracking-wider">ENCOSYS</div>
      </div>
    </div>
  );
};

export default DelamataBilanoLogo;
