import { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { motion } from 'framer-motion';
import Character from '../components/character';

const defaultEndpoint = `https://rickandmortyapi.com/api/character/`;

const gridVariants = {
  exit: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const gridMotionProps = {
  initial: 'initial',
  animate: 'enter',
  exit: 'exit',
  variants: gridVariants,
};

export async function getServerSideProps() {
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }) {
  const { info, results: defaultResults = [] } = data;
  const [results, updateResults] = useState(defaultResults);
  const [page, updatePage] = useState({ ...info, current: defaultEndpoint });
  const [query, setQuery] = useState('');

  const { current } = page;

  useEffect(() => {
    if (current === defaultEndpoint) return;

    async function request() {
      const res = await fetch(current);
      const nextData = await res.json();

      updatePage({
        current,
        ...nextData.info,
      });

      if (!nextData.info?.prev) {
        updateResults(nextData.results);
        return;
      }

      updateResults((prev) => {
        return [...prev, ...nextData.results];
      });
    }

    request();
  }, [current]);

  function handleLoadMore() {
    updatePage((prev) => {
      return {
        ...prev,
        current: page?.next,
      };
    });
  }

  function handleOnSubmitSearch(e) {
    e.preventDefault();

    const value = query.trim() || '';
    const endpoint = `https://rickandmortyapi.com/api/character/?name=${value}`;

    updatePage({ current: endpoint });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Rick and Morty Character Wiki</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.8,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
              },
            },
          }}
        >
          <h1 className={styles.title}>Wubba Lubba Dub Dub!</h1>
        </motion.div>

        <p className={styles.description}>Rick and Morty Character Wiki</p>

        <form className="search" onSubmit={handleOnSubmitSearch}>
          <input
            name="query"
            type="search"
            value={query}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.button}>Search</button>
        </form>

        <motion.ul className={styles.grid} {...gridMotionProps}>
          {results.map((result) => {
            return <Character key={result.id} item={result} />;
          })}
        </motion.ul>

        <p>
          <button onClick={handleLoadMore} className="load-more">
            Load More
          </button>
        </p>
      </main>

      <style jsx>
        {`
          .search input {
            margin-right: 0.5em;
          }

          @media (max-width: 600px) {
            .search input {
              margin-right: 0;
              margin-bottom: 0.5em;
            }

            .search input,
            .search button {
              width: 100%;
            }
          }

          .load-more {
            font-size: 1.4em;
            background-color: rgb(0, 197, 131);
            border: 0;
            box-shadow: none;
            border-radius: 4px;
            padding: 8px 20px;
            cursor: pointer;
            color: #fff;
          }
        `}
      </style>
    </div>
  );
}
