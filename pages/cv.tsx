import React from 'react';

type CVProps = {};

const CV: React.FC<CVProps> = () => {
  return (
    <div className="flex flex-col max-w-screen-lg">
      <div>
        <img src={'/img/cv1.png'} className="object-cover" />
      </div>
    </div>
  );
};

export default CV;
