import React from 'react';

type CVProps = {};

const CV: React.FC<CVProps> = () => {
  return (
    <div className="flex flex-col max-w-screen-lg">
      <div>
        <img src={'/img/cv1.jpg'} className="object-cover" />
      </div>
      <img src={'/img/cv2.jpg'} />
    </div>
  );
};

export default CV;
