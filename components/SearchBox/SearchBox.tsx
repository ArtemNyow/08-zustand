import { useState } from 'react';
import css from './SearchBox.module.css'

interface SearchBoxProps{
  onChange: (value: string) => void;
}
export default function SearchBox({ onChange }: SearchBoxProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    onChange(val);
  }

   return (
  <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={value}
      onChange={handleChange}
    />

  );
}