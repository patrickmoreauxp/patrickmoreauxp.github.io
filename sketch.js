let detector;
let poses;
let video;

function setup() {
createCanvas(windowWidth, windowHeight);
video = createCapture({video:{facingMode:"environment"}});
video.size(windowWidth, windowHeight);
video.hide();
// createButton('pose').mousePressed(getPoses);
}

const detectorConfig = {
modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
};
detector = await poseDetection.createDetector(
poseDetection.SupportedModels.PoseNet,
detectorConfig
);
getPoses();

function getPoses() {
poses =detector.estimatePoses(video.elt);
setTimeout(getPoses, 0);
}

function draw() {
background(220);
image(video, 0, 0);
if (poses && poses.length > 0) {
for (let kp of poses[0].keypoints) {
const { x, y, score } = kp;
if (score > 0.5) {
fill(255);
stroke(0);
strokeWeight(4);
circle(x, y, 16);
}
}
}
}