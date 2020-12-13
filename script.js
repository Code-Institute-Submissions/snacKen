
        function toggle(h)
        {
            if (gameIsRunning)
            {
                gameIsRunning = false;
                h.textContent = "PLAY";
            }
            else
            {
                gameIsRunning = true;
                h.textContent = "PAUSE";
                gameLoop();
            }
        }

        document.addEventListener("keydown", keyPush);

        const canvas = document.querySelector("canvas");
        const title = document.querySelector("h2");
        const ctx = canvas.getContext("2d");

        let gameIsRunning = false;

        const fps = 15;
        const tileSize = 50;
        const tileCountX = canvas.width / tileSize;
        const tileCountY = canvas.height / tileSize;

        let score = 0;

        let snakeSpeed = tileSize;
        let snakePosX = 0;
        let snakePosY = canvas.height / 2;

        let velocityX = 1;
        let velocityY = 0;

        let tail = [];
        let snakeLength = 4;

        //food
        let foodPosX = 0;
        let foodPosY = 0;

        function gameLoop()
        {
            if (gameIsRunning)
            {
                drawStuff();
                moveStuff();
                setTimeout(gameLoop, 1000 / fps);
            }
        }
        resetFood();
        drawStuff();



        function moveStuff()
        {
            snakePosX += snakeSpeed * velocityX;
            snakePosY += snakeSpeed * velocityY;

            //stena-walls
            if (snakePosX > canvas.width - tileSize)
            {
                snakePosX = 0;
            }

            if (snakePosX < 0)
            {
                snakePosX = canvas.width;
            }

            if (snakePosY > canvas.height - tileSize)
            {
                snakePosY = 0;
            }
            if (snakePosY < 0)
            {
                snakePosY = canvas.height;
            }

            tail.forEach((snakePart) =>
            {
                if (snakePosX === snakePart.x && snakePosY === snakePart.y)
                {
                    gameOver();
                }
            });
            //tail
            tail.push({ x: snakePosX, y: snakePosY });
            //head
            tail = tail.slice(-1 * snakeLength);

            if (snakePosX === foodPosX && snakePosY === foodPosY)
            {
                title.textContent = '++score';
                snakeLength++;
                resetFood();
            }
        }

        //DRAWINGS ++

        function drawStuff()
        {

            rectangle("#ffffff", 0, 0, canvas.width, canvas.height);  //pozadie
            drawGrid();

            //food
            rectangle("#ff5500", foodPosX, foodPosY, tileSize, tileSize);

            //tail
            tail.forEach((snakePart) =>
                rectangle("#20B2AA", snakePart.x, snakePart.y, tileSize, tileSize));


            //snacken
            rectangle("#00FFFF", snakePosX, snakePosY, tileSize, tileSize);
        }

        //rectangle 
        function rectangle(color, x, y, width, height)
        {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
        }

        function resetFood()
        {
            if (snakeLength === tileCountX * tileCountY)
            {
                gameOver();

            }
            foodPosX = Math.floor(Math.random() * tileCountX) * tileSize;
            foodPosY = Math.floor(Math.random() * tileCountY) * tileSize;

            if (foodPosX === snakePosX && foodPosY === snakePosY)
            {
                resetFood();
            }

            if (
                tail.some(
                    (snakePart) => snakePart.x === foodPosX && snakePart.y === foodPosY)
            )
            {

                resetFood();
            }
        }

        function gameOver()
        {
            title.innerHTML = ` ${score}`;
            gameIsRunning = false;
        }

        // KEYS

        function keyPush(event)
        {

            switch (event.key)
            {
                case "ArrowLeft":
                    if (velocityX !== 1)
                    {
                        velocityX = -1;
                        velocityY = 0;
                    }
                    break;

                case "ArrowUp":
                    if (velocityY !== 1)
                    {
                        velocityX = 0;
                        velocityY = -1;
                    }
                    break;

                case "ArrowRight":
                    if (velocityX !== -1)
                    {
                        velocityX = 1;
                        velocityY = 0;
                    }
                    break;

                case "ArrowDown":
                    if (velocityY !== -1)
                    {
                        velocityX = 0;
                        velocityY = 1;
                    }
                    break;
                default:
                    if (!gameIsRunning) location.reload();
                    break;
            }
        }
        //grid

        function drawGrid()
        {
            for (let i = 0; i < tileCountX; i++)
            {
                for (let j = 0; j < tileCountY; j++)
                {
                    rectangle(
                        "#ffbf00",
                        tileSize * i,
                        tileSize * j,
                        tileSize - 1,
                        tileSize - 1
                    );
                }

            }
        }
