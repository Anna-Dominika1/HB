function Sim(sldrId) {

    let id = document.getElementById(sldrId);
    if (id) {
        this.sldrRoot = id
    }
    else {
        this.sldrRoot = document.querySelector('.sim-slider')
    };

    this.sldrList = this.sldrRoot.querySelector('.sim-slider-list');
    this.sldrElements = this.sldrList.querySelectorAll('.sim-slider-element');
    this.sldrElemFirst = this.sldrList.querySelector('.sim-slider-element');
    this.leftArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-left');
    this.rightArrow = this.sldrRoot.querySelector('div.sim-slider-arrow-right');
    this.indicatorDots = this.sldrRoot.querySelector('div.sim-slider-dots');
    this.options = Sim.defaults;
    Sim.initialize(this)
};

Sim.defaults = {
    loop: true,     // Бесконечное зацикливание слайдера
    // auto: true,     // Автоматическое пролистывание
    interval: 5000, // Интервал между пролистыванием элементов (мс)
    arrows: true,   // Пролистывание стрелками
    dots: true      // Индикаторные точки
};

Sim.prototype.elemPrev = function (num) {
    num = num || 1;

    let prevElement = this.currentElement;
    this.currentElement -= num;
    if (this.currentElement < 0) this.currentElement = this.elemCount - 1;

    if (!this.options.loop) {
        if (this.currentElement == 0) {
            this.leftArrow.style.display = 'none'
        };
        this.rightArrow.style.display = 'block'
    };

    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';

    if (this.options.dots) {
        this.dotOn(prevElement); this.dotOff(this.currentElement)
    }
};

Sim.prototype.elemNext = function (num) {
    num = num || 1;

    let prevElement = this.currentElement;
    this.currentElement += num;
    if (this.currentElement >= this.elemCount) this.currentElement = 0;

    if (!this.options.loop) {
        if (this.currentElement == this.elemCount - 1) {
            this.rightArrow.style.display = 'none'
        };
        this.leftArrow.style.display = 'block'
    };

    this.sldrElements[this.currentElement].style.opacity = '1';
    this.sldrElements[prevElement].style.opacity = '0';

    if (this.options.dots) {
        this.dotOn(prevElement); this.dotOff(this.currentElement)
    }
};

Sim.prototype.dotOn = function (num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#BBB; cursor:pointer;'
};

Sim.prototype.dotOff = function (num) {
    this.indicatorDotsAll[num].style.cssText = 'background-color:#556; cursor:default;'
};

Sim.initialize = function (that) {


    that.elemCount = that.sldrElements.length; // Количество элементов


    that.currentElement = 0;
    let bgTime = getTime();

    function getTime() {
        return new Date().getTime();
    };
    function setAutoScroll() {
        that.autoScroll = setInterval(function () {
            let fnTime = getTime();
            if (fnTime - bgTime + 10 > that.options.interval) {
                bgTime = fnTime; that.elemNext()
            }
        }, that.options.interval)
    };


    if (that.elemCount <= 1) {
        that.options.auto = false; that.options.arrows = false; that.options.dots = false;
        that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
    };
    if (that.elemCount >= 1) {
        that.sldrElemFirst.style.opacity = '1';
    };



    if (that.options.arrows) {
        that.leftArrow.addEventListener('click', function () {
            let fnTime = getTime();
            if (fnTime - bgTime > 1000) {
                bgTime = fnTime; that.elemPrev()
            }
        }, false);
        that.rightArrow.addEventListener('click', function () {
            let fnTime = getTime();
            if (fnTime - bgTime > 1000) {
                bgTime = fnTime; that.elemNext()
            }
        }, false)
    }
    else {
        that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
    };

    if (that.options.dots) {
        let sum = '', diffNum;
        for (let i = 0; i < that.elemCount; i++) {
            sum += '<span class="sim-dot"></span>'
        };
        that.indicatorDots.innerHTML = sum;
        that.indicatorDotsAll = that.sldrRoot.querySelectorAll('span.sim-dot');
        for (let n = 0; n < that.elemCount; n++) {
            that.indicatorDotsAll[n].addEventListener('click', function () {
                diffNum = Math.abs(n - that.currentElement);
                if (n < that.currentElement) {
                    bgTime = getTime(); that.elemPrev(diffNum)
                }
                else if (n > that.currentElement) {
                    bgTime = getTime(); that.elemNext(diffNum)
                }

            }, false)
        };
        that.dotOff(0);
        for (let i = 1; i < that.elemCount; i++) {
            that.dotOn(i)
        }
    }
};

new Sim();

document.querySelector('#bottom-btn').addEventListener('click', function (e) {

    new confettiKit({
        confettiCount: 40,
        angle: 90,
        startVelocity: 50,
        colors: randomColor({ hue: 'blue', count: 18 }),
        elements: {
            'confetti': {
                direction: 'down',
                rotation: true,
            },
            'star': {
                count: 10,
                direction: 'down',
                rotation: true,
            },
            'ribbon': {
                count: 5,
                direction: 'down',
                rotation: true,
            },
            'custom': [{
                count: 1,
                width: 50,
                textSize: 15,
                content: '//bootstraptema.ru/snippets/effect/2018/confettikit/shar.png',
                contentType: 'image',
                direction: 'up',
                rotation: false,
            }]
        },
        position: 'bottomLeftRight',
    });
});

