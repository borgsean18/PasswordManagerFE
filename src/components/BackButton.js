import Link from 'next/link';
import styles from './BackButton.module.css';

export default function BackButton() {
  return (
    <Link href="/" className={`absolute top-4 left-4 text-white p-2 ${styles.backButton}`}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </Link>
  );
}