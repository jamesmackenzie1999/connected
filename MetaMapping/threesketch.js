var positions =[]
var spheres = []

function threeScene() {
    const renderer = new THREE.WebGLRenderer();
    const threeContainer = document.createElement("div");
    document.body.prepend(threeContainer);
    
    threeContainer.setAttribute("id","threeContainer")
    threeContainer.style.right="0"
    threeContainer.style.top="0px"
    threeContainer.style.width="100%"
    threeContainer.style.position="fixed"
    threeContainer.style.height="100vh"
    threeContainer.style.zIndex="1"

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize((threeContainer.offsetWidth), threeContainer.offsetHeight);
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); 
    const camera = new THREE.PerspectiveCamera( 75, threeContainer.offsetWidth / threeContainer.offsetHeight, 0.1, 1000 );
    camera.position.z = 2;
    camera.up.set(0, -1, 0);
    const controls = new THREE.OrbitControls( camera, renderer.domElement );

    // for(var i=0; i<window.Landmarks.length; i++){
    //      const sphere = new Sphere(window.Landmarks[i]);
    //     positions.push(sphere)
    // }

    const geometry = new THREE.SphereGeometry();
   const material = new THREE.MeshBasicMaterial( { color: 0xD23368 } );
   const material2 = new THREE.MeshBasicMaterial( { color: 0xff0000 } );

    
    const group = new THREE.Group()
    group.name = 'group'

    for (var i=0; i<window.Landmarks.length; i++){
        const sphere = new THREE.Mesh(geometry, material)
        sphere.scale.x =0.002
        sphere.scale.y =0.002
        sphere.scale.z =0.002
        group.add(sphere)
    }
    scene.add(group)

    const face2 = new THREE.Group()
    face2.name = 'face2'

    for (var i=0; i<420; i++){
        const sphere = new THREE.Mesh(geometry, material2)
        sphere.scale.x =0.002
        sphere.scale.y =0.002
        sphere.scale.z =0.002
        face2.add(sphere)
    }
    face2.position.x=-1
    face2.position.z=1
    scene.add(face2)


    const light = new THREE.PointLight( 0xffffff, 1, 1000 );
    light.position.set(0,0,0)
    scene.add( light );
    
    const ambientLight = new THREE.AmbientLight( 0xaaaaaa); // soft white light
    scene.add( ambientLight );
    
    threeContainer.appendChild( renderer.domElement );
    
    window.addEventListener('resize', function()
    {
        console.log('moved')
        var width = threeContainer.offsetWidth;
        var height = threeContainer.offsetHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    
    controls.enableZoom = true;
    controls.autoRotate = false;

    controls.update();
    animate(renderer, scene, camera, controls);
}


function animate(renderer, scene, camera, controls) {

    // var group = scene.getObjectByName( 'group' )
    // for (var i=0; i<window.Landmarks.length; i++){
    //     // console.log(window.Landmarks[i].x)
    //     group.children[i].position.x = window.Landmarks[i].x
    //     group.children[i].position.y = window.Landmarks[i].y
    //     group.children[i].position.z = window.Landmarks[i].z
    // }
    // console.log(secondFace)
    if(secondFace==='true'){
        var face2 = scene.getObjectByName( 'face2' )
        console.log(face2)
        for (var i=0; i<400; i++){
            console.log(faces)
            face2.children[i].position.x = faces[i].x
            face2.children[i].position.y = faces[i].y
            face2.children[i].position.z = faces[i].z
        }
    }

    controls.update();
    renderer.render( scene, camera );
    requestAnimationFrame( function() {
        animate(renderer, scene, camera, controls)
    } );
}
    
