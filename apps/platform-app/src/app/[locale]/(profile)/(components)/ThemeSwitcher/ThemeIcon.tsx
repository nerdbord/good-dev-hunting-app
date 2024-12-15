import React from 'react'

type ThemeIconProps = {
  isDarkTheme: boolean
  className?: string
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({
  isDarkTheme,
  className,
}) => {
  return (
    <div className={className}>
      {isDarkTheme ? (
        // SVG dla księżyca
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="20"
          height="20"
          aria-hidden="true"
        >
          <path
            d="M15 10.4505C14.9124 11.3981 14.5568 12.3013 13.9746 13.0542C13.3925 13.8071 12.608 14.3787 11.7129 14.702C10.8177 15.0253 9.84906 15.087 8.92016 14.8799C7.99125 14.6728 7.14055 14.2054 6.46758 13.5324C5.79461 12.8595 5.32722 12.0087 5.1201 11.0798C4.91298 10.1509 4.97469 9.18225 5.29801 8.28714C5.62133 7.39202 6.19289 6.6075 6.94581 6.02537C7.69873 5.44324 8.60187 5.08758 9.54955 5C8.99471 5.75063 8.72772 6.67547 8.79714 7.60631C8.86655 8.53716 9.26776 9.41217 9.9278 10.0722C10.5878 10.7322 11.4628 11.1334 12.3937 11.2029C13.3245 11.2723 14.2494 11.0053 15 10.4505Z"
            fill="#A687FF"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="#3D434B"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.99757 13.1788C11.7545 13.1788 13.1787 11.7546 13.1787 9.99769C13.1787 8.24078 11.7545 6.81653 9.99757 6.81653C8.24066 6.81653 6.81641 8.24078 6.81641 9.99769C6.81641 11.7546 8.24066 13.1788 9.99757 13.1788Z"
            fill="#7D54F1"
          />
          <path
            d="M10 3V4.27246"
            stroke="#7D54F1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M10 15.7275V17"
            stroke="#7D54F1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.05078 5.04785L5.95423 5.9513"
            stroke="#7D54F1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.0469 14.0459L14.9503 14.9493"
            stroke="#7D54F1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3 9.99805H4.27246"
            stroke="#7D54F1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M15.7266 9.99805H16.999"
            stroke="#7D54F1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5.05078 14.9493L5.95423 14.0459"
            stroke="#7D54F1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14.0469 5.9513L14.9503 5.04785"
            stroke="#7D54F1"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </div>
  )
}
