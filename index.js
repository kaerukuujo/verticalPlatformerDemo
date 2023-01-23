const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
};

const floorCollisions2D = [];
for(let i = 0; i < floorCollisions.length; i += 36){
    floorCollisions2D.push(floorCollisions.slice(i, i + 36))
}

const collisionBlocks = [];
floorCollisions2D.forEach((row) => {
    row.forEach((symbol) => {
        if(symbol === 202){
            console.log('draw a block');
            collisionBlocks.push(new CollisionBlock({
                position: {
                    x: 0, 
                    y: 0
                },
            })
          )
        }
    })
})

const gravity = 0.5;

const player = new Player({
    x: 0, 
    y: 0
});
const player2 = new Player({
    x: 200, 
    y: 0
});

const background = new Sprite({
    position: {
        x: 0,
        y: 0,
    },
    imageSrc: './img/background.png',
});

c.fillStyle = 'white';
c.fillRect(0, 0, canvas.width, canvas.height);

const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}
function animate() {
    let animationId = window.requestAnimationFrame(animate);
    // console.log(animationId);

    c.fillStyle = 'white';
    c.fillRect(0, 0, canvas.width, canvas.height);

    c.save();
    c.scale(4, 4);
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update();
    c.restore();

    player.update();
    player2.update();

    player.velocity.x = 0;
    if(keys.d.pressed) player.velocity.x = 5;
    else if (keys.a.pressed) player.velocity.x = -5;
}

animate();

addEventListener('keydown', (event) => {
    // console.log(event.key);
    switch(event.key) {
        case 'd':
            keys.d.pressed = true;
            break;
        case 'a':
            keys.a.pressed = true;
            break;
        case 'w': 
            player.velocity.y = -20;
            break;
    }
});
addEventListener('keyup', (event) => {
    // console.log(event.key);
    switch(event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
    }
})
