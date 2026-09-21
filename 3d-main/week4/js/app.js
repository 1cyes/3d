// =====================================================
// 3D WORKSPACE - PENCIL
// =====================================================

const canvas = document.getElementById("renderCanvas");

const engine = new BABYLON.Engine(
    canvas,
    true,
    {
        preserveDrawingBuffer: true,
        stencil: true
    }
);


// =====================================================
// SCENE
// =====================================================

const scene = new BABYLON.Scene(engine);

scene.clearColor = new BABYLON.Color4(
    0.008,
    0.012,
    0.022,
    1
);


// =====================================================
// CAMERA
// =====================================================

const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 3,
    Math.PI / 2.8,
    13,
    new BABYLON.Vector3(0, 1, 0),
    scene
);

camera.attachControl(canvas, true);

camera.lowerRadiusLimit = 6;
camera.upperRadiusLimit = 30;

camera.wheelDeltaPercentage = 0.01;


// =====================================================
// LIGHTING
// =====================================================

const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(0, 1, 0),
    scene
);

light.intensity = 0.9;


const pointLight = new BABYLON.PointLight(
    "pointLight",
    new BABYLON.Vector3(4, 8, -5),
    scene
);

pointLight.intensity = 1.2;


// =====================================================
// MATERIAL HELPER
// =====================================================

function material(name, hex, metallic = 0, roughness = 0.5) {

    const mat = new BABYLON.PBRMaterial(
        name,
        scene
    );

    mat.albedoColor =
        BABYLON.Color3.FromHexString(hex);

    mat.metallic = metallic;
    mat.roughness = roughness;

    return mat;
}


// =====================================================
// MATERIALS
// =====================================================

const yellow =
    material(
        "Pencil Yellow",
        "#F4C400",
        0.05,
        0.3
    );

const wood =
    material(
        "Wood",
        "#D4A15F",
        0,
        0.85
    );

const graphite =
    material(
        "Graphite",
        "#20242A",
        0.7,
        0.25
    );

const metal =
    material(
        "Ferrule",
        "#AEB7C0",
        0.9,
        0.2
    );

const eraserMaterial =
    material(
        "Eraser",
        "#E88995",
        0,
        0.65
    );


// =====================================================
// PENCIL ROOT
// =====================================================

const pencil =
    new BABYLON.TransformNode(
        "Pencil",
        scene
    );


// Small overall size
pencil.scaling =
    new BABYLON.Vector3(
        0.50,
        0.50,
        0.50
    );


// =====================================================
// PENCIL BODY
// =====================================================

const body =
    BABYLON.MeshBuilder.CreateCylinder(
        "PencilBody",
        {
            height: 6.4,
            diameter: 1.05,
            tessellation: 6
        },
        scene
    );

body.parent = pencil;
body.material = yellow;


// =====================================================
// WOOD TIP
// =====================================================

const woodTip =
    BABYLON.MeshBuilder.CreateCylinder(
        "WoodTip",
        {
            height: 1.45,
            diameterTop: 1.02,
            diameterBottom: 0.08,
            tessellation: 6
        },
        scene
    );

woodTip.parent = pencil;

woodTip.position.y = -3.90;

woodTip.material = wood;


// =====================================================
// GRAPHITE TIP
// =====================================================

const graphiteTip =
    BABYLON.MeshBuilder.CreateCylinder(
        "GraphiteTip",
        {
            height: 0.55,
            diameterTop: 0.013,
            diameterBottom: 0.15,
            tessellation: 6
        },
        scene
    );

graphiteTip.parent = pencil;

graphiteTip.position.y = -4.90;

graphiteTip.material = graphite;


// =====================================================
// METAL FERRULE
// =====================================================

const ferrule =
    BABYLON.MeshBuilder.CreateCylinder(
        "Ferrule",
        {
            height: 0.65,
            diameter: 1.08,
            tessellation: 32
        },
        scene
    );

ferrule.parent = pencil;

ferrule.position.y = 3.55;

ferrule.material = metal;


// =====================================================
// FERRULE RINGS
// =====================================================

function createRing(y) {

    const ring =
        BABYLON.MeshBuilder.CreateTorus(
            "FerruleRing",
            {
                diameter: 1.09,
                thickness: 0.07,
                tessellation: 32
            },
            scene
        );

    ring.parent = pencil;

    ring.position.y = y;

    ring.material = metal;
}

