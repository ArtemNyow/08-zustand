'use client';

import Link from "next/link";
import css from "./SidebarNotes.module.css";

interface SidebarNotesProps {
  tags: string[];
  activeTag?: string;
}

export default function SidebarNotes({ tags, activeTag = "All" }: SidebarNotesProps) {
  return (
    <div className={css.menuContainer}>
      <ul className={css.menuList}>
        {tags.map(tag => (
          <li key={tag} className={css.menuItem}>
            <Link
              href={`/notes/filter/${tag}`}
              className={`${css.menuLink} ${activeTag === tag ? css.active : ''}`}
            >
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
