import React, { useEffect } from 'react';

function Result() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    console.log(searchParams);

    // function parseCategoryName() {
    //   switch (searchParams.get('category')) {
    //     case 'general knowledge':
    //       setCategoryName('General Knowledge');
    //       break;
    //     case 'geography':
    //       setCategoryName('Geography');
    //       break;
    //     case 'history':
    //       setCategoryName('History');
    //       break;
    //     default:
    //       setCategoryName('Unknown');
    //   }
    // }
  }, []);

  return <div>page</div>;
}

export default Result;
