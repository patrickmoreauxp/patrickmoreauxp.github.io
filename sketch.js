function setup() {
  canvas = createCanvas(1200, 800);
  canvas.position(0, 0);
}

async function runPoseDetection() {
  const videoElement = document.getElementById("video");
  videoElement.width = 1200;
  videoElement.height = 800;
  const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
  const mediaStream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
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
    let poses = await detector.estimatePoses(videoElement, { flipHorizontal: true });
    clear();
    if (poses.length) {
      let canvasScaleFactorX = width / videoElement.videoWidth;
      let canvasScaleFactorY = height / videoElement.videoHeight;
      for (let i = 0; i < poses.length; i++) {
        let pose = poses[i];
        for (let j = 0; j < pose.keypoints.length; j++) {
          let keypoint = pose.keypoints[j];
          if (keypoint.score >= 0.2) {
            fill(255, 0, 0);
            noStroke();
            // Adjust the position of the keypoint based on the video element's offset and the canvas scale factor
            let adjustedX = (keypoint.x - videoElement.offsetLeft) * canvasScaleFactorX;
            let adjustedY = (keypoint.y - videoElement.offsetTop) * canvasScaleFactorY;
            circle(adjustedX, adjustedY, 10);
          }
        }
      }
    }
    requestAnimationFrame(detectPoseInRealTime);
  }
  detectPoseInRealTime();
}

runPoseDetection();


