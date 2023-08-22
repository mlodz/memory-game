import './style.css';

import { useState, useCallback, useEffect } from 'react';
import Card from './Card';
import { useMatchGameModel } from './hooks';

const GAME_TYPE = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  HARD2: 'hard2',
};

const GAME_CHARS = {
  [GAME_TYPE.EASY]:   ["🔥", "🌻"],
  [GAME_TYPE.MEDIUM]: ["❤️", "😀", "💩", "🙈"],
  [GAME_TYPE.HARD]:   ["😭", "🤣", "😂️", "😀", "😘", "😅"],
  [GAME_TYPE.HARD2]:   ["😵‍💫", "🫠", "😂️", "😀", "😘", "😅", "😭", "🤣", "😂️", "😀", "😘", "😅", "😬", "🥸", "🤩", "🥳"],
};
const GAME_CLASS = {
  [GAME_TYPE.EASY]:   'small',
  [GAME_TYPE.MEDIUM]: 'small',
  [GAME_TYPE.HARD]:   'small',
  [GAME_TYPE.HARD2]:  'large',
};

export default function MatchGameApp() {
  let [difficulty, setDifficulty] = useState();

  let chars = GAME_CHARS[difficulty];
  let game = null;
  let gameClass = GAME_CLASS[difficulty];
  if (chars) {
    game = <MatchGame chars={chars} key={difficulty} />;
  }

  return (
    <div className="MatchGame">
      <header>
        <h1>Memory Game</h1>
        {game
         ?
         <button onClick={() => setDifficulty(null)}>Change Difficulty</button>
         :
         <>
           <button onClick={() => setDifficulty(GAME_TYPE.EASY)}>Easy</button>
           <button onClick={() => setDifficulty(GAME_TYPE.MEDIUM)}>Medium</button>
           <button onClick={() => setDifficulty(GAME_TYPE.HARD)}>Hard</button>
           <button onClick={() => setDifficulty(GAME_TYPE.HARD2)}>Extra Hard</button>
         </>
        }
      </header>
      <div className={gameClass}>
        {game}
      </div>

    </div>
  );
}



function MatchGame({chars}) {

  let {
    cards,
    turnCount,
    handleClickCard,
    isFinished,
    reset
  } = useMatchGameModel(chars);

  return (
    <div className="MatchGameInner">
      <div className="">
        <div className="card-grid">
          {cards.map(({char, index, visible}) =>
            <Card
              char={char}
              index={index}
              key={index}
              onClick={handleClickCard}
              visible={visible}
            />
          )}
        </div>

        {isFinished &&
         <div className="winner-banner">
           <h3>You win!</h3>
           <button onClick={reset}>Play Again</button>
         </div>
        }

      </div>
    </div>
  );

}
