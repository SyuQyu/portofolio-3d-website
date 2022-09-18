import Experience from "../Experience.js"
import * as THREE from "three"
import GSAP from 'gsap';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        //NOTE FOR ANIMATION SETUP
        // this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

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
            // console.log(child);
            if (child.name === "pc") {
                child.children[2].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen1,
                });
                child.children[3].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen2,
                });
            }
            if (child.name === "mini_floor") {
                console.log(child.position, "child mini floor")
                child.position.x = -0.442098;
                child.position.z = 2.14666;
            }

            // if (child.name === "mailbox" || child.name === "plant_floor" ||
            //     child.name === "floor_1" || child.name === "floor_2" ||
            //     child.name === "floor_3" || child.name === "plant" ||
            //     child.name === "lamp") {
            //     child.scale.set(0, 0, 0)
            // }
            if (child.name === "painting") {
                if (child.children[1].material.name === "picture 1") {
                    child.children[1].material = new THREE.MeshBasicMaterial({
                        map: this.resources.items.painting1,
                    });
                }
                if (child.children[5].material.name === "picture 2") {
                    child.children[5].material = new THREE.MeshBasicMaterial({
                        map: this.resources.items.painting2,
                    });
                }
                if (child.children[3].material.name === "picture 3") {
                    child.children[3].material = new THREE.MeshBasicMaterial({
                        map: this.resources.items.painting3,
                    });
                }
            }
            // if (child.name === "screen_2") {
            //     child.material = new THREE.MeshBasicMaterial({
            //         map: this.resources.items.screen2,
            //     });

            // }
            child.scale.set(0, 0, 0)
            if(child.name === "Cube") {
                // child.scale.set(0.5, 0.5, 0.5);
                child.position.set(0, 0, -1.5);
                child.rotation.y = Math.PI / 4;
            }
            this.roomChildren[child.name.toLowerCase()] = child;
        })
        const width = .8;
        const height = .7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
        rectLight.position.set(-0.13189, 1.5, -3.01897);
        rectLight.rotation.x = -Math.PI / 1.2;
        this.actualRoom.add(rectLight)

        this.roomChildren["rectLight"] = rectLight;
        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);

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