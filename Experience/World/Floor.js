import Experience from "../Experience.js"
import * as THREE from "three"
import GSAP from 'gsap';

export default class Floor {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.setFloor();
        this.setCircles();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: "#6E85B7",
            side: THREE.BackSide
        })

        this.plane = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = -0.5;
        this.plane.receiveShadow = true;
    }

    setCircles() {
        const geometry = new THREE.CircleGeometry(5, 64);
        const material = new THREE.MeshStandardMaterial({ color: 0xB2C8DF });
        const material2 = new THREE.MeshStandardMaterial({ color: 0xe5a1aa });
        const material3 = new THREE.MeshStandardMaterial({ color: 0xBFA2DB });
        const material4 = new THREE.MeshStandardMaterial({ color: 0x7AD0AC });
        this.circleFirst = new THREE.Mesh(geometry, material);
        this.circleSecond = new THREE.Mesh(geometry, material2);
        this.circleThird = new THREE.Mesh(geometry, material3);
        this.circleFourth = new THREE.Mesh(geometry, material4);

        this.circleFirst.position.y = -0.29;
        this.circleSecond.position.y = -0.28;
        this.circleSecond.position.x = 2;
        this.circleThird.position.y = -0.27;
        this.circleFourth.position.y = -0.26;

        this.circleFirst.scale.set(0,0,0); 
        this.circleSecond.scale.set(0,0,0);
        this.circleThird.scale.set(0,0,0);
        this.circleFourth.scale.set(0,0,0);
        this.circleFirst.rotation.x = this.circleSecond.rotation.x = this.circleThird.rotation.x = this.circleFourth.rotation.x = -Math.PI / 2;
        this.circleFirst.receiveShadow = this.circleSecond.receiveShadow = this.circleThird.receiveShadow = this.circleFourth.receiveShadow = true;

        this.scene.add(this.circleFirst);
        this.scene.add(this.circleSecond);
        this.scene.add(this.circleThird);
        this.scene.add(this.circleFourth);
    }

    resize() {

    }
    update() {

    }
}