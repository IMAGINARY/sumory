import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default function SumoryGame(props) {
  const {
    strings, values, turns, onUpdate,
  } = props;
  const [selectedCards, setSelectedCards] = useState([]);

  function turnsLeft(selection) {
    return turns - selection.length;
  }

  function sum(selection) {
    return selection.reduce((total, cardId) => total + values[cardId], 0);
  }

  function handleCardClicked(i) {
    if (turnsLeft(selectedCards) !== 0) {
      const newSelection = [...selectedCards, i];
      setSelectedCards(newSelection);
      if (onUpdate) {
        onUpdate(sum(newSelection), turnsLeft(newSelection));
      }
    }
  }

  // Allows to use Array functions to repeat something n times
  // by creating an array with n dummy elements
  const times = n => [...Array(n)];

  return (
    <div className="sumory-game">
      <div className="sumory-board">
        {
          values.map((value, i) => {
            const timesSelected = selectedCards
              .reduce((total, sel) => total + (sel === i ? 1 : 0), 0);
            const turned = timesSelected > 0;
            const text = value > 0 ? `+${value}` : value;
            return (
              <button
                type="button"
                className={classnames('sumory-card', { visible: turned })}
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                onClick={handleCardClicked.bind(null, i)}
              >
                { turned && <span className="value">{ text }</span> }
                {/* eslint-disable-next-line react/no-array-index-key */}
                { times(timesSelected).map((_, j) => <span className="value-ghost" key={j}>{ text }</span>) }
              </button>
            );
          })
        }
      </div>
    </div>
  );
}

SumoryGame.propTypes = {
  strings: PropTypes.objectOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  turns: PropTypes.number.isRequired,
  onUpdate: PropTypes.func,
};

SumoryGame.defaultProps = {
  onUpdate: null,
};
