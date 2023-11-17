import { useState, useEffect } from 'react';
import CardDetail from './CardDetail';

const CardList = () => {
  const [cards, setCards] = useState(null);
  const API_KEY= `${process.env.REACT_APP_API_KEY}`

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch(`https://rawg.io/api/games?page_size=20?token&key=${API_KEY}`);
      if (!res.ok) throw new Error(res.statusText)
      const json = await res.json();
      setCards(json.results);
    }
    fetchCards().catch(error => error.message)
  }, [API_KEY])

  return (
    <div id='main'>
      {cards === null ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {cards.map(game => (
            <CardDetail key={game.id} title={game.name} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default CardList;