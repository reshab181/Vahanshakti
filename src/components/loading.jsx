
import './loading.css'

export const LoadingWidget = () => {

  return (
    <>
      <div id='loading_container' style={{ position: 'absolute', top: '0', left: '0', display: 'flex', flexDirection: 'column', gap: '7px', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backdropFilter: 'brightness(0.9)' }}>
        <div className='loader_wrapper'>
          <div className='border_loader'></div>
        </div>
        <i>Loading...</i>
      </div>
    </>
  )
}


