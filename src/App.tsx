import {useEffect, useState} from 'react'
import './App.css'
import Hammer from "hammerjs"
import FavoriteIcon from '@mui/icons-material/Favorite';
import {IconButton} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import ReactImageFallback from "react-image-fallback";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import CircularProgress from "@mui/material/CircularProgress";

const cards = [
  {
    name: "Demo card 1",
    description: "This is a demo for Tinder like swipe cards",
    img: "https://placeimg.com/600/300/tech"
  },
  {
    name: "Demo card 2",
    description: "This is a demo for Tinder like swipe cards",
    img: "https://placeimg.com/600/300/tech"
  },
  {
    name: "Demo card 3",
    description: "This is a demo for Tinder like swipe cards",
    img: "https://placeimg.com/600/300/tech"
  },
  {
    name: "Demo card 4",
    description: "This is a demo for Tinder like swipe cards",
    img: "https://placeimg.com/600/300/arch"
  },
]

function App() {
  const [count, setCount] = useState(0)
  
  
  const [currentCard, setCurrentCard] = useState(cards[0])
  

  useEffect(() => {
    var tinderContainer = document.querySelector('.tinder');
    var allCards = document.querySelectorAll('.tinder--card');
    
  
    allCards.forEach(function (el) {
      var hammertime = new Hammer(el);

      hammertime.on('pan', function (event) {
        el.classList.add('moving');
      });

      hammertime.on('pan', function (event) {
        if (event.deltaX === 0) return;
        if (event.center.x === 0 && event.center.y === 0) return;

        tinderContainer.classList.toggle('tinder_love', event.deltaX > 0);
        tinderContainer.classList.toggle('tinder_nope', event.deltaX < 0);

        var xMulti = event.deltaX * 0.03;
        var yMulti = event.deltaY / 80;
        var rotate = xMulti * yMulti;

        event.target.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
      });

      hammertime.on('panend', function (event) {
        el.classList.remove('moving');
        tinderContainer.classList.remove('tinder_love');
        tinderContainer.classList.remove('tinder_nope');

        var moveOutWidth = document.body.clientWidth;
        var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

        event.target.classList.toggle('removed', !keep);

        if (keep) {
          event.target.style.transform = '';
        } else {
          const endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
          var toX = event.deltaX > 0 ? endX : -endX;
          var endY = Math.abs(event.velocityY) * moveOutWidth;
          var toY = event.deltaY > 0 ? endY : -endY;
          var xMulti = event.deltaX * 0.03;
          var yMulti = event.deltaY / 80;
          var rotate = xMulti * yMulti;

          event.target.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
        }
      });
    });
  }, [])
  
  const buttonHandleClick = (card, love) => {
    var cards = document.querySelectorAll('.tinder--card:not(.removed)');
    var moveOutWidth = document.body.clientWidth * 1.5;
  
    if (!cards.length) return false;
  
  
    card.classList.add('removed');
  
    if (love) {
      card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
    } else {
      card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
    }
  }

  return (
    <div className="App">
      <div className="tinder loaded p-5">
        {/*<div className="tinder--status">*/}
        {/*  <i className="fa fa-remove" />*/}
        {/*  <i className="fa fa-heart" />*/}
        {/*</div>*/}
        <div className="tinder--cards d-flex justify-content-center flex-column align-items-center">
          <div className="tinder--card">
            <ReactImageFallback
              src={currentCard.img}
              fallbackImage={<BrokenImageIcon/>}
              initialImage={
                (
                  <div className="w-100 h-100 mt-4 d-flex justify-content-center">
                    <CircularProgress style={{color: "#CDD6DD"}} disableShrink />
                  </div>
                )
              }
              className="d-flex justify-content-center"
            />
            <h3>{currentCard.name}</h3>
            <p>{currentCard.description}</p>
          </div>
          <div className="mt-4 tinder--buttons d-flex flex-row">
            <IconButton onClick={() => {
              buttonHandleClick({}, false)
            }}>
              <ClearIcon fontSize="large" style={{color: "#CDD6DD"}}/>
            </IconButton>
            <IconButton onClick={() => {
              buttonHandleClick({}, true)
            }}>
              <FavoriteIcon fontSize="large" style={{color: "#FFACE4"}}/>
            </IconButton>
          </div>
        </div>
        </div>
       
    </div>
  )
}

export default App
