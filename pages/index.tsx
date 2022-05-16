//components
import { Box } from '@chakra-ui/react';
import { Header } from '@components/header';

const Home = () => {
  return (
    <Box id="app" pt={'3.125rem'} w={'full'} h={'full'} minH={'100vh'} minW={'100vw'} pos={'relative'}>
      <Header />
      {/*<Switch>*/}
      {/*  <Route exact path="/">*/}
      {/*    <Splash />*/}
      {/*  </Route>*/}
      {/*</Switch>*/}
      <Box
        id="body"
        position={'relative'}
        width={'100%'}
        min-height={'calc(100vh - 75px)'}
        display={'flex'}
        padding-bottom={'75px'} /* Footer Height */
      >
        {/*<Switch>*/}
        {/*  <Route exact path="/">*/}
        {/*    <Temp />*/}
        {/*  </Route>*/}
        {/*  <Route path="/world">*/}
        {/*    <div className="content-plane">*/}
        {/*      <Article />*/}
        {/*    </div>*/}
        {/*  </Route>*/}
        {/*  <Route path="/explore">*/}
        {/*    <Explore />*/}
        {/*  </Route>*/}
        {/*</Switch>*/}
      </Box>
      {/*<Footer />*/}
      {/*<User />*/}
    </Box>
  );
};

export default Home;
