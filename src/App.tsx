import React, { useEffect, useContext } from 'react';
import { Store } from './Store';

interface IEpisode {
  id: number,
  name: string,
  season: number,
  number: number,
  image: { medium: string }
}

const App = (): JSX.Element => {
	const { state, dispatch } = useContext(Store);

	useEffect(() => {
		state.episodes.length === 0 && fetchDataAction();
	});

	const fetchDataAction = async () => {
		const URL =
			'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
		const response = await fetch(URL);
		const data = await response.json();
		return dispatch({
			type: 'FETCH_DATA',
			payload: data._embedded.episodes,
		});
	};

	return (
		<div className="App">
			<h1>Rick and Morty</h1>
			<p>Pick your favorite episode!!!</p>
      <section>
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key={episode.id}>
              <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`} />
              <div>{episode.name}</div>
              <section>
                Season: {episode.season} Number: {episode.number}
              </section>
            </section>
          )
        })}
      </section>
		</div>
	);
};

export default App;
