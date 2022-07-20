import Experience from "../Experience.js"
import * as THREE from "three"

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        //NOTE FOR ANIMATION SETUP
        // this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.setModel();
        //NOTE FOR ANIMATION SETUP
        // this.setAnimation();

    }
    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                })
            }

            if (child.name === "screen_1") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen1,
                });

            }
            if (child.name === "screen_2") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen2,
                });

            }
        })
        this.scene.add(this.actualRoom);
    }
    //NOTE FOR ANIMATION SETUP
    // setAnimation() {
    //     this.mixer = new THREE.AnimationMixer(this.actualRoom);
    //     this.swim = this.mixer.clipAction(this.room.setAnimations[0]);
    //     this.swim.play();
    // }

    resize() {

    }
    update() {
        //NOTE FOR ANIMATION SETUP
        // this.mixer.update(this.time.delta * 0.0009);
    }
}