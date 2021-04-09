import React, { useState, useEffect } from 'react';

import Dataset from 'components/Dataset/Dataset';
import AddIcon from 'components/AddIcon/AddIcon';

import './DatasetInputs.scss';

const DatasetInputs = React.forwardRef((props, ref) => {

  useEffect(() => ref.current.lastChild.previousElementSibling.querySelector('textarea').focus())
  
  const [datasets, setDatasets] = useState([`input_${Date.now()}`])  
  
  const addDataset = () => {
    setDatasets([...datasets, `input_${Date.now()}`]);
  }

  function deleteDataset(e) {
    if(datasets.length > 1) {
      setDatasets(datasets.filter(set => set !== e.target.closest(".dataset").dataset.id));
    };
  }

  function handleShortcuts(e) {
    if(e.key === "Enter" && e.ctrlKey) {
      addDataset();
    }
    if(e.key === "Backspace" && e.ctrlKey) {
      deleteDataset(e);
    };
    if(e.key.includes("Arrow") && e.ctrlKey) {
      const current = e.target.closest(".dataset").dataset.id;
      const currentIndex = datasets.findIndex(item => item === current);
      const nextIndex = Math.min(datasets.length -1, currentIndex + 1)
      const prevIndex = Math.max(0, currentIndex -1)
      if(e.key === "ArrowRight") {
        ref.current.querySelector(`[data-id="${datasets[nextIndex]}"] textarea`).focus();
      }
      if(e.key === "ArrowLeft") {
        ref.current.querySelector(`[data-id="${datasets[prevIndex]}"] textarea`).focus();
      }
    }
  };

  return (
    <div>
      <div ref={ref} className="datasets_block" onKeyDown={handleShortcuts}>
        {
          datasets.map(dataset => <Dataset id={dataset} key={dataset} deleteDataset={deleteDataset}/>)
        }
      <div className="add" onClick={addDataset}><AddIcon/></div>
      </div>

      <div className="test">
        <p>{datasets.join(' | ')}</p>
      </div>
    </div>
  )
})

export default DatasetInputs;