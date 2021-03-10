import { useState, useEffect } from 'react';

//header components
import Header from '@/components/header/index';

export default (props: any) => {
  const Root = (
    <div className="body home">
      <Header></Header>
      <div className="home-main"></div>
    </div>
  );

  return Root;
};
