import React, { lazy, Suspense } from "react";

// Higher-order component for lazy loading with suspense
const WithSuspense = (importFunc) => {
  const LazyComponent = lazy(importFunc);

  return function ComponentWithSuspense(props) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
};

export default WithSuspense;
