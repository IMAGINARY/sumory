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
              labelString: strings.analysis_chart_x_label,
              display: true,
              fontSize: 18,
              fontColor: '#fff',
            },
          }],
          yAxes: [{
            gridLines: { color: '#666', zeroLineColor: '#fff' },
            ticks: { fontSize: 14, fontColor: '#fff' },
            scaleLabel: {
              labelString: strings.analysis_chart_y_label,
              display: true,
              fontSize: 18,
              fontColor: '#fff',
            },
          }],
        },
        legend: { display: false },
      },
    });
  }, []);

  return (
    <div className="sumory-analysis">
      <div className="sumory-analysis-text">
        <span>{`${strings.final_result} ${userSum}`}</span>
        <br />
        <span dangerouslySetInnerHTML={{
          __html: userSum > best
            ? `${(strings.result_better && strings.result_better.replace('%percentage', ((userSum / best) * 100 - 100).toFixed(1))) || ''}`
            : `${(strings.result_worse && strings.result_worse.replace('%percentage', ((userSum / best) * -100 + 100).toFixed(1))) || ''}`,
        }}
        />
      </div>
      <div className="sumory-analysis-explanation">
        <p dangerouslySetInnerHTML={{ __html: strings.explanation_1 }} />
        <p dangerouslySetInnerHTML={{ __html: strings.explanation_2 }} />
        <p dangerouslySetInnerHTML={{ __html: strings.explanation_3 }} />
        <p dangerouslySetInnerHTML={{ __html: strings.explanation_4 }} />
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
