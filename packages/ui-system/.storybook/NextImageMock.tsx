import React from 'react';

const NextImageMock = ({ src, alt, width, height, ...props }) => (
  <img src={src} alt={alt} width={width} height={height} {...props} />
);

export default NextImageMock;
