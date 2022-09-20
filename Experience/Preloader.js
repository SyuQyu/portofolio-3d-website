import { EventEmitter } from "events";
import Experience from "./Experience.js"
import GSAP from 'gsap';
import convert from "./Utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        })
    }

    setAssets() {
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren, "data room child")
    }
    firstIntro() {
        return new Promise((resolve, reject) => {
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", { y: 0, yPercent: 100 });
            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document.querySelector(".preloader").classList.add("hidden");
                }
            })
            if (this.device === "desktop") {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    ease: "back.out(2.5)",
                    duration: .7
                }).to(this.room.position, {
                    x: -3.5,
                    ease: "power1.out",
                    duration: .7,
                })
            } else {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.2,
                    y: 1.2,
                    z: 1.2,
                    ease: "back.out(2.5)",
                    duration: .7
                }).to(this.room.position, {
                    z: -3.5,
                    ease: "power1.out",
                    duration: .7,
                })
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.2)",
            }).to(".arrow-svg-wrapper", {
                opacity: 1,
            }, "samearrow").to(".toggle-bar", {
                opacity: 1,
                onComplete: resolve
            }, "samearrow")
        })
    }

    secondIntro() {
        return new Promise((resolve, reject) => {
            this.secondTimeline = new GSAP.timeline();
            console.log(this.room);
            this.secondTimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(1.7)",
            }, "fadeout").to(".arrow-svg-wrapper", {
                opacity: 0,
            }, "fadeout")
                .to(this.room.position, {
                    x: 0,
                    y: 0,
                    z: 0,
                    ease: "power1.out",
                }, "same").to(this.roomChildren.cube.rotation, {
                    y: 2 * Math.PI + Math.PI / 20
                }, "same").to(this.roomChildren.cube.scale, {
                    x: 6,
                    y: 6,
                    z: 6,
                }, "same").to(this.camera.orthographicCamera.position, {
                    y: 3
                }, "same").to(this.roomChildren.cube.position, {
                    x: -0.055508,
                    y: 1.79352,
                    z: -0.042768
                }, "same").set(this.roomChildren.body.scale, {
                    x: 1,
                    y: 1,
                    z: 1
                }).to(this.roomChildren.cube.scale, {
                    x: 0,
                    y: 0,
                    z: 0
                }, "sametime").to(".hero-main-title .animatedis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "sametime").to(".hero-main-description .animatedis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "sametime").to(".first-sub .animatedis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "sametime").to(".second-sub .animatedis", {
                    yPercent: 0,
                    stagger: 0.07,
                    ease: "back.out(1.7)",
                }, "sametime").to(this.roomChildren.bed.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.bed_body.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.carpet.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.clock.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.table_pc_and_floor.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.floor_table_item.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.keyboard.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.monster_truck_blue.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.painting.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.pc.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.shelf.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.storage_under_table.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.succulent_plant.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.wardrobe.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }).to(this.roomChildren.pc_chair.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    ease: "back.out(2.2)",
                    duration: 0.5,
                }, "chairSame").to(this.roomChildren.pc_chair.rotation, {
                    y: 4 * Math.PI + Math.PI / 9,
                    ease: "power2.out",
                    duration: 1,
                }).to(".arrow-svg-wrapper", {
                    opacity: 1,
                    onComplete: resolve
                }).set(this.roomChildren.mini_floor.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                }, "chairSame")

        })

    }

    onScroll(e) {
        if (e.deltaY > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initialY - currentY;
        if (difference > 0) {
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.initialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }

    async playIntro() {
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondIntro() {
        this.moveFlag = false;
        this.scaleFlag = true;
        await this.secondIntro();
        this.scaleFlag = false;
        this.emit("enablecontrols");
    }

    move() {
        if (this.device === "desktop") {
            this.room.position.set(-1, 0, 0);
        } else {
            this.room.position.set(0, 0, -1);
        }
    }

    scale() {
        if (this.device === "desktop") {
            this.room.scale.set(.11, .11, .11);
        } else {
            this.room.scale.set(.07, .07, .07);
        }
    }

    update() {
        // if(this.moveFlag) {
        //     this.move();
        // }
        // if(this.scaleFlag) {
        //     this.scale();
        // }
    }
}
