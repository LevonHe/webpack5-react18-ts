import React, { lazy, Suspense, useState } from 'react'
import bigImg from './assets/imgs/big.jpg'
import smallImg from './assets/imgs/cover.svg'
import { Demo1, Demo2 } from './components'
// import './app.css'
import './app.less'

const LazyDemo = lazy(() => import('./components/LazyDemo'))

const PreFetchDemo = lazy(() => import(
  /* webpackChunkName: "PreFetchDemo" */
  /* webpackPrefetch: true */
  './components/PreFetchDemo'
))
const PreloadDemo = lazy(() => import(
  /* webpackChunkName: "PreloadDemo" */
  /* webpackPreload: true */
  './components/PreloadDemo'
))


function App() {
  const [count, setCount] = useState('')
  const [show, setShow] = useState(false)
  const onChange = (e: any) => {
    setCount(e.target.value)
  }
  const onClick = () => {
    import('./app.css')
    setShow(true)
  }
  return <>
    <h2>webpack5+react-ts</h2>
    <button onClick={onClick}>Show</button>
    {show && <Suspense fallback={null}><LazyDemo /></Suspense>}
    {show && (<>
      <Suspense fallback={null}><PreloadDemo /></Suspense>
      <Suspense fallback={null}><PreFetchDemo /></Suspense>
    </>)}
    <br></br>
    <p>受控组件</p>
    <input type="text" value={count} onChange={onChange}></input>
    <p>非受控组件</p>
    <input type="text" />
    <br></br>
    <img className='b' src={bigImg} alt="大于10kb的图片"></img>
    <img className='s' src={smallImg} alt="小于10kb的图片"></img>
    <div className='bigImg'></div>
    <div className='smallImg'></div>
    <br></br>
    <Demo1 />
  </>
}

export default App