import React, { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import SmokeParticle from "./SmokeParticle";
import * as THREE from "three";

const SmokeEffect = ({ carRef , timer}) => {
  const [particles, setParticles] = useState([]);


  useEffect(() => {
    if (!timer){
    const carPostion = carRef.current.translation();

    const carRotation = new THREE.Quaternion(
      carRef.current.rotation().x,
      carRef.current.rotation().y,
      carRef.current.rotation().z,
      carRef.current.rotation().w
    );
    const particlePos = new THREE.Vector3(
      carPostion.x,
      carPostion.y + 0.15,
      carPostion.z + 1.4
    );

    const heading = getCarHeading(carRef.current.rotation());
    const v = getOrientedVelocity(heading);

    const interval = setInterval(() => {
      setParticles((prev) => [
        ...prev,
        {
          position: particlePos,
          velocity: v,
          lifetime: 1100,
        },
      ]);
    }, 200);

    return () => clearInterval(interval);
  }
  else {setParticles([])}
  }, [carRef?.current?.translation()]);

  return (
    <group>
      {particles.map((particle, index) => (
        <SmokeParticle key={index} {...particle} timer={timer} />
      ))}
    </group>
  );
};

export default SmokeEffect;

function getCarHeading(quaternion) {

  const quat = new THREE.Quaternion(
    quaternion.x,
    quaternion.y,
    quaternion.z,
    quaternion.w
  );

  const euler = new THREE.Euler();
  euler.setFromQuaternion(quat, "YXZ");
  const yawRadians = euler.y;
  const yawDegrees = THREE.MathUtils.radToDeg(yawRadians);

  const directYawRadians = Math.atan2(
    2.0 * (quaternion.w * quaternion.y + quaternion.x * quaternion.z),
    1.0 - 2.0 * (quaternion.y * quaternion.y + quaternion.x * quaternion.x)
  );
  const directYawDegrees = THREE.MathUtils.radToDeg(directYawRadians);

  return {
    radians: directYawRadians,
    degrees: directYawDegrees,
  };
}

function getOrientedVelocity(heading, magnitude = 0.01) {
  return new THREE.Vector3(
    magnitude * Math.cos(heading.radians),
    0,
    magnitude * Math.sin(heading.radians)
  );
}
