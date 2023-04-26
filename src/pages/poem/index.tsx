import React, {useEffect, useRef, useState} from "react";
import Avatar from "@/components/Avatar";
import {GetPoemPage} from "@/service/poem/poem";
import CreateButton from "@/pages/poem/CreateButton";
import * as d3 from 'd3';

const generateBubbles = (poems) => {
    const nodes = poems.map((poem) => {
        const size = 150 + Math.floor(Math.random() * 5);
        return { size, poem };
    });

    const links = [];
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[j].x - nodes[i].x;
            const dy = nodes[j].y - nodes[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < nodes[i].size / 2 + nodes[j].size / 2) {
                // 如果两个气泡之间的距离太近，则将它们连接起来
                // @ts-ignore
                links.push({ source: i, target: j });
            }
        }
    }

    const simulation = d3.forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-100))
        .force("link", d3.forceLink(links).distance(100))
        .force("center", d3.forceCenter(window.innerWidth / 2, window.innerHeight / 2)) // 将模拟的中心点设置为屏幕中心
        .force("x", d3.forceX().strength(0.05).x(() => {
            // 使用随机数将节点沿着 x 轴向左或向右移动
            return (Math.random() * 0.5) * window.innerWidth;
        }))
        .force("y", d3.forceY().strength(0.05).y(() => {
            // 使用随机数将节点沿着 y 轴向上或向下移动
            return (Math.random() * 0.4) * window.innerHeight;
        }))
        .stop();

    for (let i = 0; i < 100; i++) {
        simulation.tick();
    }

    return nodes.map((node, index) => {
        const x = node.x + Math.random() * 40 - 5;
        const y = node.y + Math.random() * 40 - 5 + index * 40;
        return { size: node.size, x, y, poem: node.poem };
    });
};

