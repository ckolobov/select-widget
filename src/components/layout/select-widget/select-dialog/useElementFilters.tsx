import { Element } from "../../../../api";
import debounce from "lodash.debounce";
import { useMemo, useState, useEffect } from "react";

export enum SelectBoxValues {
  Empty = 'empty',
  MoreThan10 = '10',
  MoreThan50 = '50',
  MoreThan100 = '100',
}

export function useElementFilters(elements: Element[], search: string, filter: SelectBoxValues) {
  const [filteredElements, setFilteredElements] = useState<Element[]>(elements)

  const filterElements = useMemo(() => debounce((search, filter) => {
    setFilteredElements(() => {
      if (!search && (!filter || filter === SelectBoxValues.Empty)) {
        return elements;
      }

      return elements.filter((element) => {
        if (search && !element.label.toLowerCase().includes(search)) {
          return false;
        }
        if (filter && filter !== SelectBoxValues.Empty && element.value < Number(filter)) {
          return false;
        }
        return true;
      })
    })
  }, 100), [elements, setFilteredElements])

  useEffect(() => {
    filterElements(search, filter)
  }, [search, filter, filterElements])

  return filteredElements;
}