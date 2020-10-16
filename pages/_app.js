import { motion, AnimatePresence } from 'framer-motion';
import '../styles/globals.css';

function App({ Component, pageProps, router }) {
  return (
    <AnimatePresence>
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
          pageExit: {
            backgroundColor: '#fff',
            filter: `invert()`,
            opacity: 0,
          },
        }}
      >
        <Component {...pageProps} />;
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