document.querySelector('#btn').addEventListener('click', function (e) {

    new confettiKit({
        confettiCount: 40,
        angle: 90,
        startVelocity: 50,
        elements: {
            'confetti': {
                direction: 'down',
                rotation: true,
            },
            'star': {
                count: 10,
                direction: 'down',
                rotation: true,
            },
            'ribbon': {
                count: 5,
                direction: 'down',
                rotation: true,
            },
        },
        x: e.clientX,
        y: e.clientY
    });
});

//Celebration
document.querySelector('#top-btn').addEventListener('click', function (e) {

    new confettiKit({
        colors: randomColor({ hue: 'pink', count: 18 }),
        confettiCount: 40,
        angle: 90,
        startVelocity: 50,
        elements: {
            'confetti': {
                direction: 'down',
                rotation: true,
            },
            'star': {
                count: 10,
                direction: 'down',
                rotation: true,
            },
            'ribbon': {
                count: 5,
                direction: 'down',
                rotation: true,
            },
        },
        position: 'topLeftRight',
    });
});

//Custom Text
document.querySelector('#text-btn').addEventListener('click', function (e) {
    new confettiKit({
        confettiCount: 40,
        angle: 90,
        startVelocity: 50,
        elements: {
            'confetti': {
                direction: 'down',
                rotation: true,
            },
            'star': {
                count: 10,
                direction: 'down',
                rotation: true,
            },
            'ribbon': {
                count: 5,
                direction: 'down',
                rotation: true,
            },
            'custom': [{
                count: 10,
                width: 25,
                textSize: 15,
                content: 'BootstrapTema',
                contentType: 'text',
                direction: 'down',
                rotation: true,
            }]
        },
        x: e.clientX,
        y: e.clientY
    });
});

//Custom Image
document.querySelector('#image-btn').addEventListener('click', function (e) {
    new confettiKit({
        confettiCount: 40,
        angle: 90,
        startVelocity: 50,
        elements: {
            'confetti': {
                direction: 'down',
                rotation: true,
            },
            'star': {
                count: 10,
                direction: 'down',
                rotation: true,
            },
            'ribbon': {
                count: 5,
                direction: 'down',
                rotation: true,
            },
            'custom': [{
                count: 50,
                width: 25,
                textSize: 15,
                content: '//bootstraptema.ru/snippets/effect/2018/confettikit/FlowerClipart.png',
                contentType: 'image',
                direction: 'down',
                rotation: true,
            }]
        },
        x: e.clientX,
        y: e.clientY
    });
});

var svgSource = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve"><script xmlns="" id="tinyhippos-injected"/><g><g><path d="M32,271.692v192c0,17.664,14.368,32,32,32h160v-224H32z"/></g></g><g><g><path d="M480,143.692H378.752c7.264-4.96,13.504-9.888,17.856-14.304c25.824-25.952,25.824-68.192,0-94.144 c-25.088-25.28-68.8-25.216-93.856,0c-13.888,13.92-50.688,70.592-45.6,108.448h-2.304c5.056-37.856-31.744-94.528-45.6-108.448 c-25.088-25.216-68.8-25.216-93.856,0C89.6,61.196,89.6,103.436,115.36,129.388c4.384,4.416,10.624,9.344,17.888,14.304H32 c-17.632,0-32,14.368-32,32v48c0,8.832,7.168,16,16,16h208v-64h64v64h208c8.832,0,16-7.168,16-16v-48 C512,158.06,497.664,143.692,480,143.692z M222.112,142.636c0,0-1.344,1.056-5.92,1.056c-22.112,0-64.32-22.976-78.112-36.864 c-13.408-13.504-13.408-35.52,0-49.024c6.496-6.528,15.104-10.112,24.256-10.112c9.12,0,17.728,3.584,24.224,10.112 C208.128,79.5,229.568,134.924,222.112,142.636z M295.776,143.692c-4.544,0-5.888-1.024-5.888-1.056 c-7.456-7.712,13.984-63.136,35.552-84.832c12.896-13.024,35.456-13.088,48.48,0c13.44,13.504,13.44,35.52,0,49.024 C360.128,120.716,317.92,143.692,295.776,143.692z"/></g></g><g><g><path d="M288,271.692v224h160c17.664,0,32-14.336,32-32v-192H288z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
document.querySelector('#svg-btn').addEventListener('click', function (e) {
    new confettiKit({
        confettiCount: 40,
        angle: 90,
        startVelocity: 50,
        elements: {
            'confetti': {
                direction: 'down',
                rotation: true,
            },
            'star': {
                count: 20,
                direction: 'down',
                rotation: true,
            },
            'ribbon': {
                count: 5,
                direction: 'down',
                rotation: true,
            },
            'custom': [
                {
                    count: 10,
                    width: 25,
                    content: svgSource,
                    contentType: 'svg',
                    direction: 'down',
                    rotation: true,
                },
            ]
        },
        x: e.clientX,
        y: e.clientY
    });
});

