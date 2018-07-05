var Example = Example || {};

Example.sprites = function() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: window.innerHeight,
            background: 'black',
            showAngleIndicator: false,
            wireframes: false
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    var defaultWinner = null;
    // audio.play();
    // add bodies
    var offset = 10,
    options = { 
        isStatic: true,
        background: 'white',
        render: {
            fillStyle: 'black'
        }
    };

    playerScores = [0,0,0,0];

    world.bodies = [];
    borderWidth = 30;

    var bgOption = {
        render: {
            sprite: {
                texture: './img/bg/1.png',
                xScale: .56,
                yScale: .8
            },
        },
        isStatic: true,
        collisionFilter: {
            group: -1
        }
    }

    var bgOption1 = {
        render: {
            sprite: {
                texture: './img/bg/2.png',
                xScale: .56,
                yScale: .8
            },
        },
        isStatic: true
    }

    var bgOption2 = {
        render: {
            sprite: {
                texture: './img/bg/3.png',
                xScale: .56,
                yScale: .8
            },
        },
        isStatic: true
    }

    var bgOption3 = {
        render: {
            sprite: {
                texture: './img/bg/4.png',
                xScale: .56,
                yScale: .8
            },
        },
        isStatic: true
    }
    // these static walls will not be rendered in this sprites example, see options
    World.add(world, [
        // Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
        Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 30, options), //bottom
        // Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options), //right
        // Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options), //left
        Bodies.rectangle(0, 0, borderWidth, window.innerHeight * offset, options),
        Bodies.rectangle(200, 0, borderWidth, window.innerHeight * offset, options),
        Bodies.rectangle(400, 0, borderWidth, window.innerHeight * offset, options),
        Bodies.rectangle(600, 0, borderWidth, window.innerHeight * offset, options),
        Bodies.rectangle(800, 0, borderWidth, window.innerHeight * offset, options),
        Bodies.rectangle(100, 0, 1, 1, bgOption),
        Bodies.rectangle(300, 0, 1, 1, bgOption1),
        Bodies.rectangle(500, 0, 1, 1, bgOption2),
        Bodies.rectangle(700, 0, 1, 1, bgOption3),
    ]);

    var player1DropX = 150;
    var playerDrops = [100, 300, 500, 700]; 
    var playerScores = [0,0,0,0]

    var stack = Composites.stack(playerDrops[0], 0, 2, 1000, 10, 20, function(x, y) {
        
    });

    World.add(world, stack);


    window.document.addEventListener("keyup", function(e) { //player 1
        var index = e.key;
        if (defaultWinner == null) {
            defaultWinner = index + 1;
        }
        if (e.key == ' ') {
            window.location.reload();
        } else if (e.key == '0') {
            playerScores[0] += 1;
        } else if (e.key == '1') {
            playerScores[1] += 1;
        } else if (e.key == '2') {
            playerScores[2] += 1;
        } else if (e.key == '3') {
            playerScores[3] += 1;
        } 

        var pumpkin = Bodies.circle(playerDrops[index], 10, 10, {
                        density: 0.0005,
                        frictionAir: 0.06,
                        restitution: 0.3,
                        friction: 0.01,
                        render: {
                            sprite: {
                                texture: './img/pumpkin/'+ index+ '.png',
                                xScale: .2,
                                yScale: .2
                            },
                        }
                    });
        World.add(world, pumpkin);

        var audio = new Audio('./sounds/drop.mp3');
        audio.play();
    })

    setTimeout(function() {
        console.log(playerScores);
        winner = playerScores.indexOf(Math.max(...playerScores));
        alert("Player " + (winner + 1) + " Won the game!");
    }, 10000);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};

Example.sprites();
var canvas = document.getElementsByTagName('canvas')[0],
context = canvas.getContext('2d');

make_base();

function make_base() {
    console.log("hey")
  base_image = new Image();
  base_image.src = './img/ball.png';
  context.drawImage(base_image, 50, 100);
}
