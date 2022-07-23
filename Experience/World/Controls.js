import Experience from "../Experience.js"
import * as THREE from "three"

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;



    }


    resize() {

    }
    update() {

    }
}