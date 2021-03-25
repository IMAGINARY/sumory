/* globals Chart */
import React, { useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import calculateStrategies from './helpers/sumory-strategy';

export default function SumoryAnalysis(props) {
  const {
    strings, userSum, values, turns,
  } = props;
  const strategy = useMemo(() => calculateStrategies(values, turns), [values, turns]);
  const canvasEl = useRef(null);
  const best = Math.max(...strategy);

  useEffect(() => {
    const chart = new Chart(canvasEl.current, {
      type: 'bar',
      data: {
        labels: Array(strategy.length).fill(0).map((_, i) => i + 1),
        datasets: [{
          data: strategy.map(value => Math.round((value + Number.EPSILON) * 100) / 100),
          backgroundColor: '#fff797',
          borderColor: '#ffec02',
          datalabels: {
            color: '#fff',
            font: { size: 14 },
            anchor: 'end',
            align: 'top',
            clamp: true,
          },
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: { enabled: false },
        hover: { mode: null },
        layout: { padding: { top: 40 } },
        scales: {
          xAxes: [{
            gridLines: { color: '#666', zeroLineColor: '#fff' },
            ticks: { fontSize: 14, fontColor: '#fff' },
            scaleLabel: {
              labelString: 'Number of turns of exploration',
              display: true,
              fontSize: 18,
              fontColor: '#fff',
            },
          }],
          yAxes: [{
            gridLines: { color: '#666', zeroLineColor: '#fff' },
            ticks: { fontSize: 14, fontColor: '#fff' },
            scaleLabel: {
              labelString: 'Average sum',
              display: true,
              fontSize: 18,
              fontColor: '#fff',
            },
          }],
        },
        legend: { display: false },
      },
    });
  });

  return (
    <div className="sumory-analysis">
      <div className="sumory-analysis-text">
        <span>{`${strings['final-result']} ${userSum}`}</span>
        <br />
        <span dangerouslySetInnerHTML={{
          __html: userSum > best
            ? `${strings['better-0']} ${((userSum / best) * 100 - 100).toFixed(1)}% ${strings['better-1']}`
            : `${strings['worse-0']} ${((userSum / best) * -100 + 100).toFixed(1)}% ${strings['worse-1']}`,
        }}
        />
      </div>
      <div className="sumory-analysis-explanation">
        <p>
          To win at this game it&apos;s very likely you adopted a strategy with two phases:
        </p>
        <p>
          <strong>Explore: </strong>
          Flip cards trying to find a high value.
        </p>
        <p>
          <strong>Exploit: </strong>
          Repeatedly pick the highest value found to maximize the score.
        </p>
        <p>
          Many AI systems learn to perform tasks by using strategies with these two phases.
          They alternate between taking the best known course of action while at the same
          time exploring new options that could bring better results.
        </p>
      </div>
      <div className="sumory-analysis-chart">
        <canvas width="400" height="400" ref={canvasEl} />
      </div>
    </div>
  );
}

SumoryAnalysis.propTypes = {
  config: PropTypes.shape({
  }).isRequired,
  strings: PropTypes.objectOf(PropTypes.string).isRequired,
  values: PropTypes.arrayOf(PropTypes.number).isRequired,
  turns: PropTypes.number.isRequired,
  userSum: PropTypes.number.isRequired,
};
