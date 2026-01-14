import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  None = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

interface SortOptions {
  sortField: SortType;
  reversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, reversed }: SortOptions,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.None);
  const [reversed, setReversed] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reversed,
  });

  const reverseGoods = () => {
    setReversed(!reversed);
  };

  const resetGoods = () => {
    setSortField(SortType.None);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            sortField !== SortType.Alphabetically && 'is-light',
          )}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            sortField !== SortType.Length && 'is-light',
          )}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-info', !reversed && 'is-light')}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
