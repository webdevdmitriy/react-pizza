import React from 'react'

import { useSelector, useDispatch } from 'react-redux'

import Sort from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'

import {
  setCategoryId,
  setCurrentPage,
  selectSort,
  selectFilter,
} from '../redux/slices/filterSlice.js'

import Categories from '../components/Categories.jsx'
import Pagination from '../components/Pagination/index.jsx'
import { SearchContext } from '../App.js'
import { fetchPizzas, setItems, selectPizzaData } from '../redux/slices/pizzaSlice.js'
import { Link } from 'react-router-dom'

const Home = () => {
  const dispatch = useDispatch()
  const { categoryId, sort, currentPage } = useSelector(selectFilter)
  const { items, status } = useSelector(selectPizzaData)
  const sortType = sort.sortProperty

  const onChangeCategory = id => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  const { searchValue } = React.useContext(SearchContext)

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : ''

    dispatch(
      fetchPizzas({
        search,
        sortType,
        currentPage,
        categoryId,
      })
    )
  }

  React.useEffect(() => {
    getPizzas()
  }, [categoryId, sortType, searchValue, currentPage])
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={i => onChangeCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2> Ошибочка</h2>
          <p>Точно, она</p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
            : items
                // .filter(obj => new RegExp(searchValue, 'gi').test(obj.title))
                .map(obj => (
                  <Link key={obj.id} to={`/pizza/${obj.id}`}>
                    <PizzaBlock {...obj} />
                  </Link>
                ))}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={number => onChangePage(number)} />
    </>
  )
}

export default Home
