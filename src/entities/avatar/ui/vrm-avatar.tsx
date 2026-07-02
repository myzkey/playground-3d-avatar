import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import { MathUtils, Vector3 } from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  VRMHumanBoneName,
  VRMLoaderPlugin,
  VRMUtils,
  type VRM,
} from '@pixiv/three-vrm';
import { AVATAR_MODEL_URL } from '../../../shared/config/avatar';
import type { AvatarAnimation, AvatarExpression } from '../model/avatar-types';
import { applyAvatarExpression } from '../lib/expression';
import { getHumanBoneNode, resetPose } from '../lib/bones';

type VrmGltf = GLTF & {
  userData: GLTF['userData'] & {
    vrm?: VRM;
  };
};

type VrmAvatarProps = {
  expression: AvatarExpression;
  animation: AvatarAnimation;
  resetToken: number;
};

export const VrmAvatar = ({ expression, animation, resetToken }: VrmAvatarProps) => {
  const gltf = useLoader(
    GLTFLoader,
    AVATAR_MODEL_URL,
    (loader) => {
      loader.register((parser) => new VRMLoaderPlugin(parser));
    },
  ) as VrmGltf;

  const vrm = gltf.userData.vrm;
  const { pointer } = useThree();
  const lookTarget = useMemo(() => new Vector3(), []);
  const sceneRef = useRef(vrm?.scene);

  useEffect(() => {
    if (!vrm) {
      return;
    }

    VRMUtils.rotateVRM0(vrm);
    sceneRef.current = vrm.scene;
    vrm.scene.rotation.y = Math.PI;
    vrm.scene.position.set(0, -1.08, 0);
    vrm.scene.scale.setScalar(0.88);
    vrm.scene.traverse((object) => {
      object.frustumCulled = false;
    });
  }, [vrm]);

  useEffect(() => {
    applyAvatarExpression(vrm?.expressionManager, expression);
  }, [expression, vrm]);

  useEffect(() => {
    if (!vrm) {
      return;
    }

    resetPose(vrm);
    applyAvatarExpression(vrm.expressionManager, 'neutral');
  }, [resetToken, vrm]);

  useFrame((_, delta) => {
    if (!vrm) {
      return;
    }

    const time = performance.now() / 1000;
    const leftUpperArm = getHumanBoneNode(vrm, VRMHumanBoneName.LeftUpperArm);
    const leftLowerArm = getHumanBoneNode(vrm, VRMHumanBoneName.LeftLowerArm);
    const rightUpperArm = getHumanBoneNode(vrm, VRMHumanBoneName.RightUpperArm);
    const rightLowerArm = getHumanBoneNode(vrm, VRMHumanBoneName.RightLowerArm);
    const neck = getHumanBoneNode(vrm, VRMHumanBoneName.Neck);
    const head = getHumanBoneNode(vrm, VRMHumanBoneName.Head);

    if (animation === 'wave') {
      leftUpperArm?.rotation.set(
        MathUtils.degToRad(-60),
        MathUtils.degToRad(0),
        MathUtils.degToRad(68 + Math.sin(time * 6) * 12),
      );
      leftLowerArm?.rotation.set(
        MathUtils.degToRad(-22),
        MathUtils.degToRad(0),
        MathUtils.degToRad(18 + Math.sin(time * 6) * 18),
      );
      rightUpperArm?.rotation.set(0, 0, MathUtils.degToRad(68));
      rightLowerArm?.rotation.set(0, 0, MathUtils.degToRad(10));
    } else {
      leftUpperArm?.rotation.set(0, 0, 0);
      leftLowerArm?.rotation.set(0, 0, 0);
      rightUpperArm?.rotation.set(0, 0, 0);
      rightLowerArm?.rotation.set(0, 0, 0);
    }

    if (head) {
      head.rotation.y = MathUtils.lerp(head.rotation.y, pointer.x * 0.32, 0.08);
      head.rotation.x = MathUtils.lerp(head.rotation.x, -pointer.y * 0.18, 0.08);
    }

    if (neck) {
      neck.rotation.y = MathUtils.lerp(neck.rotation.y, pointer.x * 0.12, 0.06);
      neck.rotation.x = MathUtils.lerp(neck.rotation.x, -pointer.y * 0.08, 0.06);
    }

    lookTarget.set(pointer.x * 0.7, 1.35 + pointer.y * 0.35, -1.6);
    vrm.lookAt?.lookAt(lookTarget);
    vrm.update(delta);
  });

  if (!sceneRef.current) {
    return null;
  }

  return <primitive object={sceneRef.current} />;
};
