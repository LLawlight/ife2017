window.onload = function() {
  var renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  renderer.setSize(960, 540);
  document.getElementsByTagName('body')[0].appendChild(renderer.domElement);
  renderer.setClearColor('rgb(102, 102, 102)');

  var scene = new THREE.Scene();

  var camera = new THREE.OrthographicCamera(-2, 2, 1.5, -1.5, 1, 100);
  camera.position.set(-4, 3, 8);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);

  var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 2),
    new THREE.MeshLambertMaterial({
      color: 0xffffff
    })
  );
  scene.add(cube);

  var torus = new THREE.TorusGeometry(0.2, 0.06, 12, 18);
  var torusMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    specular: 0x00ff00,
    shininess: 1000
  });

  var wheel1 = new THREE.Mesh(torus, torusMaterial);
  wheel1.rotation.y = Math.PI / 2;
  wheel1.position.set(0.5, -0.5, 0.6);

  var wheel2 = new THREE.Mesh(torus, torusMaterial);
  wheel2.rotation.y = Math.PI / 2;
  wheel2.position.set(-0.5, -0.5, 0.6);

  var wheel3 = new THREE.Mesh(torus, torusMaterial);
  wheel3.rotation.y = Math.PI / 2;
  wheel3.position.set(-0.5, -0.5, -0.6);

  var wheel4 = new THREE.Mesh(torus, torusMaterial);
  wheel4.rotation.y = Math.PI / 2;
  wheel4.position.set(0.5, -0.5, -0.6);

  scene.add(wheel1, wheel2, wheel3, wheel4);

  var ambientLight = new THREE.AmbientLight(0x666666, 1.2);   // 添加环境光
  scene.add(ambientLight);

  var light = new THREE.DirectionalLight(0xffffff, 0.6);
  light.position.set(-3, 5, 4);
  scene.add(light);

  renderer.render(scene, camera)
}
