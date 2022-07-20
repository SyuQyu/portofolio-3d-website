import * as THREE from "three"

import Sizes from "./Utils/Sizes.js"
import Time from "./Utils/Time.js"
import Resources from "./Utils/Resources.js"
import assets from "./Utils/assets.js"

import Camera from "./Camera.js"
import Renderer from "./Renderer.js"

import World from "./World/World.js"

export default class Experience {
    static instance
    constructor(canvas) {
        if(Experience.instance){
            return Experience.instance
        }
        Experience.instance = this
        this.canvas = canvas
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.world = new World();
        
        this.time.on("update", () => {
            this.update();
        })
        this.sizes.on("resize", () => {
            this.resize();
        })
    }

    resize(){
        this.camera.resize();
        
        //NOTE FOR ANIMATION SETUP
        // this.world.resize();

        this.renderer.resize();
    }

    update(){
        this.camera.update();

        //NOTE FOR ANIMATION SETUP
        // this.world.update();

        this.renderer.update();
    }
}