import React from 'react'

function Categories() {
  const [activeIndex, setAactiveIndex] = React.useState()

  const onClickCategory = index => {
    setAactiveIndex(index)
  }

  let categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

  return (
    <div className="categories">
      <ul>
        {/* <li className="active">Все</li>
        <li>Мясные</li>
        <li>Вегетарианская</li>
        <li>Гриль</li>
        <li>Острые</li>
        <li>Закрытые</li> */}
        {categories.map((item, index) => (
          <li
            onClick={() => onClickCategory(index)}
            className={activeIndex === index ? 'active' : ''}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
