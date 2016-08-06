import React from 'react';

class Support extends React.Component {
    render() {
        return (
            <div className="row">
                <div>
                    <h2>Steemit Support</h2>
                    <p>
                        Please email your questions to <a href="mailto:support@steemit.vlj.lt">support@steemit.vlj.lt</a>.
                    </p>
                </div>
            </div>
        );
    }
}

module.exports = {
    path: 'support.html',
    component: Support
};
