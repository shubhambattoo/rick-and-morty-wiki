import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { motion } from 'framer-motion';

const postVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
};

const postWhileHover = {
  position: 'relative',
  zIndex: 1,
  scale: [1, 1.4, 1.2],
  rotate: [0, 10, -10, 0],
  filter: [
    'hue-rotate(0) contrast(100%)',
    'hue-rotate(360deg) contrast(200%)',
    'hue-rotate(45deg) contrast(300%)',
    'hue-rotate(0) contrast(100%)',
  ],
  transition: {
    duration: 0.2,
  },
};

const postMotionProps = {
  initial: 'initial',
  animate: 'enter',
  variants: postVariants,
  whileHover: postWhileHover,
};

export default function Character({ item }) {
  const { id, name, image } = item;

  return (
    <motion.li className={styles.card} {...postMotionProps}>
      <Link href="/character/[id]" as={`/character/${id}`}>
        <a>
          <img src={image} alt={`${name} Thumbnail`} />
          <h3>{name}</h3>
        </a>
      </Link>
    </motion.li>
  );
}