const Page = () => {
    const canvasRef = useRef(null);
    const bubblesRef = useRef(null);
    const [bubbles, setBubbles] = useState<any[]>([]);
    const [page, setPage] = useState({
        current: 0,
        size: 5,
        total: 8,
        pageNum: 0,
    });

    useEffect(() => {
        GetPoemPage(1, 5).then((it) => {
            setPage({
                current: it.page,
                size: it.size,
                total: it.total,
                pageNum: it.page_num,
            });
            setBubbles(generateBubbles(it.value));
        });
    }, []);

    useEffect(() => {
        const nearestBubbles = bubbles.map(bubble => {
            let minDistance = Infinity * 2;
            let nearestBubble = null;
            for (let i = 0; i < bubbles.length; i++) {
                if (bubble !== bubbles[i]) {
                    const distance = Math.sqrt((bubbles[i].x - bubble.x) ** 2 + (bubbles[i].y - bubble.y) ** 2);
                    if (distance < minDistance) {
                        minDistance = distance;
                        nearestBubble = bubbles[i];
                    }
                }
            }
            return nearestBubble;
        });

        const canvas: any = canvasRef.current;
        if (canvas !== null) {
            const ctx = canvas.getContext("2d");
            canvas.width = bubblesRef.current.clientWidth;
            canvas.height = bubblesRef.current.clientHeight
            ctx.clearRect(0, 0, 814, 781);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "rgba(99,179,237,0.38)";
            for (let i = 0; i < bubbles.length; i++) {
                const bubble = bubbles[i];
                const nearestBubble = nearestBubbles[i];
                if (nearestBubble !== null) {
                    ctx.beginPath();
                    ctx.moveTo(bubble.x + 6, bubble.y + 6);
                    ctx.lineTo(nearestBubble.x + 6, nearestBubble.y + 6);
                    ctx.stroke();
                }
            }
        }
    }, [bubbles]);

    const handleRefreshClick = () => {
        GetPoemPage(page.current + 1, page.size).then((it) => {
            setPage({
                current: it.page,
                size: it.size,
                total: it.total,
                pageNum: it.page_num,
            });
            if (page.current === page.pageNum - 1) {
                setPage({
                    current: 0,
                    size: it.size,
                    total: it.total,
                    pageNum: it.page_num,
                });
            }
            setBubbles(generateBubbles(it.value));
        });
    };

    const [stars, setStars] =
        useState([...Array(100)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 3
    })));

    useEffect(() => {
        const interval = setInterval(() => {
            setStars(stars => stars.map(star => {
                const x = star.x + 2;
                const y = star.y + 1;
                return {
                    x: x < 0 ? window.innerWidth : x > window.innerWidth ? 0 : x,
                    y: y < 0 ? window.innerHeight : y > window.innerHeight ? 0 : y,
                    r: star.r
                };
            }));
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center" ref={bubblesRef}>
            <svg
                className="fixed top-0 overflow-hidden w-full h-screen"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2e3440" />
                        <stop offset="100%" stopColor="#00000" />
                    </linearGradient>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#gradient)" />
                {stars.map((star, i) => (
                    <circle
                        key={i}
                        cx={star.x}
                        cy={star.y}
                        r={star.r}
                        fill="#fff"
                    />
                ))}
            </svg>
            <div className="relative w-full h-screen overflow-hidden">
                <canvas id="canvas" className="absolute top-0 left-0 w-full h-full pointer-events-none" ref={canvasRef}/>
                {bubbles.map((bubble, index) => (
                    <div
                        key={index}
                        className={`absolute cursor-pointer w-12 h-12 rounded-full border-2 border-blue-200 ${bubble.isActive ? 'border-blue-400' : ''} ${bubble.isActive ? 'z-10' : 'z-1'}`}
                        onMouseEnter={() => {
                            bubbles.forEach((b) => (b.isActive = false));
                            bubble.isActive = true;
                            setBubbles([...bubbles]);
                        }}
                        style={{
                            top: bubble.y - 20,
                            left: bubble.x - 8,
                            backgroundColor: 'white',
                            boxShadow: bubble.isActive ? '0 0 40px 8px #63b3ed' : '0 0 20px 4px #63b3ed',
                            backgroundSize: bubble.isActive ? '40px 40px' : '20px 20px',
                            backgroundPosition: bubble.isActive ? '0 0, 20px 20px' : '0 0, 10px 10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontSize: bubble.isActive ? '1.2rem' : '1rem'
                        }}
                    >
                        <div className="text-xl font-black text-gray-300">{bubble.poem.title[0]}</div>
                    </div>
                ))}
                <div className="flex justify-end mb-4">
                    <button
                        type={"button"}
                        onClick={handleRefreshClick}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-1/4"
                    >
                        再来一组
                    </button>
                    <div className="w-1/4">
                        <CreateButton/>
                    </div>
                </div>
                <div
                    className="absolute z-50 flex items-center justify-center"
                    style={{
                        width: "300px",
                        height: "400px",
                        bottom: "50%",
                        left: "20%",
                        transform: "translate(-50%, 50%)",
                        display: bubbles.some((b) => b.isActive) ? "flex" : "none",
                    }}
                >
                    {bubbles.map((bubble, index) => (
                        <div
                            key={index}
                            className={`flex flex-col items-center justify-center ${
                                bubble.isActive ? "flex" : "hidden"
                            } border-2 border-gray-300 shadow-md rounded-lg p-4 text-center bg-white`}
                            style={{ width: "300px", height: "400px" }}
                        >
                            <div className="flex items-center justify-center w-24 h-24 border-2 border-gray-300 rounded-full mb-4">
                                <Avatar size={6} userId={bubble.poem.userId} />
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{bubble.poem.title}</h2>
                            <p className="text-gray-600 text-sm mb-4">{`by ${bubble.poem.userName} on ${new Date(bubble.poem.createdTime).toLocaleDateString()}`}</p>
                            <div className="text-lg text-gray-800 h-56 break-words whitespace-pre-wrap ">
                                {bubble.poem.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
