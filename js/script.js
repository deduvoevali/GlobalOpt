'use strict';

window.addEventListener('DOMContentLoaded', () => {
    //Nav + Hamburger
    function navMenu() {
        function openMenu() {
            document.querySelector('.menu-trigger').classList.add('menu-trigger--active');
            document.querySelector('.menu').classList.add('menu--active');
            document.body.style.overflow = 'hidden';
        }

        function closeMenu() {
            document.querySelector('.menu-trigger').classList.remove('menu-trigger--active');
            document.querySelector('.menu').classList.remove('menu--active');
            document.body.style.overflow = '';
        }

        document.querySelector('.menu-trigger').addEventListener('click', () => {
            openMenu();
        });
        document.querySelector('.menu-close').addEventListener('click', () => {
            closeMenu();
        });
        document.querySelectorAll('.menu__link').forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });
    }

    navMenu();

    //Slider

    function slider() {
        const nextBtn = document.querySelector('.next'),
            prevBtn = document.querySelector('.prev'),
            sliderInner = document.querySelector('.slider__inner'),
            slides = document.querySelectorAll('.slide'),
            slideWidth = document.querySelector('.slide').clientWidth;

        let currentSlide = 2;

        function rollSlider() {
            let q = 2 + ((slides.length - 3) * 0.5);
            sliderInner.style.right = ((currentSlide - q) * slideWidth) + 'px';
        }

        function changeSectionHeight() {
            document.querySelector('.reviews').style.minHeight = document.querySelector('.slide').clientHeight + 220 + 'px';
        }

        function btnEvent(sign) {
            slides.forEach(slide => {
                slide.classList.remove('current-slide');
            });
            currentSlide = currentSlide + sign;
            slides[currentSlide - 1].classList.add('current-slide');
            rollSlider();
        }

        nextBtn.addEventListener('click', () => {
            if (currentSlide < slides.length) {
                nextBtn.style.opacity = '0';
                btnEvent(1);
            }

            if (currentSlide >= slides.length) {
                nextBtn.style.opacity = '0';
            } else {
                nextBtn.style.opacity = '1';
                prevBtn.style.opacity = '1';
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentSlide > 1) {
                btnEvent(-1);
            }

            if (currentSlide <= 1) {
                prevBtn.style.opacity = '0';

            } else {
                nextBtn.style.opacity = '1';
                prevBtn.style.opacity = '1';
            }
        });

        changeSectionHeight();
        rollSlider();
    }

    slider();

    // Pageup

    function pageUp() {
        const pageup = document.querySelector('.pageup');

        window.addEventListener('scroll', function () {
            if (this.scrollY > 1000) {
                pageup.classList.add('pageup_active');
            } else {
                pageup.classList.remove('pageup_active');
            }
        });
    }

    pageUp();

    // Call Buttons

    function callMeButtons() {
        const callButtons = document.querySelectorAll('#call-me');

        callButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                window.scroll(0, 2670);
            });
        });
    }

    callMeButtons();


    //forms

    function forms() {

        const consultingForm = document.querySelector('#consultingForm'),
            questionsForm = document.querySelector('#questionsForm'),
            message = {
                loading: 'Загрузка...',
                completed: 'Скоро мы с вамы свяжемся!',
                failed: 'Что-то пошло не так...'
            };

        function showBtnMessage(message, color, buttonSelector) {
            const btn = document.querySelector(buttonSelector);
            btn.textContent = message;
            btn.style.backgroundColor = color;
            setTimeout(() => {
                btn.style.backgroundColor = '#ec644b';
                btn.textContent = 'Отправить заявку';
            }, 3000);
        }

        const postData = async (url, data) => {
            const result = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });
            return await result.json();
        };

        function BindDataPosting(form, buttonSelector, URL) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const formData = new FormData(form);

                const object = {};
                formData.forEach((value, key) => {
                    object[key] = value;
                });

                postData(URL, JSON.stringify(object))
                    .then(data => {
                        console.log(data);
                        showBtnMessage(message.completed, 'green', buttonSelector);
                    }).catch(() => {
                        showBtnMessage(message.failed, 'red', buttonSelector);
                        throw new Error('Проверьте включен ли у вас json-server');
                    }).finally(() => {
                        setTimeout(() => {
                            form.reset();
                        }, 3000);
                    });
            });
        }
        BindDataPosting(questionsForm, '.questions__button', 'http://localhost:3000/users');
        BindDataPosting(consultingForm, '.consulting__button', 'http://localhost:3000/users');

    }

    forms();

    new WOW().init();
});