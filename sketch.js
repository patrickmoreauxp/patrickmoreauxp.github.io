function setup() {
  createCanvas(videoElement.width, videoElement.height);
}

async function runPoseDetection() {
  const videoElement = document.getElementById("video");
  videoElement.width = 720;
  videoElement.height = 560;
  const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      // height: 560,
      // width: 720,
      facingMode: 'environment',
    }
  });
  videoElement.srcObject = mediaStream;
  const videoPromise = new Promise((resolve, reject) => {
    videoElement.onloadedmetadata = () => resolve(videoElement);
  });
  const video = await videoPromise;
  video.play();

  async function detectPoseInRealTime() {
    let poses = await detector.estimatePoses(videoElement, { flipHorizontal: false });
    clear();
    if (poses.length) {
      for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        for (let j = 0; j < pose.keypoints.length; j++) {
          let keypoint = pose.keypoints[j];
          if (keypoint.score >= 0.2) {
            fill(255, 0, 0);
            noStroke();
            circle(keypoint.x, keypoint.y, 10);
          }
        }
      }
    }
    requestAnimationFrame(detectPoseInRealTime);
  }
  detectPoseInRealTime();
}

runPoseDetection();