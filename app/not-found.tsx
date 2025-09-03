import { Metadata } from 'next';
import css from '../components/Home/Home.module.css'

export const metadata: Metadata = {
  title: "Page not found – NoteHub",
  description: "Ця сторінка не існує в NoteHub.",
  openGraph: {
    title: "Page not found – NoteHub",
    description: "Ця сторінка не існує в NoteHub.",
    url: "https://08-zustand-eta-seven.vercel.app//not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};
export default function NotFound() {
    return (
        <>
        <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>
</>
    );
}