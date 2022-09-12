import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import WSockets from './common/WSockets';
import Lila from './components/Lila';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/:id'
					element={
						<div>
							<WSockets />
							<Lila />
						</div>
					}
				/>
				<Route path='/' element={<Navigate to={`/f${(+new Date()).toString(16)}`} />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
