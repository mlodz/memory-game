import { useState, useCallback } from 'react';

export default function Card({char, index, visible, onClick}) {
  let classes = ['card', 'noselect'];
  !visible && classes.push('hidden');
  return (
    <div className={classes.join(' ')} onClick={() => onClick(index)}>
      {visible && <span className="char">{char}</span>}
    </div>
  );
}
