import { VRMHumanBoneName, type VRM } from '@pixiv/three-vrm';
import type { Object3D } from 'three';

export const getHumanBoneNode = (vrm: VRM, boneName: VRMHumanBoneName): Object3D | undefined =>
  vrm.humanoid?.getNormalizedBoneNode(boneName) ?? undefined;

export const resetPose = (vrm: VRM) => {
  vrm.humanoid?.resetNormalizedPose();
};
