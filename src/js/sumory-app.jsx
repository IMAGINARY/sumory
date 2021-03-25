/* globals IMAGINARY */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Dropdown from './dropdown';
import Modal from './modal';
import SumoryGame from './sumory-game';
import { generateValues } from './helpers/sumory-random';
import SumoryAnalysis from './sumory-analysis';

export default function SumoryApp(props) {
  const CARD_COUNT = 21;
  const TURNS = 10;
  const ANIMATION_TIMEOUT = 500;
  const { config } = props;
  const [language, setLanguage] = useState(config.defaultLanguage || 'en');
  const [strings, setStrings] = useState({});
  const [cardValues, setCardValues] = useState(generateValues(CARD_COUNT));
  const [gameNumber, setGameNumber] = useState(1);
  const [gameStatus, setGameStatus] = useState({ score: 0, turnsLeft: TURNS });
  const [analysisVisible, setAnalysisVisible] = useState(false);

  const instructions = (strings.instructions && strings.instructions.replace('%turns', TURNS)) || '';

  useEffect(() => {
    IMAGINARY.i18n.setLang(language).then(() => {
      setStrings(IMAGINARY.i18n.getStrings());
    });
  }, [] /* Run on first render only */);

  function handleLanguageChange(code) {
    setLanguage(code);
    IMAGINARY.i18n.setLang(code).then(() => {
      setStrings(IMAGINARY.i18n.getStrings());
    });
  }

  function handleGameUpdate(newSum, newTurnsLeft) {
    setGameStatus({ score: newSum, turnsLeft: newTurnsLeft });
    if (newTurnsLeft === 0) {
      setTimeout(() => { setAnalysisVisible(true); }, 1000);
    }
  }

  function restart() {
    setGameNumber(gameNumber + 1);
    setGameStatus({ score: 0, turnsLeft: TURNS });
    setCardValues(generateValues(CARD_COUNT));
  }

  return (
    <div className="sumory-app">
      <div className="header">
        <div className="instructions">{ instructions }</div>
        <div className="status">
          <div className="status-box status-turns">
            <div className="label">{strings.draws}</div>
            <div className="value">{gameStatus.turnsLeft}</div>
          </div>
          <div className="status-box status-sum">
            <div className="label">{strings.sum}</div>
            <div className="value">{gameStatus.score}</div>
          </div>
        </div>
      </div>
      <SumoryGame
        key={gameNumber}
        strings={strings}
        values={cardValues}
        turns={TURNS}
        onUpdate={handleGameUpdate}
      />
      <div className="util-menu">
        <div className="left">
          <button
            type="button"
            className="s-btn restart"
            onClick={() => { restart(); }}
          >
            <span className="fas fa-redo-alt fa-lg mr-2" />
            <span>{strings.restart}</span>
          </button>
        </div>
        <div className="right">
          { Object.entries(config.languages).length > 1 && (
            <Dropdown
              className="lang-switcher"
              items={config.languages}
              selected={language}
              onSelect={(code) => { handleLanguageChange(code); }}
            >
              <span className="fas fa-caret-left mr-2" />
              <span className="fas fa-language fa-2x mr-2" />
            </Dropdown>
          )
          }
        </div>
      </div>
      <CSSTransition
        in={analysisVisible}
        timeout={ANIMATION_TIMEOUT}
        mountOnEnter
        unmountOnExit
        onExited={() => { restart(); }}
      >
        <Modal showCloseButton={false}>
          <SumoryAnalysis
            config={config}
            strings={strings}
            values={cardValues}
            turns={TURNS}
            userSum={gameStatus.score}
          />
          <div className="text-center mt-5">
            <button type="button" className="s-btn" onClick={() => { setAnalysisVisible(false); }}>
              <span className="fas fa-redo-alt fa-lg mr-2" />
              {strings.play_again}
            </button>
          </div>
        </Modal>
      </CSSTransition>
    </div>
  );
}

SumoryApp.propTypes = {
  config: PropTypes.shape({
    languages: PropTypes.objectOf(PropTypes.string).isRequired,
    defaultLanguage: PropTypes.string,
  }).isRequired,
};
