// TagsMenu.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './TagsMenu.module.css';
import { useState } from 'react';

interface TagsMenuProps {
  tags: string[];
}

export default function TagsMenu({ tags }: TagsMenuProps) {
  const pathname = usePathname();
  const currentTag = pathname?.split('/')[3] || 'All'; 

  const [open, setOpen] = useState(false);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={() => setOpen(prev => !prev)}>
        {currentTag === '' ? 'Notes ▾' : `${currentTag} ▾`}
      </button>
      {open && (
        <ul className={css.menuList}>
          {tags.map(tag => (
            <li
              key={tag}
              className={`${css.menuItem} ${tag === currentTag ? css.menuItemActive : ''}`}
            >
              <Link href={`/notes/filter/${tag}`} className={css.menuLink} onClick={() => setOpen(false)}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
