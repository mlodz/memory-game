import { useState, useCallback, useEffect } from 'react';

async function sleep(ms) {
  let promise = new Promise(res => {
    setTimeout(res, ms);
  });
  return promise;
}



function useMatchGameModel(chars) {
  // list of characters that represent the cards
  let [orderedChars, setOrderedChars] = useState([]);
  // 0, 1, or 2 cards can be selected
  let [selectedCard, setSelectedCard] = useState(-1);
  let [selectedCard2, setSelectedCard2] = useState(-1);
  // these are cards that have been matched and will be visible
  let [cardsFound, setCardsFound] = useState(new Set());
  // Track how many turns have been played so far
  let [turnCount, setTurnCount] = useState(0);


  const SLEEPMS = 500;

  useEffect(() => {
    reset();
  }, []);

  const shuffleChars = function() {
  };

  const isMatch = function(index1, index2) {
    return orderedChars[index1] === orderedChars[index2];
  };

  const reset = function() {
    console.log('shuffling the chars');
    let newChars = [...chars, ...chars].sort(() => Math.random() > 0.5 ? -1 : 1);
    //let newChars = [...chars, ...chars]; // unshuffled for testing
    setOrderedChars(newChars);

    setSelectedCard(-1);
    setSelectedCard2(-1);
    setCardsFound(new Set());
    setTurnCount(0);
  };

  const handleClickCard = useCallback(async (cardIndex) => {
    let disabled = (selectedCard2 !== -1);
    // do nothing if clicking when disabled
    if (disabled) {
      return;
    }
    // do nothing if clicking on a card that's already displayed
    let clickedOnFoundCard = cardsFound.has(cardIndex);
    if (clickedOnFoundCard) {
      return;
    }
    // Select the card if none are currently selected
    if (selectedCard === -1) {
      setSelectedCard(cardIndex);
      return;
    }
    // do nothing if you click on the selected card again
    if (selectedCard === cardIndex) {
      return;
    }


    // There must be 1 card selected. Check if 2nd card selected is a match.
    setTurnCount(c => c+1);

    let matching = isMatch(selectedCard, cardIndex);
    if (matching) {
      setSelectedCard(-1);
      let found = new Set(cardsFound);
      found.add(selectedCard);
      found.add(cardIndex);
      setCardsFound(found);
    } else {
      setSelectedCard2(cardIndex);
      // show both selected cards and wait before hiding them again
      await sleep(SLEEPMS);
      setSelectedCard(-1);
      setSelectedCard2(-1);
    }

  }, [selectedCard, selectedCard2, turnCount]);

  const isCardVisible = i => selectedCard === i  || selectedCard2 === i || cardsFound.has(i);

  let cards = orderedChars.map((char, i) => ({
    char: char, // isCardVisible(i) ? char : '',
    index: i,
    visible: isCardVisible(i),
  }));

  let isFinished = cardsFound.size == orderedChars.length;

  return {
    cards,
    handleClickCard,
    isFinished,
    turnCount,
    reset,
  };
}


export {
  useMatchGameModel
};
