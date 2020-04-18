/* globals IMAGINARY */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropdown from './dropdown';
import Modal from './modal';
import SumoryGame from './sumory-game';
import { generateValues } from './helpers/sumory-random';
import SumoryAnalysis from './sumory-analysis';

export default function SumoryApp(props) {
  const CARD_COUNT = 21;
  const TURNS = 7;
  const { config } = props;
  const [language, setLanguage] = useState('en');
  const [strings, setStrings] = useState({});
  const [cardValues, setCardValues] = useState(generateValues(CARD_COUNT));
  const [gameNumber, setGameNumber] = useState(1);
  const [finalScore, setFinalScore] = useState(null);

  useEffect(() => {
    if (IMAGINARY.i18n.getLang() !== language) {
      IMAGINARY.i18n.setLang(language).then(() => {
        setStrings(IMAGINARY.i18n.getStrings());
      });
    }
  });

  const handleGameOver = (sum) => {
    setTimeout(() => { setFinalScore(sum); }, 2000);
  };

  const restart = () => {
    setFinalScore(null);
    setGameNumber(gameNumber + 1);
    setCardValues(generateValues(CARD_COUNT));
  };

  const handleModalClose = () => {
    restart();
  };

  return (
    <div className="sumory-app">
      <h1 className="text-center">{strings.header}</h1>
      <SumoryGame
        key={gameNumber}
        config={config}
        strings={strings}
        values={cardValues}
        turns={TURNS}
        onGameOver={handleGameOver}
      />
      <div className="util-menu">
        <div className="left">
          <button
            type="button"
            className="s-btn restart"
            onClick={() => { restart(); }}
          >
            <span className="fas fa-redo-alt fa-lg mr-2" />
            <span>Restart</span>
          </button>
        </div>
        <div className="right">
          <Dropdown
            className="lang-switcher"
            items={config.languages}
            selected={language}
            onSelect={(code) => { setLanguage(code); }}
          >
            <span className="fas fa-caret-left mr-2" />
            <span className="fas fa-language fa-2x mr-2" />
          </Dropdown>
        </div>
      </div>
      {
        finalScore
        && (
          <Modal showCloseButton={false}>
            <SumoryAnalysis
              config={config}
              strings={strings}
              values={cardValues}
              turns={TURNS}
              userSum={finalScore}
            />
            <div className="text-center mt-5">
              <button type="button" className="s-btn" onClick={() => { restart(); }}>
                <span className="fas fa-redo-alt fa-lg mr-2" />
                Play again
              </button>
            </div>
          </Modal>
        )
      }
    </div>
  );
}

SumoryApp.propTypes = {
  config: PropTypes.shape({
    languages: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
};
