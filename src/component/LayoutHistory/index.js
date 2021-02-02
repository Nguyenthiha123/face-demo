import React from 'react'
import PropTypes from 'prop-types'
import VerifyHistory from '../VerifyHistory'
import RecognizeHistory from '../RecognizeHistory'
import Register from '../Register'
import Check from '../Check'

const LayoutHistory = props => {
    return (
        <div className='container'>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a style={{ position: 'relative', left: '470px', color: "#495057" }} className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Register</a>
                    <a style={{ color: "#495057", position: 'relative', left: '470px' }} className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Recognize</a>
                </div>
            </nav>
            <div className="tab-content" style={{ marginTop: '20px' }} id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <Register />
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <Check />
                </div>

            </div>
        </div>
    )
}

LayoutHistory.propTypes = {

}

export default LayoutHistory
