export const createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    // 1. Create the main pencil body (Cylinder)
    var pencilBody = BABYLON.MeshBuilder.CreateCylinder("pencilBody", {
        diameter: 0.5,   // Thickness of the pencil
        height: 3.0      // Length of the main body
    }, scene);
    pencilBody.position.y = 1.5; // Move up by half its height so it sits on the ground

    // 2. Create the pencil tip (Cone)
    var pencilTip = BABYLON.MeshBuilder.CreateCylinder("pencilTip", {
        diameterTop: 0,
        diameterBottom: 0.5, // Must match the pencil body diameter
        height: 0.6          // Length of the sharpened tip
    }, scene);
    
    // Position the tip exactly on top of the body:
    pencilTip.position.y = 1.5 + 1.5 + 0.3; 

    // Our built-in 'ground' shape.
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    return scene;
};
