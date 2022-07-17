import Experience from "./Experience.js"
import * as THREE from "three"

export default class Renderer {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
    }

    update() {
        
    }
}