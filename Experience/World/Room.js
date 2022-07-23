import Experience from "../Experience.js"
import * as THREE from "three"
import GSAP from 'gsap';

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        //NOTE FOR ANIMATION SETUP
        // this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        };

        this.setModel();
        //NOTE FOR ANIMATION SETUP
        // this.setAnimation();
        this.onMouseMove();

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

    onMouseMove() {
        window.addEventListener("mousemove", (e => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        }))
    }

    resize() {

    }
    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;
        //NOTE FOR ANIMATION SETUP
        // this.mixer.update(this.time.delta * 0.0009);
    }
}