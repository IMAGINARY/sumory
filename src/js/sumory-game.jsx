import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function SumoryGame(props) {
  const {
    strings, config, values, turns, onGameOver,
  } = props;
  const [selections, setSelections] = useState([]);

  const gameOver = (turns === selections.length);
  const isLastTurn = (turns === selections.length + 1);
  const sum = selections.reduce((total, selection) => total + values[selection], 0);

  const cardClicked = (i) => {
    if (!gameOver) {
      setSelections([...selections, i]);
      if (isLastTurn) {
        if (onGameOver) {
          onGameOver(sum);
        }
      }
    }
  };

  // Allows to use Array functions to repeat something n times
  // by creating an array with n dummy elements
  const times = n => [...Array(n)];

  return (
    <div className="sumory-game">
      <div className="status">
        <div className="status-sum">
          {strings.sum}
          &nbsp;
          <span className="value">{sum}</span>
        </div>
        <div className="status-turns">
          {strings.draws}
          &nbsp;
          <span className="value">{turns - selections.length}</span>
        </div>
      </div>
      <div className="sumory-board">
        {
          values.map((value, i) => {
            const timesSelected = selections.reduce((total, sel) => total + (sel === i ? 1 : 0), 0);
            const turned = timesSelected > 0;
            const text = value > 0 ? `+${value}` : value;
            return (
              <div className={classnames('sumory-card', { visible: turned })} key={i} onClick={cardClicked.bind(null, i)}>
                <span className="value">{ turned ? text : '?' }</span>
                { times(timesSelected).map((_, j) => <span className="value-ghost" key={j}>{ text }</span>) }
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

SumoryGame.propTypes = {
  config: PropTypes.shape({
  }).isRequired,
  strings: PropTypes.objectOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  turns: PropTypes.number.isRequired,
  onGameOver: PropTypes.func,
};

SumoryGame.defaultProps = {
  onGameOver: null,
};
