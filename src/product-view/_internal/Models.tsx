import React from 'react';
import CH24 from './ModelCH24';
import Monkey from './ModelMonkey';

const models: { [k: string]: (showHighlights: boolean) => JSX.Element } = {
	'hans-wegner-ch24': function Model(showHighlights) {
		return <CH24 position={[0, 1, 0]} showHighlights={showHighlights} />;
	},
	'kay-bojesen-monkey': function Model(showHighlights) {
		return <Monkey showHighlights={showHighlights} />;
	},
};

export default models;
