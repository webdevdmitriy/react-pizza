import React from 'react'
import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'

import Sort from '../components/Sort.jsx'
import PizzaBlock from '../components/PizzaBlock'
import { Skeleton } from '../components/PizzaBlock/Skeleton'

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice.js'
import Categories from '../components/Categories.jsx'
import Pagination from '../components/Pagination/index.jsx'
import { SearchContext } from '../App.js'

const Home = () => {
  const dispatch = useDispatch()
  const { categoryId, sort, currentPage } = useSelector(state => state.filter)
  const sortType = sort.sortProperty

  const onChangeCategory = id => {
    dispatch(setCategoryId(id))
  }
  const onChangePage = number => {
    dispatch(setCurrentPage(number))
  }

  const setCetegoryId = () => {}

  const { searchValue } = React.useContext(SearchContext)
  const [items, setItems] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  // const [categoryId, setCetegoryId] = React.useState(0)
  // const [currentPage, setCurrentPage] = React.useState(1)
  // const [sortType, setSortType] = React.useState({
  //   name: 'популярности',
  //   sortProperty: 'rating',
  // })

  const fetchPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : ''
    // await axios
    //   .get(
    //     `https://63480c73db76843976b90f11.mockapi.io/items?page=${currentPage}&limit=4&${
    //       categoryId > 0 ? `category=${categoryId}` : ''
    //     }&sortBy=${sortType}${search}`
    //   )

    const res = await axios.get(
      `https://63480c73db76843976b90f11.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType}${search}`
    )
    setItems(res.data)
    setIsLoading(true)
  }

  React.useEffect(() => {
    fetchPizzas()
  }, [categoryId, sortType, searchValue, currentPage])
  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={i => onChangeCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {isLoading
          ? items
              // .filter(obj => new RegExp(searchValue, 'gi').test(obj.title))
              .map(obj => <PizzaBlock key={obj.id} {...obj} />)
          : [...new Array(6)].map((_, index) => <Skeleton key={index} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={number => onChangePage(number)} />
    </>
  )
}

export default Home
