import Experience from "../Experience.js"
import * as THREE from "three"
import GSAP from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll'

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        });
        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;
        this.circleFourth = this.experience.world.floor.circleFourth;
        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        this.setSmoothScroll();
        this.setScrollTrigger();

    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.3,
            disableRaf: true
        });


        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });


        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            },
            fixedMarkers: true
        });


        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            });

        });
        return asscroll;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    }
    setScrollTrigger() {
        ScrollTrigger.matchMedia({

            // Desktop
            "(min-width: 969px)": () => {
                console.log("pc")
                //NOTE Reset -----------------------------------------------
                this.room.scale.set(1, 1, 1);
                this.rectLight.width = 0.8;
                this.rectLight.width = 0.7;
                //NOTE First Section ---------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                })
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0027;
                    },
                })

                //NOTE Second Section ---------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.position, {
                    x: () => {
                        return 2;
                    },
                    z: () => {
                        return this.sizes.height * 0.0032;
                    },
                },
                    "same").to(this.room.scale, {
                        x: 3,
                        y: 3,
                        z: 3
                    },
                        "same").to(this.rectLight, {
                            width: 0.8 * 10,
                            height: 0.7 * 10
                        },
                            "same")

                //NOTE Third Section ---------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.camera.orthographicCamera.position, {
                    y: 11,
                    x: 0.8
                })

                //NOTE Fourth Section ---------------------------------------
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.camera.orthographicCamera.position, {
                    y: -4,
                    x: 2.5
                })

            },
            // mobile
            "(max-width: 968px)": () => {
                console.log("hp")
                //NOTE Reset -----------------------------------------------
                this.room.scale.set(0.6, 0.6, 0.6);
                this.room.position.set(0, 0, 0);
                this.rectLight.width = 0.5;
                this.rectLight.width = 0.4;
                //NOTE First Section ---------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.scale, {
                    x: .5,
                    y: .5,
                    z: .5
                }),

                    //NOTE Second Section ---------------------------------------
                    this.secondMoveTimeline = new GSAP.timeline({
                        scrollTrigger: {
                            trigger: ".second-move",
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.6,
                            invalidateOnRefresh: true
                        }
                    }).to(this.room.scale, {
                        x: 1.9,
                        y: 1.9,
                        z: 1.9
                    }, "same").to(this.camera.orthographicCamera.position, {
                        y: 3,
                        x: -4
                    }, "same")

                //NOTE Third Section ---------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.scale, {
                    x: 1.9,
                    y: 1.9,
                    z: 1.9
                }, "same").to(this.camera.orthographicCamera.position, {
                    y: 7,
                    x: 1.5
                }, "same")

                //NOTE Fourth Section ---------------------------------------
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.room.scale, {
                    x: 1.9,
                    y: 1.9,
                    z: 1.9
                }, "same").to(this.camera.orthographicCamera.position, {
                    y: -2,
                    x: -2.5
                }, "same")
            },

            // all 
            "all": () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");

                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6
                            }
                        })
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6
                            }
                        })
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6
                            }
                        })
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6
                            }
                        })
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false
                        }
                    })
                });

                //NOTE All Animation
                //NOTE First Section ---------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3
                })

                //NOTE Second Section ---------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.circleSecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3
                }, "same").to(this.room.position, {
                    y: .7
                }, "same")

                //NOTE Third Section ---------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3
                })

                //NOTE Fourth Section ---------------------------------------
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true
                    }
                }).to(this.circleFourth.scale, {
                    x: 5,
                    y: 5,
                    z: 5
                })

                //NOTE mini platform animation
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "center center",
                        // end: "bottom bottom",
                        // scrub: 0.6,
                        // invalidateOnRefresh: true
                    }
                })

                this.room.children.forEach(child => {
                    if (child.name === "mini_floor") {
                        this.zero = GSAP.to(child.position, {
                            x: -1.21141,
                            z: 3.23304,
                            duration: 0.3
                        })
                    }
                    if (child.name === "mailbox") {
                        this.first = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "plant_floor") {
                        this.second = GSAP.to(child.scale, {
                            x: .8,
                            y: .8,
                            z: .8,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "floor_1") {
                        this.third = GSAP.to(child.scale, {
                            x: .8,
                            y: .8,
                            z: .8,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "floor_2") {
                        this.fourth = GSAP.to(child.scale, {
                            x: .8,
                            y: .8,
                            z: .8,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "floor_3") {
                        this.fifth = GSAP.to(child.scale, {
                            x: .8,
                            y: .8,
                            z: .8,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "plant") {
                        this.sixth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                    if (child.name === "lamp") {
                        this.seventh = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: "back.out(2)",
                            duration: 0.3
                        })
                    }
                });
                this.secondPartTimeline.add(this.zero);
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second, "-=0.2");
                this.secondPartTimeline.add(this.third, "-=0.2");
                this.secondPartTimeline.add(this.fourth, "-=0.2");
                this.secondPartTimeline.add(this.fifth, "-=0.2");
                this.secondPartTimeline.add(this.sixth);
                this.secondPartTimeline.add(this.seventh, "-=0.1");
            }

        });
        // this.timeline = new GSAP.timeline();
        // this.timeline.to(this.room.position, {
        //     x: () => {
        //         return this.sizes.width * 0.0025;
        //     },
        //     scrollTrigger: {
        //         trigger: ".first-move",
        //         markers: true,
        //         start: "top top",
        //         end: "bottom bottom",
        //         scrub: 0.6,
        //         invalidateOnRefresh: true
        //     }
        // });
    }

    resize() {

    }
    update() {

    }
}