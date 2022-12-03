import React, {Suspense, useEffect} from 'react';
import {useMediaQuery} from 'react-responsive';
import Loader from './package/Loader/Loader';
import {useTheme} from './utils/helpers';

const HomeScreen = React.lazy(() => import('./modules/Home/HomeScreen'));
const MobileHomeScreen = React.lazy(
  () => import('./modules/MobileHome/MobileHomeScreen'),
);

function App() {
  const isTabletOrMobile = useMediaQuery({query: '(max-width: 1140px)'});
  useEffect(() => {
    useTheme();
  }, []);
  return (
    <Suspense fallback={<Loader />}>
      {isTabletOrMobile ? <MobileHomeScreen /> : <HomeScreen />}
    </Suspense>
  );
}

export default App;
