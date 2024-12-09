'use client'
import ThreeScene from './components/ThreeScene';
import Gyroscope from './components/gyro'
import Container from './components/Container';

export default function Home() {
  const { motionData,isGyroscopeAvailable, } = Gyroscope();
  return (
    <div> 
      <ThreeScene></ThreeScene>
    </div>
  );
}
