import Experience from "../Experience.js"
import * as THREE from "three"

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.setPath();

    }
    setPath() {
        //Create a closed wavey loop
        this.curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-10, 0, 10),
            new THREE.Vector3(-5, 5, 5),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(5, -5, 5),
            new THREE.Vector3(10, 0, 10)
        ], true);

        this.dummyCurve = new THREE.Vector3(0,0,0)
        this.curve.getPoint(1, this.dummyCurve)
        this.camera.orthographicCamera.position.copy(this.dummyCurve)


        const points = this.curve.getPoints(50);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

        // Create the final object to add to the scene
        const curveObject = new THREE.Line(geometry, material);

        this.scene.add(curveObject);
    }

    resize() {

    }
    update() {
    }
}