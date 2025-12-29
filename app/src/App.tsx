import { useState } from 'react'
import VinDecoder from './VinDecoder'
import VinEncoder from './VinEncoder'
import './App.css'

function App() {
  const [tab, setTab] = useState(0)

  return (
    <>
      <div className="retro-banner"><div className="retro-marquee">Welcome to 1971-76 Corris Rivett VIN Decoder</div></div>
      <div className="tab-header">
        <button className={tab === 0 ? "active" : ""} onClick={() => setTab(0)}>VIN Decoder</button>
        <button className={tab === 1 ? "active" : ""} onClick={() => setTab(1)}>VIN Encoder</button>
      </div>
      <div className="tab-content">
        {tab === 0 && <VinDecoder />}
        {tab === 1 && <VinEncoder />}
      </div>
      <div className="retro-footer">1971-76 Corris Rivett VIN Decoder by BrennFuchS</div>
    </>
  )
}

export default App
