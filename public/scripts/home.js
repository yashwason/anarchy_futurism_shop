basicScroll.create({
    elem: document.querySelector('.hero .hero-middle-wrapper .hero-middle'),
    from: 'center-center',
    to: 'bottom-top',
    direct: true,
    props: {
        '--scale': {
            from: 1,
            to: 1.3
        },
        '--opacity': {
            from: 1,
            to: 0.1
        }
    }
}).start()

basicScroll.create({
    elem: document.querySelector('.banner img'),
    from: 'center-center',
    to: 'bottom-bottom',
    direct: true,
    props: {
        '--scale': {
            from: 2,
            to: 1
        },
        '--opacity': {
            from: 0.01,
            to: 0.99
        }
    }
}).start();