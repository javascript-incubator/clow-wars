/* eslint-disable react/prop-types, react/jsx-no-bind */
import React from 'react'
import CwazyButtons from './cwazybuttons'
import imageDispatcher from '../utils/imagedispatcher'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export const LostModal = ({isShown, closeModal}) =>
  <ReactCSSTransitionGroup className='transition' transitionName='modal' transitionEnterTimeout={1500} transitionLeaveTimeout={1500} key='Modal1'>
    {isShown && <div className='overlay' onClick={() => closeModal()}>
      <div className='above-all' onClick={e => e.stopPropagation()}>
        <p className='modal-text'>
          Sorry You Lost Game ☹️ Please Try Again
        </p>
        <CwazyButtons onClick={() => closeModal()} text='Restart ▸' />
      </div>
    </div>}
  </ReactCSSTransitionGroup>

export const PrizeModal = ({isShown, closeModal, prize}) =>
  <ReactCSSTransitionGroup className='transition' transitionName='modal' transitionEnterTimeout={1500} transitionLeaveTimeout={1500} key='Modal1'>
    {isShown && <div className='overlay' onClick={() => closeModal()}>
      <div className='above-all' onClick={e => e.stopPropagation()}>
        <p className='modal-text'>
          🎉 Congratulations you won
        </p>
        <img src={imageDispatcher[prize]} />
        <p>{prize}</p>
        <CwazyButtons onClick={() => closeModal()} text='Continue ▸' />
      </div>
    </div>}
  </ReactCSSTransitionGroup>

export const WinAllModal = ({isShown, closeModal, prize}) =>
  <ReactCSSTransitionGroup className='transition' transitionName='modal' transitionEnterTimeout={1500} transitionLeaveTimeout={1500} key='Modal1'>
    {isShown && <div className='overlay' onClick={() => closeModal()}>
      <div className='above-all' onClick={e => e.stopPropagation()}>
        <p className='modal-text'>
          🎉 Congratulations you won The Game and We ran out of Prizes
        </p>
        <CwazyButtons onClick={() => closeModal()} text='Restart ▸' />
      </div>
    </div>}
  </ReactCSSTransitionGroup>
