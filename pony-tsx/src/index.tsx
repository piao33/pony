import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ThreeChess from './components/game/threeChess'

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(<ThreeChess/>);

// 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
// 在历史记录列表中加粗显示当前选择的项目。
// 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
// 添加一个可以升序或降序显示历史记录的按钮。
// 每当有人获胜时，高亮显示连成一线的 3 颗棋子。
// 当无人获胜时，显示一个平局的消息。