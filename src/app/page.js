'use client'
import ThreeScene from './components/ThreeScene';
import Gyroscope from './components/gyro'

export default function Home() {
  const { motionData,isGyroscopeAvailable, } = Gyroscope();
  return (
    <div> 
      <ThreeScene></ThreeScene>
      <div className='gyro_data'>
        {isGyroscopeAvailable ? (
            <div>
                <p>Alpha: {motionData.alpha}</p>
                <p>Beta: {motionData.beta}</p>
                <p>Gamma: {motionData.gamma}</p>
            </div>
        ) : (
            <p>El giroscopio no está disponible en este dispositivo.</p>
        )}
      </div>   
    </div>
  );
}