createRing(3.30);
createRing(3.78);


// =====================================================
// ERASER
// =====================================================

const eraser =
    BABYLON.MeshBuilder.CreateCylinder(
        "Eraser",
        {
            height: 0.65,
            diameter: 0.95,
            tessellation: 32
        },
        scene
    );

eraser.parent = pencil;

eraser.position.y = 4.20;

eraser.material = eraserMaterial;


// =====================================================
// ERASER ROUND TOP
// =====================================================

const eraserTop =
    BABYLON.MeshBuilder.CreateSphere(
        "EraserTop",
        {
            diameter: 0.95,
            segments: 32,
            slice: 0.5
        },
        scene
    );

eraserTop.parent = pencil;

eraserTop.position.y = 4.52;

eraserTop.scaling.y = 0.35;

eraserTop.material = eraserMaterial;


// =====================================================
// PENCIL ROTATION
// =====================================================

// Lean the pencil slightly
pencil.rotation.z =
    BABYLON.Tools.ToRadians(-20);

pencil.rotation.y =
    BABYLON.Tools.ToRadians(15);


// =====================================================
// FIX PENCIL HEIGHT
// =====================================================

// The graphite tip is approximately -5.175
// before scaling.
//
// Scale = 0.50
//
// -5.175 × 0.50 = -2.5875
//
// Therefore the pencil must be moved up
// approximately 2.59 units so the tip touches
// the ground at Y = 0.

pencil.position.x = 0;

pencil.position.y = 2.62;

pencil.position.z = 0;


// =====================================================
// GROUND
// =====================================================

const ground =
    BABYLON.MeshBuilder.CreateGround(
        "Ground",
        {
            width: 20,
            height: 20,
            subdivisions: 20
        },
        scene
    );

const groundMaterial =
    new BABYLON.PBRMaterial(
        "GroundMaterial",
        scene
    );

groundMaterial.albedoColor =
    new BABYLON.Color3(
        0.025,
        0.045,
        0.075
    );

groundMaterial.metallic = 0.1;

groundMaterial.roughness = 0.75;

ground.material = groundMaterial;


// =====================================================
// GRID
// =====================================================

const lines = [];

const gridSize = 20;

for (
    let i = -gridSize / 2;
    i <= gridSize / 2;
    i++
) {

    // Vertical lines

    lines.push([
        new BABYLON.Vector3(
            i,
            0.012,
            -gridSize / 2
        ),

        new BABYLON.Vector3(
            i,
            0.012,
            gridSize / 2
        )
    ]);


    // Horizontal lines

    lines.push([
        new BABYLON.Vector3(
            -gridSize / 2,
            0.012,
            i
        ),

        new BABYLON.Vector3(
            gridSize / 2,
            0.012,
            i
        )
    ]);
}


const grid =
    BABYLON.MeshBuilder.CreateLineSystem(
        "Grid",
        {
            lines: lines
        },
        scene
    );

grid.color =
    new BABYLON.Color3(
        0.02,
        0.15,
        0.35
    );


// =====================================================
// RESET CAMERA BUTTON
// =====================================================

const resetButton =
    document.getElementById(
        "resetCamera"
    );

if (resetButton) {

    resetButton.addEventListener(
        "click",
        function () {

            camera.alpha = Math.PI / 3;

            camera.beta = Math.PI / 2.8;

            camera.radius = 13;

            camera.target =
                new BABYLON.Vector3(
                    0,
                    1,
                    0
                );
        }
    );
}


// =====================================================
// GRID BUTTON
// =====================================================

const gridButton =
    document.getElementById(
        "toggleGrid"
    );

if (gridButton) {

    gridButton.addEventListener(
        "click",
        function () {

            const visible =
                grid.isEnabled();

            grid.setEnabled(!visible);

            gridButton.textContent =
                visible
                    ? "Grid Off"
                    : "Grid";
        }
    );
}


// =====================================================
// RENDER LOOP
// =====================================================

engine.runRenderLoop(
    function () {

        scene.render();

    }
);


// =====================================================
// RESIZE
// =====================================================

window.addEventListener(
    "resize",
    function () {

        engine.resize();

    }
);