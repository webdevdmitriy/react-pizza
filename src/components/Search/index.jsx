import React from 'react'
import styles from './Search.module.scss'
import { SearchContext } from '../../App'

export const Search = () => {
  const { searchValue, setSearchValue } = React.useContext(SearchContext)
  return (
    <input
      onChange={e => setSearchValue(e.target.value)}
      className={styles.root}
      placeholder="поиск пиццули"
      value={searchValue}
    />
  )
}

export default Search
