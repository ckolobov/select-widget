import './index.scss'
import { ReactNode, useCallback } from "react";

interface SelectOption<T> {
  value: T
  label: string
}

interface SelectProps<T> {
  options: SelectOption<T>[];
  onChange: (value: SelectOption<T>['value']) => void;
  label: ReactNode;
  value: T;
}

export function Select<T extends string>(props: SelectProps<T>) {
  const { options, onChange, label, value } = props;
  const handleChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as T);
  }, [onChange])

  return (
    <div className="filter-container">
      <label htmlFor="filter">{label}</label>
      <select className="filter" name="filter" onChange={handleChange} value={value}>
        {options.map((option) => {
          return <option value={option.value}>{option.label}</option>
        })}
      </select>
    </div>
  )
}