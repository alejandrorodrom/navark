import SplashScene from './SplashScene'
import './LoadingScreen.scss'

export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="splash-canvas">
        <SplashScene/>
      </div>
    </div>
  )
}
