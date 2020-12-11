import React from 'react';
// @ts-ignore No Typescript for TypeSense yet
import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

import Hit from './Hit'
import {
  InstantSearch,
  Hits,
  SearchBox,
	Pagination,
	RefinementList,
	HitsPerPage,
	ToggleRefinement
} from 'react-instantsearch-dom'
import './Search.css'

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "LNU_tester_bra_saker_for_alle__Slapp_av_denne_skal_ikke_brukes_i_prod", // TODO: Switch to search only key, and generate keys on startup
    nodes: [
      {
        host: "localhost",
        port: "8067",
        protocol: "http"
      }
    ]
  },
  // The following parameters are directly passed to Typesense's search API endpoint.
  //  So you can pass any parameters supported by the search endpoint below.
  //  queryBy is required.
  additionalSearchParameters: {
		queryBy: "title,description",
		prefix: false
  }
});
const searchClient = typesenseInstantsearchAdapter.searchClient;


const Search = () => {
	 return <div>
        <header className="header">
          <h1 className="header-title">
            <a href="/">typesense-instantsearch-demo</a>
          </h1>
          <p className="header-subtitle">
            using{' '}
            <a href="https://github.com/algolia/react-instantsearch">
              React InstantSearch
            </a>
          </p>
        </header>

        <div className="container">
          <InstantSearch searchClient={searchClient} indexName="spaces">

            <div className="search-panel">
						<div className="search-panel__filters">
						<h4>Fritekst:</h4>
						<SearchBox
									// @ts-ignore No className on SearchBox, but still works
                  className="searchbox"
                  translations={{
                    placeholder: '',
                  }}
                />
						<h4>Hvordan bookes det:</h4>
						<RefinementList 
							attribute="includesLinkToBookingPage" 
							transformItems={(items: any) => items.map((item: any) => ({
								...item, 
								label: item.label === "true" ? "Bookingsystem" : "Kontakt for avtale" 
							}))}
							/>
						<h4>Fylke:</h4>
						<RefinementList 
							attribute="fylke" 
							operator="or"
							limit={20}
							/>
						<h4>Kommune:</h4>
						<RefinementList 
								searchable
								attribute="kommune" 
								operator="or"
						/>

						</div>
              <div className="search-panel__results">
                
							
                <Hits hitComponent={Hit} />


                <div className="pagination">
                  <Pagination />
									<HitsPerPage
											defaultRefinement={10}
											items={[
												{ value: 10, label: '10 per side' },
												{ value: 50, label: '50 per side' },
											]}
										/>
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      </div>
}

export default Search