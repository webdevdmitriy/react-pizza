import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

const FullPizza = () => {
  const [pizza, setPizza] = React.useState()
  const { id } = useParams()
  console.log(pizza)

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(`https://63480c73db76843976b90f11.mockapi.io/items/${id}`)
        console.log(data)
        setPizza(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPizza()
  }, [])

  if (!pizza) {
    return 'загрузка'
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>{pizza.price}</p>
    </div>
  )
}

export default FullPizza
