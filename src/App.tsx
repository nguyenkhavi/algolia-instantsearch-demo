import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  Configure,
  DynamicWidgets,
  Highlight,
  Hits,
  InstantSearch,
  Pagination,
  RefinementList,
  SearchBox,
  HierarchicalMenu,
} from 'react-instantsearch';

import { Panel } from './Panel';

import type { Hit } from 'instantsearch.js';

import './App.css';

const searchClient = algoliasearch(
  '68XBUZJBT3',
  '37881fa452f00b00dfa903c304cb55fe'
);

const future = { preserveSharedStateOnUnmount: true };

export function App() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">
          <a href="/">tour-aggregator-demo</a>
        </h1>
        <p className="header-subtitle">
          using{' '}
          <a href="https://github.com/algolia/instantsearch/tree/master/packages/react-instantsearch">
            React InstantSearch
          </a>
        </p>
      </header>

      <div className="container">
        <InstantSearch
          searchClient={searchClient}
          indexName="products"
          future={future}
        >
          <Configure hitsPerPage={8} />
          <div className="search-panel">
            <div className="search-panel__filters">
              {/* <DynamicWidgets fallbackComponent={RefinementList}>
                <Panel header="categories.lvl0">
                  <RefinementList attribute="categories.lvl0" />
                </Panel>
                <Panel header="categories.lvl1">
                  <RefinementList attribute="categories.lvl1" />
                </Panel>
                <Panel header="categories.lvl2">
                  <RefinementList attribute="categories.lvl2" />
                </Panel>
              </DynamicWidgets> */}
              <HierarchicalMenu
                attributes={[
                  'categories.lvl0',
                  'categories.lvl1',
                  'categories.lvl2',
                ]}
                showMore={true}
              />
            </div>

            <div className="search-panel__results">
              <SearchBox placeholder="Typing..." className="searchbox" />
              <Hits hitComponent={Hit} />

              <div className="pagination">
                <Pagination />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </div>
  );
}

type HitProps = {
  hit: Hit;
};

function Hit({ hit }: HitProps) {
  const url = (hit.coverVariant || []).find((item) =>
    [400, 480].includes(item.height)
  ).url;

  return (
    <article>
      <div>
        <h1>
          <Highlight attribute="productName" hit={hit} />
        </h1>
        <p>#{hit.productCode}</p>
        <p>
          <Highlight attribute="description" hit={hit} />
        </p>
        {url && <img className="image" src={url} alt={hit.productName} />}
      </div>
    </article>
  );
}
