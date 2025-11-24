import * as THREE from 'three'

export const loadingManager = new THREE.LoadingManager()

// Scene ready signaling: some resources are tracked by Three's LoadingManager,
// but the app may need to wait until the WebGL scene actually rendered its
// first frame. Export a small API to mark & subscribe to scene-ready.
let _sceneReady = false
const _sceneReadyListeners: Array<() => void> = []

export function markSceneReady() {
	if (_sceneReady) return
	_sceneReady = true
	for (const cb of _sceneReadyListeners) cb()
}

export function onSceneReady(cb: () => void) {
	_sceneReadyListeners.push(cb)
	return () => {
		const idx = _sceneReadyListeners.indexOf(cb)
		if (idx >= 0) _sceneReadyListeners.splice(idx, 1)
	}
}

export function isSceneReady() {
	return _sceneReady
}

export default loadingManager
