import React, { Suspense } from 'react';

const Lazy = React.lazy(() =>
  import(/* webpackChunkName: 'footer', webpackPrefetch: true */ './Footer')
);

function HomePageAsync() {
  return (
    <div>
      <Suspense fallback={<div />}>
        <Lazy />
      </Suspense>
    </div>
  );
}

export default HomePageAsync;