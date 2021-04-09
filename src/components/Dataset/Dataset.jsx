import React, { useState } from 'react';
import PropTypes from 'prop-types';

import CloseIcon from 'components/CloseIcon/CloseIcon';

import './Dataset.scss';

function Dataset({id, deleteDataset}) {

  const datasetRef = React.createRef();
  const [title, setTitle] = useState('');
  const [list, setList] = useState([]);
  const minWidth = 160;
  const maxWidth = 500;

  const setWidth = (width) => datasetRef.current.style.setProperty('--resizable-width', `${width}px`);

  const getWidth = () => {
    const pxWidth = getComputedStyle(datasetRef.current).getPropertyValue('--resizable-width');
    return parseInt(pxWidth, 10);
  }

  function startDragging(e) {
    e.preventDefault();
    const startingPaneWidth = getWidth();
    const xOffset = e.pageX;
    const datasetX = e.target.parentElement.offsetLeft;

    const mouseDragHandler = (moveEvent) => {
      moveEvent.preventDefault();
      const primaryButtonPressed = moveEvent.buttons === 1;
      if(!primaryButtonPressed) {
        setWidth(Math.min(Math.max(getWidth(), minWidth), maxWidth));
        document.body.removeEventListener('pointermove', mouseDragHandler);
        return;
      }

      if(moveEvent.pageX > datasetX) {
        setWidth((moveEvent.pageX - xOffset) + startingPaneWidth);
      }
    }

    document.body.addEventListener('pointermove', mouseDragHandler);
  }

  const onTitleInput = (e) => {
    if(e.key === "Enter") {
      e.preventDefault();
      e.target.parentElement.querySelector('textarea').focus();
    }
    setTitle(e.target.value);
  }

  const onListInput = (e) => {
    if(!e.target.value) {
      setList([]);
      return;
    }
    setList(e.target.value.split('\n'));  
  }

  // const onDeleteDataset = () => {
  //   clearDataset();
  //   deleteDataset(id);
  // }

  const clearDataset = () => {
    setTitle('');
    setList([]);
    datasetRef.current.style.setProperty('--resizable-width', `${minWidth}px`)
  }

  return (
    <div ref={datasetRef} className="dataset" data-id={id}>
      <div className="handle" onMouseDown={startDragging}><div/></div>
      <CloseIcon className="close-icon" onClick={deleteDataset}/>
      <input 
        type="text" 
        className="dataset-title"
        placeholder="title" 
        size="1"
        onInput={onTitleInput}
        onKeyDown={onTitleInput}
        value={title}
      />
      <textarea 
        className="dataset-content"
        placeholder="list"
        onInput={onListInput}
        value={list.join('\n')}
      />
      <div className="dataset-controls">
        <button onClick={clearDataset}>LOAD</button>
        <button
          className={`${(!title && !list.length) ? 'empty' : ''}`} 
          onClick={clearDataset}
        >SAVE</button>
      </div>
      <p className="dataset-total">{list.filter(el => !!el === true).length}</p>
    </div>

  )
};

Dataset.propTypes = {
  id: PropTypes.string.isRequired,
  deleteDataset: PropTypes.func.isRequired,
}

export default Dataset;