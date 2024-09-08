import './index.scss'
import { ReactNode, useCallback } from "react"

interface SearchProps {
  label: ReactNode;
  value: string;
  onChange: (value: string) => void;
}

export function Search(props: SearchProps) {
  const {label, value, onChange} = props;

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [onChange])

  return (
    <div className="search-container">
      <label htmlFor="search">{label}</label>
      <input name="search" value={value} onChange={handleChange} />
    </div>
  )
}
