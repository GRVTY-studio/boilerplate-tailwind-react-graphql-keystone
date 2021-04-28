import React from 'react';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom';

const Overview = () => (
    <div className="grid grid-flow-row gap-10 mb-20">
        <Helmet>
            <script
                type="text/javascript"
                id="hs-script-loader"
                async
                defer
                src="//js-na1.hs-scripts.com/9156486.jsjs-na1.hs-scripts.com/9156486.js"
            />
        </Helmet>

        <h1>Summary</h1>
    </div>
);

export default withRouter(Overview);
